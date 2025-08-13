import React from 'react';
import {
  FaCheck, FaFilePdf, FaVideo, FaLock, FaRegFolderOpen,
  FaMousePointer, FaRegFileAlt
} from 'react-icons/fa';
import { GiBookCover } from 'react-icons/gi';
import { BiDownload, BiHighlight } from 'react-icons/bi';
import { normalizeUrl } from '../utils/sidebarUtils';

export default function TimelineItem({
  enlace = {},
  isViewed = false,
  onToggleViewed = () => {},
  onActionClick = () => {},
  isLocked = false,
  onRequestUnlock = () => {}
}) {
  const safeId = enlace.id ?? enlace.titulo ?? String(enlace.url ?? Math.random());

  // Base dark-premium: grises/graphite, sin colorines
  const baseBtnClass =
    'group relative isolate flex flex-col items-center justify-center gap-1 ' +
    'h-14 md:h-16 rounded-lg px-2 ' +
    'bg-gradient-to-br from-zinc-900 to-black text-zinc-100 ' +
    'shadow-inner shadow-black/30 border border-white/5 ' +
    'hover:shadow-lg hover:shadow-black/40 hover:scale-[1.02] ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/10 ' +
    'transition-[transform,box-shadow,opacity] duration-150 ease-out ' +
    'disabled:opacity-60 disabled:cursor-not-allowed';

  // Variantes sutiles (todas grises; solo cambia la “temperatura” del gris)
  const variants = {
    pdf:      'from-zinc-900 to-zinc-950',
    doc:      'from-slate-900 to-slate-950',
    videoA:   'from-neutral-900 to-neutral-950',
    videoB:   'from-gray-900 to-black',
    app:      'from-zinc-900 to-black',
    desafioA: 'from-slate-900 to-black',
    desafioB: 'from-zinc-900 to-neutral-950',
  };

  // Config de botones (icono + etiqueta + estilo + clave de enlace)
  const buttonsConfig = [
    { key: 'url',  icon: isViewed ? <FaCheck /> : <FaFilePdf />, label: 'Read',      variant: variants.pdf   },
    { key: 'url2', icon: <FaRegFileAlt />,                       label: 'Doc',      variant: variants.doc   },
    { key: 'url3', icon: <FaVideo />,                            label: 'Watch Class',  variant: variants.videoA},
    { key: 'url4', icon: <FaVideo />,                            label: 'Extra Video',  variant: variants.videoB},
    { key: 'url5', icon: <FaMousePointer />,                     label: 'App',      variant: variants.app   },
    { key: 'url6', icon: <GiBookCover />,                        label: 'Reto 6',   variant: variants.desafioA},
    { key: 'url7', icon: <BiDownload />,                         label: 'Reto 7',   variant: variants.desafioB},
    { key: 'url8', icon: <BiHighlight />,                        label: 'Reto 8',   variant: variants.desafioA},
    { key: 'url9', icon: <FaRegFolderOpen />,                    label: 'Reto 9',   variant: variants.desafioB},
  ];

  // Overlay de “visto” (check grande y glass)
  const ViewedOverlay = () => (
    <div className="pointer-events-none absolute inset-0 rounded-lg bg-white/0">
      <div className="absolute inset-0 rounded-lg bg-white/2 backdrop-blur-[0.5px]" />
      <FaCheck className="absolute right-1.5 top-1.5 text-zinc-200/70" />
    </div>
  );

  const handleKeyActivate = (e, url) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onActionClick(normalizeUrl(url));
    }
  };

  return (
    <div className={`flex flex-col p-2 rounded-lg bg-zinc-900/90 ring-1 ring-white/5 ${isViewed ? 'opacity-80' : ''}`}>
      {/* Header: checkbox + title */}
      <label htmlFor={`chk-${safeId}`} className="flex items-center gap-2 mb-2 cursor-pointer select-none">
        <input
          id={`chk-${safeId}`}
          type="checkbox"
          checked={!!isViewed}
          onChange={(e) => onToggleViewed(safeId, e.target.checked)}
          className="accent-zinc-600 size-4 cursor-pointer"
          aria-label={isViewed ? 'Marcar como no visto' : 'Marcar como visto'}
        />
        <span className="font-semibold text-zinc-100 leading-tight line-clamp-2">
          {enlace.titulo ?? 'Sin título'}
        </span>
      </label>

      {enlace.descripcion ? (
        <p className="text-xs text-zinc-400/90 mb-2 line-clamp-2">{enlace.descripcion}</p>
      ) : null}

      {/* Acciones */}
      {isLocked ? (
        <button
          type="button"
          onClick={onRequestUnlock}
          className={`${baseBtnClass} from-zinc-900 to-zinc-950 mx-auto px-3 w-full max-w-[220px]`}
          aria-label="Desbloquear contenido"
          title="Desbloquear"
        >
          <FaLock className="opacity-90" />
          <span className="text-[10px] md:text-xs opacity-80">Unlock</span>
        </button>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
          {buttonsConfig.map(({ key, icon, label, variant }) =>
            enlace?.[key] ? (
              <button
                type="button"
                key={key}
                onClick={() => onActionClick(normalizeUrl(enlace[key]))}
                onKeyDown={(e) => handleKeyActivate(e, enlace[key])}
                title={label}
                aria-label={label}
                className={`${baseBtnClass} ${variant}`}
              >
                {/* Icono */}
                <span className="opacity-90 group-hover:opacity-100 transition-opacity text-sm md:text-base">
                  {icon}
                </span>
                {/* Etiqueta: oculta en xs, visible en md+ */}
                <span className="hidden md:block text-[10px] leading-none opacity-70 group-hover:opacity-90">
                  {label}
                </span>

                {/* Overlay de visto */}
                {isViewed ? <ViewedOverlay /> : null}
              </button>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
