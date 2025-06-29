import React from 'react';
import {
  FaCheck,
  FaRegFilePowerpoint,
  FaVideo,
  FaLock,
  FaRegFolderOpen,
  FaMousePointer,
  FaRegKeyboard,
  FaRegFileAlt
} from 'react-icons/fa';
import { GiBookCover } from 'react-icons/gi';
import { BiDownload, BiHighlight } from 'react-icons/bi';
import { normalizeUrl } from '../utils/sidebarUtils';

/**
 * TimelineItem component
 * @param {{
 *   enlace: Object;
 *   isViewed: boolean;
 *   onToggleViewed: (titulo: string) => void;
 *   onActionClick: (url: string) => void;
 *   isLocked: boolean;
 *   onRequestUnlock: () => void;
 * }} props
 */
export default function TimelineItem({ enlace, isViewed, onToggleViewed, onActionClick, isLocked, onRequestUnlock }) {
  const buttonsConfig = [
    { key: 'url',       icon: isViewed ? <FaCheck /> : <FaRegFilePowerpoint />, label: 'View slide' },
    { key: 'url2',      icon: <FaVideo />,      label: 'Watch video' },
    { key: 'url3',      icon: <FaRegFolderOpen />, label: 'Take test' },
    { key: 'url4',      icon: <FaMousePointer />, label: 'Desafío 4' },
    { key: 'url5',      icon: <FaRegKeyboard />, label: 'Desafío 5' },
    { key: 'url6',      icon: <GiBookCover />,   label: 'Desafío 6' },
    { key: 'url7',      icon: <BiDownload />,    label: 'Desafío 7' },
    { key: 'url8',      icon: <BiHighlight />,   label: 'Desafío 8' },
    { key: 'url9',      icon: <FaRegFileAlt />,  label: 'Desafío 9' }
  ];

  return (
    <div className={`flex flex-col p-2 rounded bg-gray-800 ${isViewed ? 'opacity-70' : ''}`}>      
      <label className="flex items-center mb-2">
        <input
          type="checkbox"
          checked={isViewed}
          onChange={() => onToggleViewed(enlace.titulo)}
          className="mr-2"
        />
        <span className="font-semibold">{enlace.titulo}</span>
      </label>
      <p className="text-xs italic text-gray-400 mb-2">{enlace.descripcion}</p>

      {isLocked ? (
        <button
          onClick={onRequestUnlock}
          className="self-center px-3 py-1 bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded"
        >
          <FaLock /> Unlock
        </button>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {buttonsConfig.map(({ key, icon, label }) =>
            enlace[key] ? (
              <button
                key={key}
                onClick={() => onActionClick(normalizeUrl(enlace[key]))}
                title={label}
                className="flex items-center justify-center p-2 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded hover:opacity-90"
              >
                {icon}
              </button>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
