import React, { useEffect, useMemo, useRef, useState } from "react";
import { getEmbedUrl, isGoogleDriveFolder } from "../utils/getEmbedUrl";

const WINDOW_NAME = "video-popup";
const POPUP_FEATURES =
  "noopener,noreferrer,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes";

// --- Helpers YouTube ---
function isYouTubeHost(host) {
  return /(^|\.)youtube\.com$|(^|\.)youtu\.be$/.test(host);
}

function isYouTubeUrl(raw = "") {
  try {
    const u = new URL(raw);
    return isYouTubeHost(u.hostname) || u.pathname.startsWith("/shorts/") || u.pathname === "/playlist";
  } catch {
    return false;
  }
}

/**
 * Normaliza a páginas con publicidad:
 * - youtu.be/<id>           -> https://www.youtube.com/watch?v=<id>
 * - youtube.com/embed/<id>  -> https://www.youtube.com/watch?v=<id>
 * - youtube.com/shorts/<id> -> https://www.youtube.com/watch?v=<id>
 * - youtube.com/watch?v=... -> igual
 * - youtube.com/playlist?list=... -> deja la página de playlist (con anuncios también)
 */
function toWatchOrPlaylistUrl(raw = "") {
  try {
    const u = new URL(raw);

    // si no es YouTube ni Shorts/Playlist, no tocamos
    if (!isYouTubeHost(u.hostname) && !u.pathname.startsWith("/shorts/") && u.pathname !== "/playlist") {
      return raw;
    }

    // youtu.be/<id>
    if (/youtu\.be$/.test(u.hostname)) {
      const id = u.pathname.replace(/^\/+/, "");
      const out = new URL("https://www.youtube.com/watch");
      out.searchParams.set("v", id);
      if (u.searchParams.get("t")) out.searchParams.set("t", u.searchParams.get("t"));
      if (u.searchParams.get("start")) out.searchParams.set("start", u.searchParams.get("start"));
      return out.toString();
    }

    // youtube.com/embed/<id>
    if (u.hostname.includes("youtube.com") && u.pathname.startsWith("/embed/")) {
      const id = u.pathname.split("/embed/")[1]?.split("/")[0];
      const out = new URL("https://www.youtube.com/watch");
      out.searchParams.set("v", id);
      if (u.searchParams.get("t")) out.searchParams.set("t", u.searchParams.get("t"));
      if (u.searchParams.get("start")) out.searchParams.set("start", u.searchParams.get("start"));
      return out.toString();
    }

    // youtube.com/shorts/<id>
    if (u.pathname.startsWith("/shorts/")) {
      const id = u.pathname.split("/shorts/")[1]?.split("/")[0];
      const out = new URL("https://www.youtube.com/watch");
      out.searchParams.set("v", id);
      return out.toString();
    }

    // playlist -> dejamos la página de playlist (YouTube muestra anuncios ahí también)
    if (u.pathname === "/playlist" && u.searchParams.get("list")) {
      return u.toString();
    }

    // watch con v
    if (u.pathname === "/watch" && u.searchParams.get("v")) {
      return u.toString();
    }

    // fallback: cualquier otra ruta de youtube -> devolver tal cual
    return u.toString();
  } catch {
    return raw;
  }
}

