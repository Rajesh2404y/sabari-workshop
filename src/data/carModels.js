const REMOTE_FALLBACK_MODEL_URL =
  process.env.REACT_APP_REMOTE_FALLBACK_CAR_MODEL_URL ||
  "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ToyCar/glTF-Binary/ToyCar.glb";

export const DEFAULT_CAR_MODEL_ID = "toyota";

export const CAR_MODELS = [
  {
    id: "toyota",
    name: "Toyota Car",
    shortName: "Toyota",
    tagline: "Reliable city-ready styling for daily service customers.",
    url: process.env.REACT_APP_TOYOTA_MODEL_URL || "/models/toyota-car.glb",
    fallbackUrl: REMOTE_FALLBACK_MODEL_URL,
    poster: process.env.REACT_APP_TOYOTA_MODEL_POSTER || "",
  },
  {
    id: "hyundai",
    name: "Hyundai Car",
    shortName: "Hyundai",
    tagline: "Modern hatchback-inspired presentation for premium bookings.",
    url: process.env.REACT_APP_HYUNDAI_MODEL_URL || "/models/hyundai-car.glb",
    fallbackUrl: REMOTE_FALLBACK_MODEL_URL,
    poster: process.env.REACT_APP_HYUNDAI_MODEL_POSTER || "",
  },
  {
    id: "bmw",
    name: "BMW Car",
    shortName: "BMW",
    tagline: "Sporty showroom-style hero visual for luxury service leads.",
    url: process.env.REACT_APP_BMW_MODEL_URL || "/models/bmw-car.glb",
    fallbackUrl: REMOTE_FALLBACK_MODEL_URL,
    poster: process.env.REACT_APP_BMW_MODEL_POSTER || "",
  },
];

export function getDefaultCarModel() {
  return CAR_MODELS.find((model) => model.id === DEFAULT_CAR_MODEL_ID) || CAR_MODELS[0];
}

export function getCarModelById(id) {
  return CAR_MODELS.find((model) => model.id === id) || null;
}

export function getCarModelByUrl(url) {
  return CAR_MODELS.find((model) => model.url === url) || null;
}

export function createCustomCarModel(url, name = "Featured Car Model") {
  return {
    id: "custom",
    name,
    shortName: name,
    tagline: "Custom featured model loaded from your selected GLB or GLTF URL.",
    url,
    fallbackUrl: REMOTE_FALLBACK_MODEL_URL,
    poster: "",
  };
}

export function resolveCarModel({ modelId, modelUrl, modelName } = {}) {
  if (modelId) {
    const foundById = getCarModelById(modelId);
    if (foundById) return foundById;
  }

  if (modelUrl) {
    const foundByUrl = getCarModelByUrl(modelUrl);
    if (foundByUrl) return foundByUrl;
    return createCustomCarModel(modelUrl, modelName);
  }

  return getDefaultCarModel();
}
