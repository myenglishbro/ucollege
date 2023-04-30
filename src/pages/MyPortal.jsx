import React from 'react';

const MyPortal = ({ studentName, totalClasses, classesTaken, classesLeft, imageSrc ,enlace}) => {
  const progress = (classesTaken / totalClasses) * 100;
  const progressBarStyle = {
    width: `${progress}%`,
    backgroundColor: progress > 0 ? 'green' : 'gray', // Establece el color del fondo de la barra de progreso en verde si se han tomado clases, de lo contrario, gris.
  };

  return (
    <div className="student-progress">
      <div className="student-info">
        <img src={imageSrc} alt={`Imagen de ${studentName}`} style={{ width: '350px', height: '350px' }} />
        <h2>{studentName}</h2>
        <p style={{ color: 'green' }}>Clases tomadas: {classesTaken}</p>
      </div>
      <div className="progress-bar">
        <div className="progress" style={progressBarStyle}>
          <span>{`${classesTaken} / ${totalClasses}`}</span>
        </div>
        <div className="classes-left">
          <span>{`${classesLeft} Horas restantes`}</span>
        </div>
        <div>
        <a href={enlace} target="_blank" rel="noopener noreferrer"> 🎥 Enlace de clases</a>

        </div>
      </div>
    </div>
  );
};

export default MyPortal;