const EmbedFrame2 = ({ url, title = "Documento", isLoading, setIsLoading }) => {
  const isFolder = isGoogleDriveFolder(url);
  const [fade, setFade] = useState(false);
  const [blockedPopup, setBlockedPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const timeoutRef = useRef(null);

  const lastOpenRef = useRef(0); // evita pop-ups duplicados por re-render

  const src = useMemo(() => getEmbedUrl(url), [url]);
  const isYT = useMemo(() => isYouTubeUrl(url), [url]);
  const finalYTUrl = useMemo(() => (isYT ? toWatchOrPlaylistUrl(url) : null), [isYT, url]);

  // --- Abrir pop-up (reutiliza misma ventana + throttle 1s) ---
  const openPopup = (targetUrl) => {
    if (!targetUrl || typeof window === "undefined") return false;

    const now = Date.now();
    if (now - lastOpenRef.current < 1000) return false; // throttle
    lastOpenRef.current = now;

    const isMobile = window.innerWidth < 768;
    const width = isMobile ? window.innerWidth : 1000;
    const height = isMobile ? window.innerHeight : 700;
    const left = Math.max((window.innerWidth - width) / 2, 0);
    const top = Math.max((window.innerHeight - height) / 2, 0);

    const win = window.open(
      targetUrl,
      WINDOW_NAME, // ← reutiliza la misma ventana
      `${POPUP_FEATURES},width=${width},height=${height},top=${top},left=${left}`
    );

    if (!win) {
      setBlockedPopup(true);
      return false;
    }
    try { win.focus(); } catch {}
    setBlockedPopup(false);
    return true;
  };

  // --- SOLO YouTube: abrir pop-up y no usar iframe ---
  useEffect(() => {
    if (!isYT || !finalYTUrl) return;
    setIsLoading?.(false); // apaga loader externo; no hay iframe
    setFade(false);
    setErrorMsg("");
    openPopup(finalYTUrl); // intento automático (si bloquea, muestra botón)
  }, [isYT, finalYTUrl, setIsLoading]);

  // --- NO YouTube: flujo original con iframe ---
  useEffect(() => {
    if (isYT) return; // ya gestionado arriba

    setFade(false);
    setErrorMsg("");

    if (isFolder) {
      setIsLoading?.(false);
      setBlockedPopup(false);
      return;
    }

    setIsLoading?.(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsLoading?.(false);
      setErrorMsg("No pudimos confirmar la carga del documento.");
    }, 20000);

    return () => clearTimeout(timeoutRef.current);
  }, [url, isFolder, isYT, setIsLoading]);

  const handleLoad = () => {
    clearTimeout(timeoutRef.current);
    setIsLoading?.(false);
    requestAnimationFrame(() => setFade(true));
  };

  const handleError = () => {
    clearTimeout(timeoutRef.current);
    setIsLoading?.(false);
    setErrorMsg("No se pudo cargar el recurso embebido.");
  };

  // --- Carpeta de Drive: botón a nueva ventana ---
  if (!isYT && isFolder) {
    return (
      <div className="w-full h-[60vh] grid place-items-center rounded-lg border bg-white shadow-xl p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">Carpeta de Google Drive</h3>
        <p className="text-gray-600 mb-4">Las carpetas se abren mejor en una pestaña aparte.</p>
        <button
          onClick={() => openPopup(url)}
          className="px-4 py-2 rounded-xl bg-black text-white hover:opacity-90 transition"
        >
          Abrir carpeta
        </button>
        {blockedPopup && (
          <p className="text-sm text-red-600 mt-3" aria-live="polite">
            Tu navegador bloqueó la ventana emergente. Habilita pop-ups e inténtalo de nuevo.
          </p>
        )}
      </div>
    );
  }

  // --- YouTube: NO iframe; solo fallback si bloqueó el pop-up ---
  if (isYT) {
    return (
      <div className="w-full h-[50vh] grid place-items-center rounded-lg border bg-white shadow p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">
          El video se abrirá en una nueva ventana de YouTube (con anuncios).
        </p>
        <button
          onClick={() => openPopup(finalYTUrl)}
          className="px-5 py-2 rounded-xl bg-purple-600 text-white hover:opacity-90 transition"
        >
          Abrir video
        </button>
        {blockedPopup && (
          <p className="text-sm text-red-600 mt-3" aria-live="polite">
            El pop-up fue bloqueado. Habilita pop-ups o usa el botón nuevamente.
          </p>
        )}
      </div>
    );
  }

  // --- NO YouTube: iframe como siempre ---
  return (
    <div className="relative w-full h-[80vh] overflow-hidden rounded-lg bg-white shadow-xl border">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
          <span className="text-white text-sm">Cargando documento…</span>
        </div>
      )}

      {errorMsg && !isLoading && (
        <div className="absolute inset-x-0 top-0 z-20 m-3 rounded-md bg-red-50 border p-3 text-sm text-red-700">
          {errorMsg}
        </div>
      )}

      <iframe
        key={src}
        src={src}
        title={title}
        className={`w-full h-full transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}
        style={{ border: "none", borderRadius: 8 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        onLoad={handleLoad}
        onError={handleError}
      />

      {blockedPopup && (
        <div className="absolute bottom-3 left-3 text-xs text-red-600 bg-white px-2 py-1 rounded">
          El pop-up fue bloqueado. Habilita pop-ups para este sitio.
        </div>
      )}
    </div>
  );
};

export default EmbedFrame2;
