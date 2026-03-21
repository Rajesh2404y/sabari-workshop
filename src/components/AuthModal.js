import React, { useState } from "react";
import { X, Mail, Lock, User, Phone, Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function AuthModal({ onClose }) {
  const [mode, setMode]       = useState("login"); // "login" | "signup"
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [form, setForm]       = useState({ name: "", email: "", phone: "", password: "" });
  const { login, signup }     = useAuth();

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
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
      const msg = err.code === "auth/user-not-found"    ? "No account found with this email"
                : err.code === "auth/wrong-password"    ? "Incorrect password"
                : err.code === "auth/email-already-in-use" ? "Email already registered"
                : err.code === "auth/weak-password"     ? "Password must be at least 6 characters"
                : err.message || "Something went wrong";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-slide-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>

        {/* Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1 mb-1">
            <span className="text-brand-dark font-black text-2xl">Sabari</span>
            <span className="text-brand-yellow font-black text-2xl"> Auto</span>
          </div>
          <p className="text-gray-500 text-sm">
            {mode === "login" ? "Sign in to your account" : "Create your account"}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          {["login", "signup"].map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(""); }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                mode === m ? "bg-white text-brand-dark shadow-sm" : "text-gray-500"
              }`}
            >
              {m === "login" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <>
              <Field icon={<User />} name="name" type="text" placeholder="Full Name" value={form.name} onChange={handleChange} />
              <Field icon={<Phone />} name="phone" type="tel" placeholder="Phone Number (10 digits)" value={form.phone} onChange={handleChange} maxLength={10} />
            </>
          )}
          <Field icon={<Mail />} name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} />
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"><Lock className="w-4 h-4" /></span>
            <input
              name="password" type={showPwd ? "text" : "password"} placeholder="Password"
              value={form.password} onChange={handleChange} required
              className="w-full border border-gray-200 rounded-xl pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
            />
            <button type="button" onClick={() => setShowPwd(!showPwd)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full bg-brand-red text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Please wait…</> : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-4">
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
            className="text-brand-red font-semibold hover:underline">
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
        {React.cloneElement(icon, { className: "w-4 h-4" })}
      </span>
      <input
        name={name} type={type} placeholder={placeholder}
        value={value} onChange={onChange} required maxLength={maxLength}
        className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
      />
    </div>
  );
}
