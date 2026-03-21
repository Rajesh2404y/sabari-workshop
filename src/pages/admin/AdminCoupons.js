import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db, isFirebaseConfigured } from "../../firebase";
import { Plus, Trash2, Edit2, Check, X, Loader2, Tag, Lock } from "lucide-react";

let collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp;
if (isFirebaseConfigured) {
  ({ collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp }
    = require("firebase/firestore"));
}

const EMPTY = { code: "", type: "flat", value: "", description: "", minOrder: 0, active: true };

export default function AdminCoupons() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm]       = useState(EMPTY);
  const [editId, setEditId]   = useState(null);
  const [saving, setSaving]   = useState(false);

  // Auth guard — only admin role
  useEffect(() => {
    if (!user) { navigate("/"); return; }
    if (profile && profile.role !== "admin") { navigate("/"); }
  }, [user, profile, navigate]);

  async function load() {
    if (!isFirebaseConfigured || !db) { setLoading(false); return; }
    try {
      const snap = await getDocs(collection(db, "coupons"));
      setCoupons(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch { setCoupons([]); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []); // eslint-disable-line

  async function save() {
    if (!form.code || !form.value || !isFirebaseConfigured) return;
    setSaving(true);
    try {
      const data = {
        ...form,
        code: form.code.toUpperCase(),
        value: Number(form.value),
        minOrder: Number(form.minOrder || 0),
        updatedAt: serverTimestamp(),
      };
      if (editId) {
        await updateDoc(doc(db, "coupons", editId), data);
      } else {
        await addDoc(collection(db, "coupons"), { ...data, createdAt: serverTimestamp() });
      }
      setForm(EMPTY); setEditId(null); await load();
    } finally { setSaving(false); }
  }

  async function remove(id) {
    if (!window.confirm("Delete this coupon?") || !isFirebaseConfigured) return;
    await deleteDoc(doc(db, "coupons", id));
    await load();
  }

  function startEdit(c) {
    setForm({ code: c.code, type: c.type, value: c.value, description: c.description, minOrder: c.minOrder || 0, active: c.active });
    setEditId(c.id);
  }

  if (!user || (profile && profile.role !== "admin")) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Lock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="font-semibold text-gray-500">Access Denied</p>
          <p className="text-gray-400 text-sm mt-1">Admin access required</p>
        </div>
      </div>
    );
  }

  if (!isFirebaseConfigured) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center max-w-md">
          <Tag className="w-12 h-12 text-brand-red mx-auto mb-3" />
          <h2 className="font-bold text-brand-dark text-lg mb-2">Firebase Required</h2>
          <p className="text-gray-500 text-sm">Coupon management requires Firebase. Add your Firebase credentials to the .env file to enable this feature.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-brand-dark py-10 text-center">
        <h1 className="text-3xl font-bold text-white">Coupon Management</h1>
        <p className="text-gray-400 text-sm mt-1">Add, edit, and manage discount coupons</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-brand-dark mb-4 flex items-center gap-2">
            <Tag className="w-5 h-5 text-brand-red" />
            {editId ? "Edit Coupon" : "Add New Coupon"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Coupon Code *</label>
              <input value={form.code} onChange={(e) => setForm((p) => ({ ...p, code: e.target.value.toUpperCase() }))}
                placeholder="e.g. SAVE10" className="input-field uppercase" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Discount Type *</label>
              <select value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))} className="input-field">
                <option value="flat">Flat (₹)</option>
                <option value="percent">Percent (%)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Value *</label>
              <input type="number" value={form.value} onChange={(e) => setForm((p) => ({ ...p, value: e.target.value }))}
                placeholder={form.type === "flat" ? "e.g. 50" : "e.g. 10"} className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Min Order (₹)</label>
              <input type="number" value={form.minOrder} onChange={(e) => setForm((p) => ({ ...p, minOrder: e.target.value }))}
                placeholder="0" className="input-field" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
              <input value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                placeholder="e.g. ₹50 off your first service" className="input-field" />
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input type="checkbox" checked={form.active} onChange={(e) => setForm((p) => ({ ...p, active: e.target.checked }))}
                className="accent-brand-red w-4 h-4" />
              Active
            </label>
            <div className="flex gap-2 ml-auto">
              {editId && (
                <button onClick={() => { setForm(EMPTY); setEditId(null); }}
                  className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50">
                  <X className="w-4 h-4" /> Cancel
                </button>
              )}
              <button onClick={save} disabled={saving || !form.code || !form.value}
                className="flex items-center gap-2 bg-brand-red text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-red-700 transition-colors disabled:opacity-60">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                {editId ? "Update" : "Add Coupon"}
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-brand-dark">All Coupons ({coupons.length})</h2>
          </div>
          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-brand-red" /></div>
          ) : coupons.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <Plus className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">No coupons yet. Add one above.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {coupons.map((c) => (
                <div key={c.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <span className="bg-brand-dark text-brand-yellow font-mono font-bold text-sm px-3 py-1 rounded-lg">{c.code}</span>
                    <div>
                      <p className="text-sm font-semibold text-brand-dark">
                        {c.type === "flat" ? `₹${c.value} off` : `${c.value}% off`}
                        {c.minOrder > 0 && <span className="text-gray-400 font-normal"> · Min ₹{c.minOrder}</span>}
                      </p>
                      <p className="text-xs text-gray-400">{c.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {c.active ? "Active" : "Inactive"}
                    </span>
                    <button onClick={() => startEdit(c)} className="text-gray-400 hover:text-brand-dark transition-colors"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => remove(c.id)} className="text-gray-400 hover:text-brand-red transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
