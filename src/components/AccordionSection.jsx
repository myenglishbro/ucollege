// components/AccordionSection.jsx
import React, { useState } from 'react';
import { FaLock, FaRegFilePowerpoint, FaVideo, FaRegFolderOpen, FaMousePointer, FaRegKeyboard, FaRegFileAlt } from 'react-icons/fa';
import { GiBookCover } from 'react-icons/gi';
import { BiDownload, BiHighlight } from 'react-icons/bi';

export default function AccordionSection({
  section,
  index,
  isActive,
  isSelected,
  isUnlocked,
  unlockedLinks,
  onToggle,
  onSelect,
  onValidateSectionCode,
  onLinkClick,
  onUnlockLink
}) {
  const [codeInput, setCodeInput] = useState('');
  const handleValidate = () => onValidateSectionCode(codeInput);
  const normalizeUrl = url => (url?.startsWith('http://' ) ? url.replace('http://', 'https://') : url);
  const buttons = [
    { prop: 'url', icon: <FaRegFilePowerpoint /> },
    { prop: 'url2', icon: <FaVideo /> },
    { prop: 'url3', icon: <FaRegFolderOpen /> },
    { prop: 'url4', icon: <FaMousePointer /> },
    { prop: 'url5', icon: <FaRegKeyboard /> },
    { prop: 'url6', icon: <GiBookCover /> },
    { prop: 'url7', icon: <BiDownload /> },
    { prop: 'url8', icon: <BiHighlight /> },
    { prop: 'url9', icon: <FaRegFileAlt /> }
  ];

  return (
    <div className="mb-2">
      {/* Header de sección */}
      <button
        onClick={() => { onSelect(); onToggle(); }}
        className={`w-full text-left px-3 py-2 font-semibold rounded transition-colors
          ${isSelected ? 'bg-gray-900' : isActive ? 'bg-gray-700' : 'bg-gray-600'}`}
      >
        {section.title}
      </button>

      {/* Contenido desplegado */}
      {isActive && (
        !isUnlocked && section.code ? (
          <div className="p-3 bg-gray-700 rounded">
            <p className="text-sm text-gray-300 mb-2">Ingresa código del nivel anterior</p>
            <input
              type="text"
              value={codeInput}
              onChange={e => setCodeInput(e.target.value)}
              className="w-full p-2 rounded text-black mb-2"
              placeholder="Código"
            />
            <button onClick={handleValidate} className="w-full py-1 bg-blue-500 rounded text-white">Enviar</button>
          </div>
        ) : (
          <div className="p-3 space-y-3">
            {section.enlaces.map((link, i) => {
              const requiresCode = Boolean(link.codigo);
              const unlocked = unlockedLinks.includes(link.titulo);
              if (requiresCode && !unlocked) {
                return (
                  <div key={i} className="flex justify-between items-center bg-gray-700 p-2 rounded">
                    <div>
                      <h4 className="font-medium">{i + 1}. {link.titulo}</h4>
                      <p className="text-xs italic text-gray-400">{link.descripcion}</p>
                    </div>
                    <button onClick={() => onUnlockLink(link)} className="p-2 bg-indigo-600 rounded text-white"><FaLock/></button>
                  </div>
                );
              }
              return (
                <div key={i} className="bg-gray-700 p-2 rounded">
                  <div className={`mb-1 ${''}`}>
                    <span>{i + 1}. {link.titulo}</span>
                  </div>
                  <div className="flex space-x-2">
                    {buttons.map(({ prop, icon }) => (
                      link[prop] && (
                        <button
                          key={prop}
                          onClick={() => onLinkClick({ ...link, url: normalizeUrl(link[prop]) })}
                          className="p-1 bg-indigo-500 rounded text-white"
                          title={prop}
                        >
                          {icon}
                        </button>
                      )
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )
      )}
    </div>
  );
}