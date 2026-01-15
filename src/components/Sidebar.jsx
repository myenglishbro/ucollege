// Sidebar.js
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import SearchBar from './Sidebar/Sidebar/SearchBar';
import ProgressBar from './Sidebar/Sidebar/ProgressBar';
import AccordionSection from './Sidebar/Sidebar/AccordionSection';
import TimelineItem from './Sidebar/Sidebar/TimelineItem';
import RewardPopup from './Sidebar/Sidebar/RewardPopup';
import UnlockModal from './Sidebar/Sidebar/UnlockModal';
import Hito from '../pages/Hito';
import { calculateProgress } from './Sidebar/utils/sidebarUtils';

const NAVBAR_HEIGHT = 64;
const SIDEBAR_WIDTH = 288;

export default function Sidebar({
  road,
  seleccionarNivel,
  isSidebarVisible,
  toggleSidebar,
  viewedItems,        // Array de ids vistos
  setViewedItems,     // setter del array de ids vistos
  activeIndex,
  setActiveIndex,
}) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLink, setSelectedLink] = useState(null);

  // 🔓 Estados de desbloqueo
  const [unlockedLinks, setUnlockedLinks] = useState([]);       // guarda ids de enlaces desbloqueados
  const [unlockedSections, setUnlockedSections] = useState([]); // guarda ids (o índices) de secciones desbloqueadas

  // Modal de desbloqueo (unificado para sección o enlace)
  const [currentLockTarget, setCurrentLockTarget] = useState(null);
  // currentLockTarget = { type: 'section' | 'link', data: section|enlace, sectionIdx?: number, enlaceId?: string }

  const [codeInputForPopup, setCodeInputForPopup] = useState('');
  const [showRewardPopup, setShowRewardPopup] = useState(false);
  const [reward] = useState('');
  const [rewardDescription] = useState('');

  const handleSelect = (idx) => {
    const section = filteredRoad[idx];
    const sectionId = section?.id ?? idx;
    const isSectionLocked = Boolean(section?.code) && !unlockedSections.includes(sectionId);

    // Si la sección está bloqueada, abrimos el modal y no togglamos
    if (isSectionLocked) {
      setCurrentLockTarget({ type: 'section', data: section, sectionIdx: idx });
      setCodeInputForPopup('');
      return;
    }

    const isSame = activeIndex === idx;
    setActiveIndex(isSame ? null : idx);
    setSelectedIndex(isSame ? null : idx);
    if (!isSame) seleccionarNivel(idx);
  };

  // ✅ Recibe (id, checked) desde TimelineItem
  const handleCheckboxChange = (id, checked) => {
    setViewedItems((prev) => {
      const set = new Set(prev);
      if (checked) set.add(id);
      else set.delete(id);
      return Array.from(set);
    });
  };

  const handleLinkClick = (url) => {
    setSelectedLink({ url });
  };

  const handleUnlockSubmit = (code) => {
    if (!currentLockTarget) return;

    if (currentLockTarget.type === 'link') {
      const enlace = currentLockTarget.data;
      const expected = enlace.codigo;
      if (code === expected) {
        const enlaceId = currentLockTarget.enlaceId;
        setUnlockedLinks((prev) => Array.from(new Set([...prev, enlaceId])));
        setCurrentLockTarget(null);
        setCodeInputForPopup('');
      } else {
        alert('Código incorrecto');
      }
      return;
    }

    if (currentLockTarget.type === 'section') {
      const section = currentLockTarget.data;
      const expected = section.code; // 👈 a nivel sección se usa `code`
      if (code === expected) {
        const sectionId = section.id ?? currentLockTarget.sectionIdx;
        setUnlockedSections((prev) => Array.from(new Set([...prev, sectionId])));
        // Abrimos la sección automáticamente después de desbloquear
        const idx = currentLockTarget.sectionIdx;
        setActiveIndex(idx);
        setSelectedIndex(idx);
        seleccionarNivel(idx);

        setCurrentLockTarget(null);
        setCodeInputForPopup('');
      } else {
        alert('Código incorrecto');
      }
    }
  };

  // Filtro (mantenemos las secciones visibles aunque estén bloqueadas; solo no se abren)
  const filteredRoad = road.filter((section) =>
    section.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.enlaces?.some((e) =>
      (e.titulo ?? '').toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="sidebar-toggle-btn fixed z-30 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-r-lg focus:outline-none transition-colors duration-200 ease-in-out shadow-lg"
        style={{ top: NAVBAR_HEIGHT + 16, left: isSidebarVisible ? SIDEBAR_WIDTH : 0 }}
        aria-label={isSidebarVisible ? 'Cerrar sidebar' : 'Abrir sidebar'}
      >
        {isSidebarVisible ? <FaTimes size={22} /> : <FaBars size={22} />}
      </button>

      <aside
        className={`fixed left-0 w-72 bg-gray-900 text-white shadow-xl z-20 transition-transform duration-300 ease-in-out ${
          isSidebarVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ top: NAVBAR_HEIGHT, height: `calc(100% - ${NAVBAR_HEIGHT}px)` }}
      >
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

        <div className="overflow-y-auto h-[calc(100vh-92px)] px-2 pt-1 pb-20">
          {filteredRoad.map((section, idx) => {
            const sectionId = section?.id ?? idx;
            const isSectionLocked = Boolean(section?.code) && !unlockedSections.includes(sectionId);

            return (
              <AccordionSection
                key={sectionId}
                title={section.title}
                isOpen={activeIndex === idx}
                isSelected={selectedIndex === idx}
                onToggle={() => handleSelect(idx)}
                className={`accordion-header ${isSectionLocked ? 'opacity-90' : ''}`}
                // Si tu AccordionSection acepta extras, puedes pasarle esto:
                // isLocked={isSectionLocked}
                // lockHint="Sección bloqueada"
              >
                <div className="space-y-2">
                  {section.enlaces?.map((enlace, i) => {
                    const enlaceId = enlace.id ?? enlace.titulo ?? String(i);
                    const isViewed = viewedItems.includes(enlaceId);
                    const isLocked = Boolean(enlace.codigo) && !unlockedLinks.includes(enlaceId);

                    // Si la sección está bloqueada, renderiza las filas pero desactiva acciones
                    const onActionClick = (url) => {
                      if (isSectionLocked) {
                        setCurrentLockTarget({ type: 'section', data: section, sectionIdx: idx });
                        setCodeInputForPopup('');
                        return;
                      }
                      handleLinkClick(url);
                    };

                    const onRequestUnlock = () => {
                      if (isSectionLocked) {
                        // Prioriza desbloquear la sección antes que el enlace
                        setCurrentLockTarget({ type: 'section', data: section, sectionIdx: idx });
                        setCodeInputForPopup('');
                        return;
                      }
                      // Desbloqueo por enlace
                      setCurrentLockTarget({
                        type: 'link',
                        data: enlace,
                        enlaceId,
                      });
                      setCodeInputForPopup('');
                    };

                    return (
                      <TimelineItem
                        key={enlaceId}
                        enlace={enlace}
                        isViewed={isViewed}
                        onToggleViewed={handleCheckboxChange}
                        onActionClick={onActionClick}
                        isLocked={isLocked || isSectionLocked} // 🔒 si la sección está bloqueada, el enlace también
                        onRequestUnlock={onRequestUnlock}
                        className={`timeline-item ${isSectionLocked ? 'pointer-events-none opacity-60' : ''}`}
                      />
                    );
                  })}
                </div>
              </AccordionSection>
            );
          })}
        </div>
      </aside>

      {selectedLink && (
        <div className="popup-container">
          <Hito selectedLink={selectedLink} />
          <button onClick={() => setSelectedLink(null)} className="close-popup">
            ✖
          </button>
        </div>
      )}

      <RewardPopup
        isOpen={showRewardPopup}
        rewardImg={reward}
        description={rewardDescription}
        onClose={() => setShowRewardPopup(false)}
      />

      <UnlockModal
        isOpen={Boolean(currentLockTarget)}
        enlaceTitle={
          currentLockTarget?.type === 'section'
            ? currentLockTarget?.data?.title
            : currentLockTarget?.data?.titulo
        }
        codeValue={codeInputForPopup}
        onCodeChange={setCodeInputForPopup}
        onSubmit={handleUnlockSubmit}
        onCancel={() => {
          setCurrentLockTarget(null);
          setCodeInputForPopup('');
        }}
      />
    </>
  );
}
