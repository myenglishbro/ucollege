import React from 'react'

const MyPortal = ({ studentName, totalClasses, classesTaken, classesLeft, imageSrc }) => {
  const progress = (classesTaken / totalClasses) * 100;

  return (
    <div className="student-progress">
      <div className="student-info">
      <img src={imageSrc} alt={`Imagen de ${studentName}`} style={{width: '350px', height: '350px'}}/>
        <h2>{studentName}</h2>
        <p style={{ color: 'green' }}>Clases tomadas: {classesTaken}</p>
      </div>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}>
          <span>{`${classesTaken} / ${totalClasses}`}</span>
        </div>
        <div className="classes-left">
          <span>{`${classesLeft} clases restantes`}</span>
        </div>
      </div>
    </div>
  );
};

export default MyPortal
