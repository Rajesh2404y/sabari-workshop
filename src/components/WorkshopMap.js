import React, { useState, useCallback } from "react";
import { MapPin, Navigation, Loader2, AlertCircle, ExternalLink } from "lucide-react";

const WORKSHOP = { lat: 13.0850, lng: 80.2101 };
const MAPS_LINK = "https://maps.google.com/?q=Sabari+Auto+Workshop+Anna+Nagar+Chennai";

// Lazy-load Google Maps only when key is available
let GoogleMap, useJsApiLoader, Marker, InfoWindow, DirectionsRenderer;
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY || "";
const isConfigured = API_KEY && !API_KEY.includes("your_");

if (isConfigured) {
  try {
    const gmaps = require("@react-google-maps/api");
    GoogleMap           = gmaps.GoogleMap;
    useJsApiLoader      = gmaps.useJsApiLoader;
    Marker              = gmaps.Marker;
    InfoWindow          = gmaps.InfoWindow;
    DirectionsRenderer  = gmaps.DirectionsRenderer;
  } catch {
    // package not available
  }
}

const MAP_STYLE = [
  { featureType: "poi",     elementType: "labels", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
];

// Fallback shown when Maps API key is not configured
function MapFallback() {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
      <div className="h-64 flex flex-col items-center justify-center gap-3 text-center px-6">
        <div className="w-14 h-14 bg-brand-red/10 rounded-full flex items-center justify-center">
          <MapPin className="w-7 h-7 text-brand-red" />
        </div>
        <div>
          <p className="font-bold text-brand-dark">Sabari Auto Workshop</p>
          <p className="text-gray-500 text-sm mt-0.5">123, Anna Nagar, Chennai – 600040</p>
          <p className="text-gray-400 text-xs mt-1">Mon–Sat: 8 AM–8 PM · Sun: 9 AM–5 PM</p>
        </div>
        <a href={MAPS_LINK} target="_blank" rel="noreferrer"
          className="flex items-center gap-2 bg-brand-red text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition-colors">
          <ExternalLink className="w-4 h-4" /> Open in Google Maps
        </a>
      </div>
    </div>
  );
}

// Interactive map — only rendered when API key exists
function InteractiveMap({ showFinder }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries: ["places"],
  });

  const [map, setMap]               = useState(null);
  const [infoOpen, setInfoOpen]     = useState(true);
  const [userPos, setUserPos]       = useState(null);
  const [directions, setDirections] = useState(null);
  const [locating, setLocating]     = useState(false);
  const [locError, setLocError]     = useState("");

  const onLoad = useCallback((m) => setMap(m), []);

  function getDirections(origin) {
    if (!window.google) return;
    new window.google.maps.DirectionsService().route(
      { origin, destination: WORKSHOP, travelMode: window.google.maps.TravelMode.DRIVING },
      (result, status) => { if (status === "OK") setDirections(result); }
    );
  }

  function findMe() {
    setLocError(""); setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserPos(coords);
        map?.panTo(coords);
        getDirections(coords);
        setLocating(false);
      },
      () => { setLocError("Location access denied."); setLocating(false); }
    );
  }

  if (!isLoaded) return (
    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-2xl">
      <Loader2 className="w-6 h-6 animate-spin text-brand-red" />
    </div>
  );

  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
      <div className="bg-brand-dark px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-brand-red" />
          <span className="text-white text-sm font-semibold">Sabari Auto Workshop</span>
          <span className="text-gray-400 text-xs">· Anna Nagar, Chennai</span>
        </div>
        <div className="flex gap-2">
          {showFinder && (
            <button onClick={findMe} disabled={locating}
              className="flex items-center gap-1.5 bg-brand-yellow text-brand-dark px-3 py-1.5 rounded-full text-xs font-bold hover:bg-yellow-400 transition-colors disabled:opacity-60">
              {locating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Navigation className="w-3 h-3" />}
              {locating ? "Locating…" : "Get Directions"}
            </button>
          )}
          <a href={MAPS_LINK} target="_blank" rel="noreferrer"
            className="flex items-center gap-1 bg-brand-red text-white px-3 py-1.5 rounded-full text-xs font-bold hover:bg-red-700 transition-colors">
            <ExternalLink className="w-3 h-3" /> Maps
          </a>
        </div>
      </div>
      {locError && (
        <div className="bg-red-50 border-b border-red-200 px-4 py-2 flex items-center gap-2 text-red-600 text-xs">
          <AlertCircle className="w-3.5 h-3.5" /> {locError}
        </div>
      )}
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "320px" }}
        center={WORKSHOP} zoom={15} onLoad={onLoad}
        options={{ styles: MAP_STYLE, zoomControl: true }}
      >
        <Marker position={WORKSHOP} onClick={() => setInfoOpen(true)}
          icon={{ url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="#E53E3E" stroke="white" stroke-width="3"/>
              <text x="18" y="23" text-anchor="middle" font-size="16">🔧</text>
            </svg>`
          )}}
        />
        {infoOpen && (
          <InfoWindow position={WORKSHOP} onCloseClick={() => setInfoOpen(false)}>
            <div className="text-xs p-1">
              <p className="font-bold text-gray-800">Sabari Auto Workshop</p>
              <p className="text-gray-500">123, Anna Nagar, Chennai</p>
              <p className="text-green-600 font-medium mt-1">Open · 8 AM – 8 PM</p>
            </div>
          </InfoWindow>
        )}
        {userPos && <Marker position={userPos} label={{ text: "You", color: "white", fontSize: "10px" }} />}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  );
}

export default function WorkshopMap({ showFinder = false }) {
  if (!isConfigured || !useJsApiLoader) return <MapFallback />;
  return <InteractiveMap showFinder={showFinder} />;
}
