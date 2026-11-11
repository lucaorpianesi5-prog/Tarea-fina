// Service worker de Tarea Fina: permite jugar sin internet.
// - La página y las frases (data/frases.tsv) se piden primero a la red, así cada cambio del repo
//   se ve enseguida; si no hay conexión, se usa la última copia guardada.
// - Íconos, logo y fuentes se sirven desde la copia guardada y se actualizan en segundo plano.
// Si se cambia la lista CORE o la forma de cachear, subir el número de CACHE.
const CACHE = "tarea-fina-v1";
const CORE = [
  "./",
  "./index.html",
  "./data/frases.tsv",
  "./manifest.webmanifest",
  "./assets/logo.svg",
  "./assets/favicon.svg",
  "./assets/apple-touch-icon.png",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/icon-512-maskable.png"
];
const FONT_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function networkFirst(request, fallbackUrl) {
  return fetch(request)
    .then((res) => {
      if (res && res.ok) {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(fallbackUrl || request, copy));
      }
      return res;
    })
    .catch(() =>
      caches.match(fallbackUrl || request, { ignoreSearch: true })
        .then((hit) => hit || caches.match("./index.html"))
    );
}

function staleWhileRevalidate(request) {
  return caches.open(CACHE).then((c) =>
    c.match(request, { ignoreSearch: true }).then((hit) => {
      const net = fetch(request)
        .then((res) => {
          if (res && (res.ok || res.type === "opaque")) c.put(request, res.clone());
          return res;
        })
        .catch(() => hit);
      return hit || net;
    })
  );
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  if (url.origin === self.location.origin) {
    if (req.mode === "navigate") {
      event.respondWith(networkFirst(req, "./index.html"));
    } else if (url.pathname.endsWith("/data/frases.tsv")) {
      event.respondWith(networkFirst(req, "./data/frases.tsv"));
    } else {
      event.respondWith(staleWhileRevalidate(req));
    }
  } else if (FONT_HOSTS.includes(url.hostname)) {
    event.respondWith(staleWhileRevalidate(req));
  }
});
