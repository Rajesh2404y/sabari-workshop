import { useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

// Local fallback coupons (used when Firebase is not configured)
const LOCAL_COUPONS = [
  { code: "FIRST50", type: "flat",    value: 50,  description: "₹50 off your first service",  minOrder: 0   },
  { code: "SAVE10",  type: "percent", value: 10,  description: "10% off any service",          minOrder: 500 },
  { code: "AC200",   type: "flat",    value: 200, description: "₹200 off AC service",          minOrder: 799 },
];

export function useCoupon() {
  const [coupon, setCoupon]   = useState(null);
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  function calcDiscount(basePrice) {
    if (!coupon) return 0;
    if (coupon.type === "flat")    return Math.min(coupon.value, basePrice);
    if (coupon.type === "percent") return Math.round((basePrice * coupon.value) / 100);
    return 0;
  }

  async function applyCoupon(code, basePrice) {
    setError("");
    if (!code.trim()) { setError("Enter a coupon code"); return; }
    setLoading(true);

    try {
      // Try Firebase first
      const snap = await getDocs(
        query(collection(db, "coupons"), where("code", "==", code.toUpperCase().trim()), where("active", "==", true))
      );

      let found = null;
      if (!snap.empty) {
        found = snap.docs[0].data();
      } else {
        // Fallback to local coupons
        found = LOCAL_COUPONS.find((c) => c.code === code.toUpperCase().trim()) || null;
      }

      if (!found) { setError("Invalid or expired coupon code"); setLoading(false); return; }
      if (basePrice < (found.minOrder || 0)) {
        setError(`Minimum order ₹${found.minOrder} required for this coupon`);
        setLoading(false);
        return;
      }

      setCoupon(found);
    } catch {
      // Firebase not configured — use local fallback
      const found = LOCAL_COUPONS.find((c) => c.code === code.toUpperCase().trim());
      if (!found) { setError("Invalid coupon code"); setLoading(false); return; }
      if (basePrice < (found.minOrder || 0)) {
        setError(`Minimum order ₹${found.minOrder} required`);
        setLoading(false);
        return;
      }
      setCoupon(found);
    } finally {
      setLoading(false);
    }
  }

  function removeCoupon() {
    setCoupon(null);
    setError("");
  }

  return { coupon, error, loading, applyCoupon, removeCoupon, calcDiscount };
}
