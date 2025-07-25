import React, { useEffect, useState, useRef } from 'react';
import TextBoxOverlay from './TextBoxOverlay';
import Notepad from '../components/Notepad';
import CodeAccessModal from '../components/CodeAccessModal';
import SecurityAlert from '../components/SecurityAlert';
import AccessGrantedBox from '../components/AccessGrantedBox';
import EmbedFrame from '../components/EmbedFrame';
import { printNotes } from '../utils/printNotes';
import Loader from '../components/Loader';
import AccessLockButton from '../components/AccessLockButton';
import ToolboxButton from '../components/ToolboxButton';
import { useSecurityListeners } from '../hooks/useSecurityListeners';
import { useFullscreen } from '../hooks/useFullscreen';

const Hito = ({ selectedLink }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showBlackScreen, setShowBlackScreen] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [enteredCode, setEnteredCode] = useState('');
  const [error, setError] = useState('');
  const [showNotepad, setShowNotepad] = useState(false);
  const [notes, setNotes] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [fontSize, setFontSize] = useState('20');
  const [textMode, setTextMode] = useState(false);
  const [overlayText, setOverlayText] = useState('');
  

  const containerRef = useRef(null);
  const validCode = 'nocode';

  const { isFullscreen, toggleFullscreen } = useFullscreen(containerRef);
  useSecurityListeners(setShowAlert, setShowBlackScreen);

  const handleCodeSubmit = () => {
    if (enteredCode === validCode) {
      setIsCodeValid(true);
      setError('');
    } else {
      setError('Incorrect code. Please try again.');
    }
  };

  useEffect(() => {
    if (selectedLink) {
      setIsLoading(true);
    }
  }, [selectedLink]);

  return (
    <div
      ref={containerRef}
      className={`hito-container mt-1 p-4 bg-white rounded shadow-md w-full ${
        isFullscreen ? 'h-screen' : 'h-[530px]'
      } max-w-3xl mx-auto transition-all ease-in-out duration-300 relative`}
    >
      {/* Tool button */}
      <ToolboxButton
        onToggleNotepad={() => setShowNotepad(!showNotepad)}
        onToggleTextBox={() => setTextMode(!textMode)}
        onToggleFullscreen={toggleFullscreen}
      />

      {showBlackScreen && <div className="fixed inset-0 bg-black z-50"></div>}
      {showAlert && <SecurityAlert onClose={() => setShowAlert(false)} />}

      {selectedLink ? (
        <>
          {isLoading && <Loader />}
          <div className="relative flex bg-[#1c1c24] p-4 rounded-2xl shadow-lg">
            <div
              className={`relative w-full ${
                isFullscreen ? 'h-[920px]' : 'h-[450px]'
              } rounded-3xl overflow-hidden`}
              style={{
                backgroundImage:
                  'linear-gradient(135deg, rgb(0, 74, 173), rgb(0, 31, 63))',
                color: 'rgb(255, 255, 255)',
                boxShadow:
                  '0 4px 20px rgba(0,74,173,0.4), 0 0 40px rgba(0,31,63,0.6)',
                transition: 'all 0.3s ease-in-out',
              }}
            >
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <span className="animate-spin h-12 w-12 mt-1 border-4 border-t-transparent border-purple-500 rounded-full"></span>
                </div>
              )}
              <EmbedFrame
                url={selectedLink.url}
                title={selectedLink.titulo}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </div>

            {showNotepad && (
              <Notepad
                notes={notes}
                setNotes={setNotes}
                fontSize={fontSize}
                setFontSize={setFontSize}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
                printNotes={() => printNotes(notes)}
              />
            )}
          </div>

          {selectedLink.url.includes('drive.google.com') && !isCodeValid && (
            <AccessLockButton onClick={() => setShowModal(true)} />
          )}

          {showModal && (
            <CodeAccessModal
              enteredCode={enteredCode}
              setEnteredCode={setEnteredCode}
              handleCodeSubmit={() => {
                handleCodeSubmit();
                if (enteredCode === validCode) setShowModal(false);
              }}
              setShowModal={setShowModal}
              error={error}
            />
          )}

          {isCodeValid && (
            <AccessGrantedBox
              url={selectedLink.url}
              onClose={() => {
                setIsCodeValid(false);
                setEnteredCode('');
              }}
            />
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">
          Selecciona un enlace para visualizar el contenido.
        </p>
      )}

      <TextBoxOverlay
        active={textMode}
        onClose={() => setTextMode(false)}
        text={overlayText}
        setText={setOverlayText}
      />
    </div>
  );
};

export default Hito;
