import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import SearchBar from './Sidebar/Sidebar/SearchBar';
import ProgressBar from './Sidebar/Sidebar/ProgressBar';
import AccordionSection from './Sidebar/Sidebar/AccordionSection';
import TimelineItem from './Sidebar/Sidebar/TimelineItem';
import RewardPopup from './Sidebar/Sidebar/RewardPopup';
import UnlockModal from './Sidebar/Sidebar/UnlockModal';
import Hito from '../pages/Hito';
import useLocalStorage from './Sidebar/Hooks/useLocalStorage';
import { normalizeUrl, calculateProgress } from './Sidebar/utils/sidebarUtils';

const NAVBAR_HEIGHT = 64; // Ajusta si tu navbar es más grande/pequeño
const SIDEBAR_WIDTH = 288; // 72*4 (w-72)

export default function Sidebar({ road, seleccionarNivel, isSidebarVisible, toggleSidebar }) {
  // State...
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewedItems, setViewedItems] = useLocalStorage('viewedItems', []);
  const [selectedLink, setSelectedLink] = useState(null);
  const [unlockedLinks, setUnlockedLinks] = useState([]);
  const [currentLockedLink, setCurrentLockedLink] = useState(null);
  const [codeInputForPopup, setCodeInputForPopup] = useState('');
  const [showRewardPopup, setShowRewardPopup] = useState(false);
  const [reward, setReward] = useState('');
  const [rewardDescription, setRewardDescription] = useState('');

  // Handlers (igual que los tuyos)...
  const handleSelect = idx => {
    setSelectedIndex(idx);
    seleccionarNivel(idx);
  };
  const toggleAccordion = idx => setActiveIndex(activeIndex === idx ? null : idx);
  const handleCheckboxChange = titulo => {
    setViewedItems(prev =>
      prev.includes(titulo)
        ? prev.filter(item => item !== titulo)
        : [...prev, titulo]
    );
  };
  const handleLinkClick = url => setSelectedLink({ url });
  const handleUnlockSubmit = code => {
    if (!currentLockedLink) return;
    if (code === currentLockedLink.codigo) {
      setUnlockedLinks(prev => [...prev, currentLockedLink.titulo]);
      setCurrentLockedLink(null);
    } else alert('Código incorrecto');
  };

  const filteredRoad = road.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.enlaces.some(e => e.titulo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      {/* Toggle button morado premium */}
      <button
        onClick={toggleSidebar}
        className="fixed z-30 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-r-lg focus:outline-none transition-colors duration-200 ease-in-out shadow-lg"
        style={{ top: NAVBAR_HEIGHT + 16, left: isSidebarVisible ? SIDEBAR_WIDTH : 0 }}
      >
        {isSidebarVisible ? <FaTimes size={22} /> : <FaBars size={22} />}
      </button>

      {/* Sidebar animado */}
      <aside
        className={`fixed left-0 w-72 bg-gray-900 text-white shadow-xl z-20 transition-transform duration-300 ease-in-out
          ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ top: NAVBAR_HEIGHT, height: `calc(100% - ${NAVBAR_HEIGHT}px)` }}
      >
        {/* Sticky header visual */}
        <div className="sticky top-0 z-30 bg-gray-900/95 border-b border-indigo-600/40">
          <div className="px-4 pt-3">
            <ProgressBar percent={calculateProgress(viewedItems, road)} />
          </div>
          <div className="px-4 pb-3">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              onClear={() => setSearchTerm('')}
            />
          </div>
        </div>
        {/* Scrollable content */}
        <div className="overflow-y-auto h-[calc(100vh-92px)] px-2 pt-1 pb-20">
          {filteredRoad.map((section, idx) => (
            <AccordionSection
              key={idx}
              title={section.title}
              isOpen={activeIndex === idx}
              isSelected={selectedIndex === idx}
              onToggle={() => { handleSelect(idx); toggleAccordion(idx); }}
            >
              <div className="space-y-2">
                {section.enlaces.map((enlace, i) => (
                  <TimelineItem
                    key={i}
                    enlace={enlace}
                    isViewed={viewedItems.includes(enlace.titulo)}
                    onToggleViewed={handleCheckboxChange}
                    onActionClick={url => handleLinkClick(url)}
                    isLocked={Boolean(enlace.codigo) && !unlockedLinks.includes(enlace.titulo)}
                    onRequestUnlock={() => setCurrentLockedLink(enlace)}
                  />
                ))}
              </div>
            </AccordionSection>
          ))}
        </div>
      </aside>

      {/* Popups */}
      {selectedLink && (
        <div className="popup-container">
          <Hito selectedLink={selectedLink} />
          <button onClick={() => setSelectedLink(null)} className="close-popup">✖</button>
        </div>
      )}

      <RewardPopup
        isOpen={showRewardPopup}
        rewardImg={reward}
        description={rewardDescription}
        onClose={() => setShowRewardPopup(false)}
      />

      <UnlockModal
        isOpen={Boolean(currentLockedLink)}
        enlaceTitle={currentLockedLink?.titulo}
        codeValue={codeInputForPopup}
        onCodeChange={setCodeInputForPopup}
        onSubmit={handleUnlockSubmit}
        onCancel={() => { setCurrentLockedLink(null); setCodeInputForPopup(''); }}
      />
    </>
  );
}
