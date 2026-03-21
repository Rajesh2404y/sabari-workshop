import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, MessageCircle } from "lucide-react";

export default function HeroSection({
  activeModel,
  featuredModel,
  loading = false,
}) {
  const viewerRef = useRef(null);
  const [viewerReady, setViewerReady] = useState(false);
  const [modelLoading, setModelLoading] = useState(true);
  const [modelError, setModelError] = useState(false);
  const [resolvedModelSrc, setResolvedModelSrc] = useState("");

  useEffect(() => {
    let mounted = true;
    import("@google/model-viewer")
      .then(() => {
        if (mounted) setViewerReady(true);
      })
      .catch(() => {
        if (mounted) {
          setViewerReady(false);
          setModelError(true);
          setModelLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const selectedModel = activeModel || featuredModel;

  useEffect(() => {
    let cancelled = false;

    async function resolveModelSource() {
      const primarySrc = selectedModel?.url || "";
      const fallbackSrc = selectedModel?.fallbackUrl || "";

      setModelLoading(true);
      setModelError(false);

      if (!primarySrc) {
        setResolvedModelSrc(fallbackSrc);
        return;
      }

      const isLocalSource =
        primarySrc.startsWith("/") ||
        primarySrc.startsWith("./") ||
        primarySrc.startsWith("../") ||
        primarySrc.startsWith(window.location.origin);

      if (!isLocalSource) {
        if (!cancelled) setResolvedModelSrc(primarySrc);
        return;
      }

      try {
        const response = await fetch(primarySrc, { method: "HEAD" });
        if (!cancelled) setResolvedModelSrc(response.ok ? primarySrc : fallbackSrc || primarySrc);
      } catch {
        if (!cancelled) setResolvedModelSrc(fallbackSrc || primarySrc);
      }
    }

    resolveModelSource();
    return () => {
      cancelled = true;
    };
  }, [selectedModel?.url, selectedModel?.fallbackUrl]);

  useEffect(() => {
    if (!viewerReady || !viewerRef.current) return undefined;

    const element = viewerRef.current;
    const fallbackSrc = selectedModel?.fallbackUrl || "";
    const handleLoad = () => {
      setModelLoading(false);
      setModelError(false);
    };
    const handleError = () => {
      if (fallbackSrc && resolvedModelSrc && resolvedModelSrc !== fallbackSrc) {
        setResolvedModelSrc(fallbackSrc);
        return;
      }
      setModelLoading(false);
      setModelError(true);
    };

    setModelLoading(true);
    setModelError(false);
    element.addEventListener("load", handleLoad);
    element.addEventListener("error", handleError);

    return () => {
      element.removeEventListener("load", handleLoad);
      element.removeEventListener("error", handleError);
    };
  }, [viewerReady, resolvedModelSrc, selectedModel?.fallbackUrl]);

  return (
    <section className="border-b border-gray-100 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:px-8 lg:py-20">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#ff3b3b]">Sabari Auto Workshop</p>
          <h1 className="text-4xl font-extrabold leading-tight text-[#0f0f0f] sm:text-5xl">
            Trusted Car Service in Chennai
          </h1>
          <p className="mt-4 max-w-xl text-lg text-gray-600">Affordable, Reliable, and Fast Service</p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
            Professional workshop support for routine service, repairs, and quick customer assistance.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/booking"
              className="rounded-xl bg-[#ff3b3b] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              Book Service
            </Link>
            <a
              href="https://wa.me/919444484399?text=Hi%20Sabari%20Auto%2C%20I%20need%20car%20service"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-[#0f0f0f] transition-colors hover:border-[#0f0f0f]"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-[#fafafa] p-4">
          <div className="relative h-[260px] overflow-hidden rounded-xl bg-white sm:h-[340px]">
            {(loading || modelLoading || !viewerReady) && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/85">
                <Loader2 className="h-6 w-6 animate-spin text-[#ff3b3b]" />
              </div>
            )}

            {modelError && (
              <div className="absolute inset-0 z-20 flex items-center justify-center px-6 text-center">
                <div>
                  <p className="font-semibold text-[#0f0f0f]">Model preview unavailable</p>
                  <p className="mt-2 text-sm text-gray-500">The homepage will still work normally.</p>
                </div>
              </div>
            )}

            {viewerReady && resolvedModelSrc && (
              <model-viewer
                key={resolvedModelSrc}
                ref={viewerRef}
                src={resolvedModelSrc}
                poster={selectedModel?.poster || undefined}
                alt={selectedModel?.name || "Featured car model"}
                camera-controls
                auto-rotate
                disable-zoom
                interaction-prompt="none"
                loading="lazy"
                shadow-intensity="0.8"
                environment-image="neutral"
                style={{ width: "100%", height: "100%", background: "transparent" }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
