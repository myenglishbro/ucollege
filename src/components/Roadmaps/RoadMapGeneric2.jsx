import React, { useState, useEffect, useRef } from 'react';
import Joyride from 'react-joyride';
import ContainerRoad from '../../pages/ContainerRoad';
import Sidebar2 from '../Sidebar2';
import DefaultView from '../DefaultView';
import Navbar from '../../pages/myenglishbro/components/NavBar';

const RoadMapGeneric2 = ({ roadData, userCredential, userPassword }) => {
  const [nivelSeleccionado, setNivelSeleccionado] = useState(null);
  const [viewedItems, setViewedItems] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [runTour, setRunTour] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [showFallback, setShowFallback] = useState(false);
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(null);
  const [showTourModal, setShowTourModal] = useState(false);

  const containerRefs = useRef([]);

  const steps = [
    {
      target: '.close-modal-btn',
      content: 'Puedes cerrar esta presentación inicial aquí.',
    },
    {
      target: '.btn-whatsapp',
      content: 'Haz clic aquí para contactar por WhatsApp al profe Carlos.',
    },
    {
      target: '.btn-classroom',
      content: 'Aquí puedes ingresar a tu clase en vivo.',
    },
    {
      target: '.sidebar-toggle-btn',
      content: 'Este botón abre y el panel lateral con tus niveles.',
    },
    {
      target: '.accordion-header',
      content: 'Haz clic en un nivel para desplegar los retos disponibles.',
    },
    {
      target: '.timeline-item',
      content: 'Aquí puedes comenzar un reto. ¡Buena suerte!'
    }
  ];

  useEffect(() => {
    const savedViewedItems = JSON.parse(localStorage.getItem("viewedItems")) || [];
    setViewedItems(savedViewedItems);

    const seenTour = localStorage.getItem('seenRoadmapTour');
    if (!seenTour) {
      setIsSidebarVisible(true);
      setShowTourModal(true);
    }

    if (!userCredential || !userCredential.realname || !userCredential.img || !userCredential.nivel || !userCredential.expirationDate) {
      setShowFallback(true);
    }
  }, [userCredential]);

  useEffect(() => {
    if (viewedItems.length > 0) {
      localStorage.setItem("viewedItems", JSON.stringify(viewedItems));
    }
  }, [viewedItems]);

  const seleccionarNivel = (index) => {
    setNivelSeleccionado(index);
    setActiveAccordionIndex(index);
    if (containerRefs.current[index]) {
      containerRefs.current[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);

  const handleJoyrideCallback = ({ action, index, status, type }) => {
    const next = index + 1;

    if (type === 'step:after' || type === 'target:notFound') {
      if (next === 4) {
        seleccionarNivel(0);
        setTimeout(() => setStepIndex(next), 600);
        return;
      }

      if (next === 5) {
        setTimeout(() => setStepIndex(next), 1000);
        return;
      }

      if (next < steps.length) {
        setStepIndex(next);
      } else {
        setRunTour(false);
        setStepIndex(0);
        localStorage.setItem('seenRoadmapTour', 'true');
      }
    }

    if (status === 'skipped' || status === 'finished') {
      setRunTour(false);
      setStepIndex(0);
      localStorage.setItem('seenRoadmapTour', 'true');
    }
  };

  return (
    <>
      <Joyride
        steps={steps}
        run={runTour}
        stepIndex={stepIndex}
        continuous
        scrollToFirstStep
        showSkipButton
        showProgress
        callback={handleJoyrideCallback}
        styles={{
          options: {
            arrowColor: '#7bb3fa',
            backgroundColor: '#23243b',
            textColor: '#ffffff',
            primaryColor: '#7bb3fa',
            zIndex: 10000,
          },
        }}
      />

      <Navbar />

      <Sidebar2
        road={roadData}
        seleccionarNivel={seleccionarNivel}
        isSidebarVisible={isSidebarVisible}
        toggleSidebar={toggleSidebar}
        viewedItems={viewedItems}
        setViewedItems={setViewedItems}
        activeIndex={activeAccordionIndex}
        setActiveIndex={setActiveAccordionIndex}
        className={isSidebarVisible ? 'visible' : ''}
      />

      {nivelSeleccionado !== null ? (
        <ContainerRoad
          road={[roadData[nivelSeleccionado]]}
          containerRefs={containerRefs}
          password={userPassword}
          realname={userCredential.realname}
          nivel={userCredential.nivel}
          expirationDate={userCredential.expirationDate}
          userImage={userCredential.img}
        />
      ) : showFallback ? (
        <DefaultView
          realname="Estudiante"
          nivel="Nivel no disponible"
          expirationDate="Sin fecha"
          userImage="https://placekitten.com/200/200"
          password=""
          isOpen={true}
          onClose={() => {}}
        />
      ) : (
        <DefaultView
          password={userPassword}
          nivel={userCredential.nivel}
          expirationDate={userCredential.expirationDate}
          realname={userCredential.realname}
          userImage={userCredential.img}
          isOpen={true}
          onClose={() => {}}
        />
      )}

      {showTourModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#181a20] border border-[#2a2b3c] rounded-2xl p-6 max-w-md w-full text-center shadow-xl">
            <h2 className="text-lg font-semibold text-white mb-4">¿Deseas un tour guiado?</h2>
            <p className="text-gray-300 mb-6">Te mostraremos dónde hacer clic para comenzar tu experiencia.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setShowTourModal(false);
                  setRunTour(true);
                  setStepIndex(0);
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium"
              >
                Sí, guíame
              </button>
              <button
                onClick={() => {
                  setShowTourModal(false);
                  localStorage.setItem('seenRoadmapTour', 'true');
                }}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium"
              >
                No, gracias
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoadMapGeneric2;
