import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CarFront, Loader2, Lock, Save, Sparkles, Upload } from "lucide-react";
import CarSelector from "../../components/CarSelector";
import HeroSection from "../../components/HeroSection";
import { useAuth } from "../../context/AuthContext";
import { useFeaturedCarModel } from "../../hooks/useFeaturedCarModel";
import { isFirebaseConfigured, isFirebaseStorageConfigured, storage } from "../../firebase";

let storageRefFn, uploadBytes, getDownloadURL;
if (isFirebaseStorageConfigured) {
  ({ ref: storageRefFn, uploadBytes, getDownloadURL } = require("firebase/storage"));
}

export default function AdminFeaturedCar() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const {
    models,
    featuredModel,
    activeModel,
    loading,
    saving,
    error,
    selectModel,
    saveFeaturedModel,
    resetToFeatured,
    createManualModel,
  } = useFeaturedCarModel();
  const [customName, setCustomName] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [notice, setNotice] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    if (profile && profile.role !== "admin") {
      navigate("/");
    }
  }, [user, profile, navigate]);

  async function handleSaveSelected() {
    const ok = await saveFeaturedModel(activeModel, activeModel?.name);
    if (ok) setNotice("Featured homepage car updated successfully.");
  }

  async function handleSaveCustomModel() {
    const manualModel = createManualModel(customUrl, customName);
    if (!manualModel) {
      setNotice("Enter a valid model URL before saving.");
      return;
    }

    selectModel(manualModel);
    const ok = await saveFeaturedModel(manualModel, customName);
    if (ok) {
      setNotice("Custom featured model saved successfully.");
      setCustomName("");
      setCustomUrl("");
    }
  }

  async function handleUploadModelFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!isFirebaseStorageConfigured || !storage) {
      setNotice("Firebase Storage is not configured. Use a local /models path or direct URL instead.");
      event.target.value = "";
      return;
    }

    setNotice("");
    setUploading(true);
    try {
      const safeName = file.name.replace(/\s+/g, "-").toLowerCase();
      const path = `car-models/${Date.now()}-${safeName}`;
      const uploadedRef = storageRefFn(storage, path);
      await uploadBytes(uploadedRef, file);
      const downloadUrl = await getDownloadURL(uploadedRef);
      setCustomUrl(downloadUrl);
      setCustomName((current) => current || file.name.replace(/\.(glb|gltf)$/i, ""));
      setNotice("Model uploaded. Review the preview, then save it as the featured car.");
    } catch {
      setNotice("Upload failed. Please try again with a valid GLB or GLTF file.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  if (!user || (profile && profile.role !== "admin")) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <Lock className="mx-auto mb-3 h-12 w-12 text-gray-300" />
          <p className="font-semibold text-gray-500">Access Denied</p>
          <p className="mt-1 text-sm text-gray-400">Admin access required</p>
        </div>
      </div>
    );
  }

  if (!isFirebaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
          <CarFront className="mx-auto mb-3 h-12 w-12 text-brand-red" />
          <h2 className="mb-2 text-lg font-bold text-brand-dark">Firebase Required</h2>
          <p className="text-sm text-gray-500">
            Add your Firebase credentials in `.env` to save the featured homepage car model.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b]">
      <div className="border-b border-white/10 bg-black/40 py-10 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ffc107]">Admin Control</p>
              <h1 className="mt-2 text-3xl font-bold text-white">Homepage Featured Car</h1>
              <p className="mt-2 max-w-2xl text-sm text-gray-400">
                Choose a preset model or save a custom GLB or GLTF URL into Firestore `settings/homepageHero`.
              </p>
              <p className="mt-2 max-w-2xl text-xs text-gray-500">
                Local files can be placed in `public/models/` and referenced like `/models/toyota-car.glb`.
              </p>
            </div>
            {loading && (
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading saved settings
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <CarSelector
          models={models}
          selectedId={activeModel?.id}
          onSelect={(model) => {
            setNotice("");
            selectModel(model);
          }}
          onSave={handleSaveSelected}
          saving={saving}
          title="Preset Car Models"
          description="Pick one of the predefined hero models and save it as the featured homepage vehicle."
        />

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="mb-5 flex items-center gap-2 text-white">
            <Sparkles className="h-5 w-5 text-[#ffc107]" />
            <h2 className="text-lg font-semibold">Custom Model URL</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[0.8fr_1.2fr_auto]">
            <input
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="Custom model name"
              className="input-field bg-white"
            />
            <input
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="https://your-cdn.com/models/car.glb or /models/toyota-car.glb"
              className="input-field bg-white"
            />
            <button
              type="button"
              onClick={handleSaveCustomModel}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff3b3b] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-red-700 disabled:opacity-70"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save Custom
            </button>
          </div>
          <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Upload GLB or GLTF to Firebase Storage</p>
              <p className="mt-1 text-xs text-gray-400">
                Upload a compressed model file, preview it here, then click save to make it live.
              </p>
            </div>
            <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/20 hover:bg-white/5">
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              {uploading ? "Uploading..." : "Upload Model"}
              <input
                type="file"
                accept=".glb,.gltf,model/gltf-binary,model/gltf+json"
                className="hidden"
                onChange={handleUploadModelFile}
                disabled={uploading}
              />
            </label>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <button
              type="button"
              onClick={() => {
                setNotice("");
                resetToFeatured();
              }}
              className="rounded-full border border-white/10 px-4 py-2 text-gray-300 transition-colors hover:border-white/20 hover:text-white"
            >
              Reset Preview
            </button>
            <span className="rounded-full border border-white/10 px-4 py-2 text-gray-400">
              Default local files: `/models/toyota-car.glb`, `/models/hyundai-car.glb`, `/models/bmw-car.glb`
            </span>
            {notice && <p className="text-green-400">{notice}</p>}
            {!notice && error && <p className="text-red-400">{error}</p>}
          </div>
        </div>

        <HeroSection
          models={models}
          activeModel={activeModel}
          featuredModel={featuredModel}
          onSelectModel={(model) => {
            setNotice("");
            selectModel(model);
          }}
          loading={loading}
        />
      </div>
    </div>
  );
}
