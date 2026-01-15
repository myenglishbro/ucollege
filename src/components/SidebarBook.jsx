// components/SidebarBook.jsx
import React, { useState } from 'react';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import AccordionSection from './AccordionSection';
import RewardPopup from './RewardPopup';
import UnlockLinkModal from './UnlockLinkModal';
import Hito from '../pages/Hito';

export default function SidebarBook({ road, seleccionarNivel }) {
  const NAVBAR_HEIGHT = 64; // altura del navbar
  const SIDEBAR_WIDTH = 288; // ancho del sidebar en px

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedLink, setSelectedLink] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [unlockedItems, setUnlockedItems] = useState([]);
  const [unlockedLinks, setUnlockedLinks] = useState([]);
  const [currentLockedLink, setCurrentLockedLink] = useState(null);
  const [showRewardPopup, setShowRewardPopup] = useState(false);
  const [rewardData, setRewardData] = useState({ image: '', description: '' });

  const toggleSidebar = () => setIsSidebarVisible(v => !v);

  const filteredRoad = road.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.enlaces.some(link => link.titulo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleValidateSectionCode = (idx, section) => {
    if (section.code === section.codeInput) {
      setUnlockedItems(prev => [...prev, section.id]);
      setRewardData({ image: section.recompensa, description: section.recompensaDescripcion || section.description });
      setShowRewardPopup(true);
    } else {
      alert('Código incorrecto');
    }
  };

  return (
    <div className="relative h-full">
       {/* Toggle button aligned to sidebar edge */}
      <button
        onClick={toggleSidebar}
        className="fixed z-30 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-r-lg focus:outline-none transition-colors duration-200 ease-in-out shadow-md"
        style={{ top: NAVBAR_HEIGHT + 16, left: isSidebarVisible ? SIDEBAR_WIDTH : 0 }}
      >
        {isSidebarVisible ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar slide-in/out */}
      <aside
        className={`fixed left-0 w-72 bg-gray-800 text-white shadow-lg z-20 transform transition-transform duration-300 ease-in-out
          ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ top: NAVBAR_HEIGHT, height: `calc(100% - ${NAVBAR_HEIGHT}px)` }}
      >
        <div className="flex flex-col h-full">
          {/* Search header */}
          <div className="flex-none p-4 flex items-center space-x-3">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-2 py-1 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-150"
            />
          </div>
          {/* Content list */}
          <div className="flex-1 overflow-auto px-4 py-2">
            {filteredRoad.map((section, idx) => (
              <AccordionSection
                key={section.id}
                section={section}
                index={idx}
                isActive={activeIndex === idx}
                isSelected={selectedIndex === idx}
                isUnlocked={unlockedItems.includes(section.id)}
                unlockedLinks={unlockedLinks}
                onToggle={() => setActiveIndex(activeIndex === idx ? null : idx)}
                onSelect={() => { setSelectedIndex(idx); seleccionarNivel(idx); }}
                onValidateSectionCode={codeInput => handleValidateSectionCode(idx, { ...section, codeInput })}
                onLinkClick={link => setSelectedLink(link)}
                onUnlockLink={setCurrentLockedLink}
              />
            ))}
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <main
        className="transition-all duration-300 ease-in-out relative p-4 flex items-center justify-center"
        style={{
          marginTop: NAVBAR_HEIGHT,
          marginLeft: isSidebarVisible ? SIDEBAR_WIDTH : 0,
          height: `calc(100% - ${NAVBAR_HEIGHT}px)`
        }}
      >
        {selectedLink ? (
          <Hito selectedLink={selectedLink} />
        ) : (
          <p className="text-gray-500">Selecciona un enlace.</p>
        )}
      </main>

      {/* Modals */}
      {showRewardPopup && <RewardPopup data={rewardData} onClose={() => setShowRewardPopup(false)} />}
      {currentLockedLink && (
        <UnlockLinkModal
          link={currentLockedLink}
          onConfirm={code => {
            if (code === currentLockedLink.codigo) {
              setUnlockedLinks(prev => [...prev, currentLockedLink.titulo]);
              setCurrentLockedLink(null);
            } else alert('Código incorrecto');
          }}
          onClose={() => setCurrentLockedLink(null)}
        />
      )}
    </div>
  );
}

// components/AccordionSection.jsx (unchanged)
// components/RewardPopup.jsx (unchanged)
// components/UnlockLinkModal.jsx (unchanged)
