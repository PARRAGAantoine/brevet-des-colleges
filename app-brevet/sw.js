const CACHE_NAME = "brevet-sprint-v1.1.1";
const CORE_ASSETS = [
  ".",
  "index.html",
  "styles.css",
  "app.js",
  "version.json",
  "manifest.webmanifest",
  "data/annales.js",
  "data/content.js",
  "data/extra-content-2.js",
  "data/extra-content-3.js",
  "data/extra-content-4.js",
  "data/extra-content-5.js",
  "data/extra-content-6.js",
  "data/extra-content-7.js",
  "data/extra-content-8.js",
  "data/extra-content-9.js",
  "data/extra-content.js",
  "data/notions.js",
  "generators/french-language.js",
  "generators/math-calcul.js",
  "generators/registry.js",
  "generators/science-calcul.js",
  "assets/badges/badge-annales-bronze.webp",
  "assets/badges/badge-annales-gold.webp",
  "assets/badges/badge-annales-locked.webp",
  "assets/badges/badge-annales-silver.webp",
  "assets/badges/badge-chapter-bronze.webp",
  "assets/badges/badge-chapter-gold.webp",
  "assets/badges/badge-chapter-locked.webp",
  "assets/badges/badge-chapter-silver.webp",
  "assets/badges/badge-guided-bronze.webp",
  "assets/badges/badge-guided-gold.webp",
  "assets/badges/badge-guided-locked.webp",
  "assets/badges/badge-guided-silver.webp",
  "assets/badges/badge-perfect-bronze.webp",
  "assets/badges/badge-perfect-gold.webp",
  "assets/badges/badge-perfect-locked.webp",
  "assets/badges/badge-perfect-silver.webp",
  "assets/badges/badge-questions-bronze.webp",
  "assets/badges/badge-questions-gold.webp",
  "assets/badges/badge-questions-locked.webp",
  "assets/badges/badge-questions-silver.webp",
  "assets/badges/badge-repairs-bronze.webp",
  "assets/badges/badge-repairs-gold.webp",
  "assets/badges/badge-repairs-locked.webp",
  "assets/badges/badge-repairs-silver.webp",
  "assets/badges/badge-sessions-bronze.webp",
  "assets/badges/badge-sessions-gold.webp",
  "assets/badges/badge-sessions-locked.webp",
  "assets/badges/badge-sessions-silver.webp",
  "assets/badges/badge-stage-discovery-bronze.webp",
  "assets/badges/badge-stage-discovery-gold.webp",
  "assets/badges/badge-stage-discovery-locked.webp",
  "assets/badges/badge-stage-discovery-silver.webp",
  "assets/badges/badge-stage-exam-bronze.webp",
  "assets/badges/badge-stage-exam-gold.webp",
  "assets/badges/badge-stage-exam-locked.webp",
  "assets/badges/badge-stage-exam-silver.webp",
  "assets/badges/badge-stage-training-bronze.webp",
  "assets/badges/badge-stage-training-gold.webp",
  "assets/badges/badge-stage-training-locked.webp",
  "assets/badges/badge-stage-training-silver.webp",
  "assets/badges/badge-streak-bronze.webp",
  "assets/badges/badge-streak-gold.webp",
  "assets/badges/badge-streak-locked.webp",
  "assets/badges/badge-streak-silver.webp",
  "assets/badges/badge-subject-french-bronze.webp",
  "assets/badges/badge-subject-french-gold.webp",
  "assets/badges/badge-subject-french-locked.webp",
  "assets/badges/badge-subject-french-silver.webp",
  "assets/badges/badge-subject-history-bronze.webp",
  "assets/badges/badge-subject-history-gold.webp",
  "assets/badges/badge-subject-history-locked.webp",
  "assets/badges/badge-subject-history-silver.webp",
  "assets/badges/badge-subject-math-bronze.webp",
  "assets/badges/badge-subject-math-gold.webp",
  "assets/badges/badge-subject-math-locked.webp",
  "assets/badges/badge-subject-math-silver.webp",
  "assets/badges/badge-subject-science-bronze.webp",
  "assets/badges/badge-subject-science-gold.webp",
  "assets/badges/badge-subject-science-locked.webp",
  "assets/badges/badge-subject-science-silver.webp",
  "assets/badges/badge-ultimate-bronze.webp",
  "assets/badges/badge-ultimate-gold.webp",
  "assets/badges/badge-ultimate-locked.webp",
  "assets/badges/badge-ultimate-silver.webp",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",
  "assets/pattern.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
      return response;
    }).catch(() => caches.match("index.html")))
  );
});
