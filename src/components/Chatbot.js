import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { isFirebaseConfigured, getFirebaseDb } from "../firebase";

const RULES = [
  {
    patterns: ["hello", "hi", "hey", "namaste", "vanakkam"],
    reply: "Hello! Welcome to Sabari Auto Workshop.\n\nYou can ask me about:\n• Services\n• Booking a service\n• Workshop location\n• Working hours",
  },
  {
    patterns: ["oil", "engine oil", "oil change"],
    reply: "Oil Change Service\n\n• Engine oil drain and refill\n• Oil filter replacement\n• Fluid level top-up\n\nWould you like to book this service or request a callback?",
    suggest: "book",
  },
  {
    patterns: ["ac", "air condition", "cooling", "ac repair"],
    reply: "AC Service\n\n• Cooling performance check\n• Compressor inspection\n• Vent and filter cleaning\n• System review\n\nShall I help you book an AC service?",
    suggest: "book",
  },
  {
    patterns: ["brake", "brakes", "brake pad"],
    reply: "Brake Repair\n\n• Brake pad inspection\n• Disc check\n• Brake fluid review\n• Safety test\n\nWould you like to book now?",
    suggest: "book",
  },
  {
    patterns: ["battery", "battery dead", "car not starting"],
    reply: "Battery Replacement\n\n• Battery health test\n• Replacement support\n• Terminal cleaning\n• Electrical review\n\nWant to schedule a battery check?",
    suggest: "book",
  },
  {
    patterns: ["engine", "engine repair", "engine noise"],
    reply: "Engine Repair Service\n\n• Diagnostic scan\n• Engine inspection\n• Repair support\n• Performance check\n\nEngine issues need attention. Shall I open the booking page?",
    suggest: "book",
  },
  {
    patterns: ["dent", "paint", "body", "denting", "painting"],
    reply: "Denting and Painting\n\n• Dent correction\n• Surface preparation\n• Paint matching\n• Finish inspection\n\nWant to request service details?",
    suggest: "services",
  },
  {
    patterns: ["service", "services", "car service", "maintenance", "basic service", "full service"],
    reply: "Our Services\n\n• Basic Service\n• Full Service\n• Engine Repair\n• AC Service\n• Brake Repair\n• Battery Replacement\n• Denting and Painting\n\nI can take you to the services page or booking page.",
    suggest: "services",
  },
  {
    patterns: ["price", "cost", "rate", "charge", "pricing", "quote"],
    reply: "We do not show fixed prices online.\n\nTell us the service you need and our team will contact you with the right quote after understanding your car's condition.",
    suggest: "contact",
  },
  {
    patterns: ["book", "booking", "appointment", "schedule", "reserve"],
    reply: "Book a Service\n\nI'll take you to our booking page where you can:\n• Select your car and service\n• Choose date and time\n• Request pickup and drop\n\nClick below to continue.",
    suggest: "book",
  },
  {
    patterns: ["location", "address", "where", "directions", "map"],
    reply: "Sabari Auto Workshop\n\nAnna Nagar\nChennai - 600040\n\nMon-Sat: 8 AM - 8 PM\nSun: 9 AM - 5 PM\n\nNeed directions? Visit our Contact page.",
    suggest: "contact",
  },
  {
    patterns: ["time", "hours", "open", "working hours", "timing"],
    reply: "Working Hours\n\n• Monday - Saturday: 8:00 AM - 8:00 PM\n• Sunday: 9:00 AM - 5:00 PM\n\nCall us at +91 94444 84399 anytime during working hours.",
  },
  {
    patterns: ["phone", "call", "contact", "number", "reach", "callback"],
    reply: "Contact Sabari Auto\n\n• Phone: +91 94444 84399\n• WhatsApp: +91 94444 84399\n• Email: sabari.auto@gmail.com\n\nWe can also call you back after you submit a booking request.",
    suggest: "contact",
  },
  {
    patterns: ["pickup", "drop", "home service", "doorstep"],
    reply: "Pickup and Drop Service\n\nYes, we can arrange pickup and drop support based on your booking request.\n\nAdd this option while booking and our team will coordinate with you.",
    suggest: "book",
  },
  {
    patterns: ["review", "rating", "feedback", "testimonial"],
    reply: "Customer Reviews\n\nWe are proud to be trusted by hundreds of happy customers in Chennai.\n\nAfter your service, you can leave a review on our website.",
  },
  {
    patterns: ["thank", "thanks", "ok", "okay", "great", "good", "nice"],
    reply: "You're welcome! Feel free to ask about services, booking, or contact details anytime.",
  },
  {
    patterns: ["bye", "goodbye", "see you", "later"],
    reply: "Goodbye! Drive safe and see you at Sabari Auto Workshop.",
  },
];

