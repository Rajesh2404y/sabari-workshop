import React, { useState } from "react";
import { X, Mail, Lock, User, Phone, Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function AuthModal({ onClose }) {
  const [mode, setMode]       = useState("login");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [form, setForm]       = useState({ name: "", email: "", phone: "", password: "" });
  const { login, signup }     = useAuth();

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      if (mode === "login") {
        await login(form.email, form.password);
      } else {
        if (!form.name.trim()) throw new Error("Name is required");
        if (!/^[6-9]\d{9}$/.test(form.phone)) throw new Error("Enter valid 10-digit phone");
        await signup(form.name, form.email, form.password, form.phone);
      }
      onClose();
    } catch (err) {
      const msg = err.code === "auth/user-not-found"       ? "No account found with this email"
                : err.code === "auth/wrong-password"       ? "Incorrect password"
                : err.code === "auth/email-already-in-use" ? "Email already registered"
                : err.code === "auth/weak-password"        ? "Password must be at least 6 characters"
                : err.message || "Something went wrong";
      setError(msg);
    } finally { setLoading(false); }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 text-center">
          <p className="text-2xl font-black text-[#0f0f0f]">
            Sabari <span className="text-[#ff3b3b]">Auto</span>
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {mode === "login" ? "Sign in to your account" : "Create your account"}
          </p>
        </div>

        <div className="mb-6 flex rounded-xl bg-gray-100 p-1">
          {["login", "signup"].map((m) => (
            <button key={m} onClick={() => { setMode(m); setError(""); }}
              className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-all ${
                mode === m ? "bg-white text-[#0f0f0f] shadow-sm" : "text-gray-500"
              }`}>
              {m === "login" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            <AlertCircle className="h-4 w-4 shrink-0" /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <>
              <Field icon={<User />} name="name"  type="text" placeholder="Full Name"                value={form.name}  onChange={handleChange} />
              <Field icon={<Phone />} name="phone" type="tel"  placeholder="Phone Number (10 digits)" value={form.phone} onChange={handleChange} maxLength={10} />
            </>
          )}
          <Field icon={<Mail />} name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} />
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock className="h-4 w-4" />
            </span>
            <input name="password" type={showPwd ? "text" : "password"} placeholder="Password"
              value={form.password} onChange={handleChange} required
              className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff3b3b]" />
            <button type="button" onClick={() => setShowPwd(!showPwd)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <button type="submit" disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff3b3b] py-3 font-bold text-white transition-colors hover:bg-red-700 disabled:opacity-60">
            {loading
              ? <><Loader2 className="h-4 w-4 animate-spin" /> Please wait…</>
              : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-gray-400">
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
            className="font-semibold text-[#ff3b3b] hover:underline">
            {mode === "login" ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}

function Field({ icon, name, type, placeholder, value, onChange, maxLength }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        {React.cloneElement(icon, { className: "h-4 w-4" })}
      </span>
      <input name={name} type={type} placeholder={placeholder}
        value={value} onChange={onChange} required maxLength={maxLength}
        className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff3b3b]" />
    </div>
  );
}
