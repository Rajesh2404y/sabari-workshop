import React from "react";
import { CheckCircle2, Loader2, Save } from "lucide-react";

export default function CarSelector({
  models,
  selectedId,
  onSelect,
  onSave,
  saving = false,
  title = "Choose a car model",
  description = "Preview different vehicles or set one as the homepage hero model.",
  saveLabel = "Set Featured Car",
  compact = false,
}) {
  return (
    <div className={`rounded-3xl border border-white/10 bg-white/5 ${compact ? "p-4" : "p-5"} backdrop-blur-sm`}>
      <div className="mb-4">
        <p className="font-semibold text-white">{title}</p>
        <p className="mt-1 text-sm text-gray-400">{description}</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {models.map((model) => {
          const selected = model.id === selectedId;
          return (
            <button
              key={model.id}
              type="button"
              onClick={() => onSelect?.(model)}
              className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                selected
                  ? "border-[#ff3b3b] bg-[#ff3b3b]/15 shadow-[0_0_18px_rgba(255,59,59,0.18)]"
                  : "border-white/10 bg-black/20 hover:border-white/20 hover:bg-white/8"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-white">{model.name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-gray-400">{model.tagline}</p>
                </div>
                {selected && <CheckCircle2 className="h-4 w-4 shrink-0 text-[#ffc107]" />}
              </div>
            </button>
          );
        })}
      </div>

      {onSave && (
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={() => onSave()}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-[#ff3b3b] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saveLabel}
          </button>
        </div>
      )}
    </div>
  );
}