function getBotReply(input) {
  const lower = input.toLowerCase().trim();
  for (const rule of RULES) {
    if (rule.patterns.some((p) => lower.includes(p))) {
      return { text: rule.reply, suggest: rule.suggest || null };
    }
  }
  return {
    text: "I can help with services, booking, working hours, location, or contact details. You can also call us directly at +91 94444 84399.",
    suggest: null,
  };
}

const QUICK_REPLIES = [
  "What services do you offer?",
  "Book a service",
  "Need a quote",
  "Workshop location",
  "Request callback",
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "bot",
      text: "Hi! I'm Sabari Auto Assistant.\n\nHow can I help you today? Ask me about services, booking, or contact details.",
      suggest: null,
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [sessionId] = useState(() => "chat_" + Date.now());
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  async function saveToDB(userMsg, botMsg) {
    if (!isFirebaseConfigured) return;
    try {
      const db = await getFirebaseDb();
      if (!db) return;
      const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
      await addDoc(collection(db, "chatHistory"), {
        sessionId,
        userMessage: userMsg,
        botReply: botMsg,
        timestamp: serverTimestamp(),
      });
    } catch {
      // non-blocking
    }
  }

  function sendMessage(text) {
    const userText = text || input.trim();
    if (!userText) return;
    setInput("");

    const userMsg = { id: Date.now(), from: "user", text: userText };
    setMessages((prev) => [...prev, userMsg]);
    setTyping(true);

    setTimeout(() => {
      const { text: botText, suggest } = getBotReply(userText);
      const botMsg = { id: Date.now() + 1, from: "bot", text: botText, suggest };
      setMessages((prev) => [...prev, botMsg]);
      setTyping(false);
      saveToDB(userText, botText);
    }, 700);
  }

  function handleAction(suggest) {
    if (suggest === "book") navigate("/booking");
    if (suggest === "services") navigate("/services");
    if (suggest === "contact") navigate("/contact");
    setOpen(false);
  }

  function renderText(text) {
    return text.split("\n").map((line, i) => (
      <p key={i} className={i > 0 ? "mt-1" : ""}>{line}</p>
    ));
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#ff3b3b] text-white shadow-2xl transition-all hover:scale-110 hover:bg-red-700"
        aria-label="Open chat"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!open && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400 text-[9px] font-bold text-[#111111]">
            AI
          </span>
        )}
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 flex w-80 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl sm:w-96"
          style={{ maxHeight: "520px" }}
        >
          <div className="flex items-center gap-3 bg-[#111111] px-4 py-3">
            <div className="rounded-full bg-[#ff3b3b] p-1.5">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white">Sabari Auto Assistant</p>
              <p className="flex items-center gap-1 text-xs text-green-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                Online · Replies instantly
              </p>
            </div>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4" style={{ minHeight: 0 }}>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2 ${msg.from === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${msg.from === "bot" ? "bg-[#ff3b3b]" : "bg-[#111111]"}`}>
                  {msg.from === "bot" ? <Bot className="h-3.5 w-3.5 text-white" /> : <User className="h-3.5 w-3.5 text-white" />}
                </div>
                <div className={`flex max-w-[75%] flex-col gap-1 ${msg.from === "user" ? "items-end" : "items-start"}`}>
                  <div className={`rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                    msg.from === "bot"
                      ? "rounded-tl-none border border-gray-100 bg-white text-gray-700"
                      : "rounded-tr-none bg-[#ff3b3b] text-white"
                  }`}>
                    {renderText(msg.text)}
                  </div>
                  {msg.suggest && (
                    <button
                      onClick={() => handleAction(msg.suggest)}
                      className="rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-[#111111] transition-colors hover:bg-yellow-300"
                    >
                      {msg.suggest === "book" && "Book Now"}
                      {msg.suggest === "services" && "View Services"}
                      {msg.suggest === "contact" && "Contact Us"}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ff3b3b]">
                  <Bot className="h-3.5 w-3.5 text-white" />
                </div>
                <div className="flex items-center gap-1 rounded-2xl rounded-tl-none border border-gray-100 bg-white px-3 py-2">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="flex gap-1.5 overflow-x-auto border-t border-gray-100 bg-white px-3 py-2">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="shrink-0 whitespace-nowrap rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600 transition-colors hover:bg-[#ff3b3b] hover:text-white"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="flex gap-2 border-t border-gray-100 bg-white p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#ff3b3b]"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim()}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff3b3b] text-white transition-colors hover:bg-red-700 disabled:opacity-40"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
