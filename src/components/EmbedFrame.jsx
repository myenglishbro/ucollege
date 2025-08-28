import React, { useEffect, useMemo, useRef, useState } from "react";
import { getEmbedUrl, isGoogleDriveFolder } from "../utils/getEmbedUrl";

/**
 * EmbedFrame — versión robusta
 *
 * Mejoras clave:
 * - Maneja carpetas de Google Drive con apertura controlada por usuario (evita bloqueos de pop‑ups).
 * - Fallback elegante si el navegador bloquea window.open.
 * - Corrige props del <iframe> (allowFullScreen en lugar de allow="fullscreen").
 * - Transición de fade-in estable y loader superpuesto.
 * - onError y timeout de seguridad para marcar carga fallida.
 * - key sobre el iframe para forzar remount al cambiar la URL.
 * - Aviso de que el estilo de scrollbar no aplica dentro del contenido remoto del iframe.
 */

const POPUP_FEATURES =
  "noopener,noreferrer,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes";

const EmbedFrame = ({ url, title = "Documento", isLoading, setIsLoading }) => {
  const isFolder = isGoogleDriveFolder(url);
  const [fade, setFade] = useState(false);
  const [blockedPopup, setBlockedPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const timeoutRef = useRef(null);

  const src = useMemo(() => getEmbedUrl(url), [url]);

  useEffect(() => {
    // Reset UI on URL change
    setFade(false);
    setErrorMsg("");

    if (isFolder) {
      // No intentamos abrir automáticamente para evitar bloqueos; dejamos botón.
      setIsLoading(false);
      setBlockedPopup(false);
      return;
    }

    setIsLoading(true);

    // Timeout de seguridad por si onLoad no dispara (p.ej. bloqueos de tercero)
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      setErrorMsg(
        "No pudimos confirmar la carga del documento. Revisa tu conexión o abre en una nueva pestaña."
      );
    }, 20000); // 20s

    return () => clearTimeout(timeoutRef.current);
  }, [url, isFolder, setIsLoading]);

  const handleOpenPopup = () => {
    const width = 1000;
    const height = 700;
    const left = Math.max((window.innerWidth - width) / 2, 0);
    const top = Math.max((window.innerHeight - height) / 2, 0);

    const win = window.open(
      url,
      "_blank",
      `${POPUP_FEATURES},width=${width},height=${height},top=${top},left=${left}`
    );

    if (!win) {
      setBlockedPopup(true);
    } else {
      // En algunos navegadores hace falta enfocar.
      try {
        win.focus();
      } catch (_) {}
      setBlockedPopup(false);
    }
  };

  const handleLoad = () => {
    clearTimeout(timeoutRef.current);
    setIsLoading(false);
    // Pequeño delay para el fade-in
    requestAnimationFrame(() => setFade(true));
  };

  const handleError = () => {
    clearTimeout(timeoutRef.current);
    setIsLoading(false);
    setErrorMsg("No se pudo cargar el recurso embebido.");
  };

  if (isFolder) {
    return (
      <div className="w-full h-[60vh] grid place-items-center rounded-lg border border-gray-300 bg-white shadow-xl p-6 text-center">
        <div>
          <h3 className="text-lg font-semibold mb-2">Carpeta de Google Drive</h3>
          <p className="text-gray-600 mb-4">
            Por políticas del navegador/Drive, las carpetas se abren mejor en una pestaña aparte.
          </p>
          <button
            onClick={handleOpenPopup}
            className="px-4 py-2 rounded-xl bg-black text-white hover:opacity-90 transition"
          >
            Abrir carpeta en nueva ventana
          </button>
          {blockedPopup && (
            <p className="text-sm text-red-600 mt-3">
              Tu navegador bloqueó la ventana emergente. Habilita pop‑ups para este sitio e inténtalo de nuevo.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[80vh] overflow-hidden rounded-lg bg-white shadow-xl border border-gray-300">
      {/* Loader */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10 transition-opacity duration-300">
          <span className="text-white text-sm">Cargando documento…</span>
        </div>
      )}

      {/* Mensaje de error (si lo hay) */}
      {errorMsg && !isLoading && (
        <div className="absolute inset-x-0 top-0 z-20 m-3 rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          {errorMsg} {" "}
          <button onClick={handleOpenPopup} className="underline">
            Abrir en nueva pestaña
          </button>
        </div>
      )}

      <iframe
        key={src}
        src={src}
        title={title}
        className={`w-full h-full transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
        style={{ border: "none", borderRadius: 8, position: "relative", zIndex: 5 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        onLoad={handleLoad}
        onError={handleError}
      />

      {/* Nota: no es posible estilizar la scrollbar del contenido interno del iframe si es de otro dominio.
          La clase 'custom-scroll' no afectará al documento embebido por política de same-origin. */}
    </div>
  );
};

export default EmbedFrame;
