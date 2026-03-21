import { useCallback, useEffect, useMemo, useState } from "react";
import { db, isFirebaseConfigured } from "../firebase";
import {
  CAR_MODELS,
  createCustomCarModel,
  getDefaultCarModel,
  resolveCarModel,
} from "../data/carModels";

let docFn, getDoc, setDoc, serverTimestamp;
if (isFirebaseConfigured) {
  ({ doc: docFn, getDoc, setDoc, serverTimestamp } = require("firebase/firestore"));
}

const SETTINGS_COLLECTION = "settings";
const SETTINGS_DOC_ID = "homepageHero";

export function useFeaturedCarModel() {
  const defaultModel = useMemo(() => getDefaultCarModel(), []);
  const [featuredModel, setFeaturedModel] = useState(defaultModel);
  const [activeModel, setActiveModel] = useState(defaultModel);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [source, setSource] = useState("default");

  useEffect(() => {
    let cancelled = false;

    async function loadFeaturedModel() {
      if (!isFirebaseConfigured || !db) {
        if (!cancelled) {
          setFeaturedModel(defaultModel);
          setActiveModel(defaultModel);
          setSource("default");
          setLoading(false);
        }
        return;
      }

      try {
        const snap = await getDoc(docFn(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID));
        if (!snap.exists()) {
          if (!cancelled) {
            setFeaturedModel(defaultModel);
            setActiveModel(defaultModel);
            setSource("default");
          }
          return;
        }

        const data = snap.data();
        const resolved = resolveCarModel({
          modelId: data.selectedCarModelId,
          modelUrl: data.selectedCarModelURL,
          modelName: data.selectedCarModelName,
        });

        if (!cancelled) {
          setFeaturedModel(resolved);
          setActiveModel(resolved);
          setSource("firebase");
        }
      } catch {
        if (!cancelled) {
          setFeaturedModel(defaultModel);
          setActiveModel(defaultModel);
          setSource("default");
          setError("Could not load featured car model. Showing default vehicle.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadFeaturedModel();
    return () => {
      cancelled = true;
    };
  }, [defaultModel]);

  const selectModel = useCallback((model) => {
    setError("");
    if (!model) {
      setActiveModel(featuredModel);
      return;
    }
    setActiveModel(model);
  }, [featuredModel]);

  const resetToFeatured = useCallback(() => {
    setError("");
    setActiveModel(featuredModel);
  }, [featuredModel]);

  const saveFeaturedModel = useCallback(async (model, customName = "") => {
    const nextModel = model || activeModel;
    if (!nextModel) return false;

    if (!isFirebaseConfigured || !db) {
      setError("Firebase is not configured. Add your Firebase keys to save the featured car.");
      return false;
    }

    setSaving(true);
    setError("");
    try {
      await setDoc(
        docFn(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID),
        {
          selectedCarModelId: nextModel.id === "custom" ? "" : nextModel.id,
          selectedCarModelName: customName || nextModel.name,
          selectedCarModelURL: nextModel.url,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      setFeaturedModel(nextModel);
      setActiveModel(nextModel);
      setSource("firebase");
      return true;
    } catch {
      setError("Failed to save the featured car model. Please try again.");
      return false;
    } finally {
      setSaving(false);
    }
  }, [activeModel]);

  const createManualModel = useCallback((url, name) => {
    if (!url?.trim()) return null;
    return createCustomCarModel(url.trim(), name?.trim() || "Custom Car Model");
  }, []);

  return {
    models: CAR_MODELS,
    featuredModel,
    activeModel,
    loading,
    saving,
    error,
    source,
    selectModel,
    resetToFeatured,
    saveFeaturedModel,
    createManualModel,
  };
}
