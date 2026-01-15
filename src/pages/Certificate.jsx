import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Logo from "../assets2/yourlogo.png"; // Ajusta la ruta de tu logo

const Certificate = () => {
  const [studentName, setStudentName] = useState("");
  const instructorName = "Carlos Apolaya Sanchez"; // Fijo
  const [imageURL, setImageURL] = useState("");
  // Referencia al contenedor que engloba todo el certificado
  const certificateRef = useRef();

  // Función para esperar a que se cargue todo el contenido (imágenes, SVG, etc.)
  const waitForContent = () =>
    new Promise((resolve) => setTimeout(resolve, 1000));

  // Función para generar la imagen y descargarla en formato PNG
  const generateImage = async () => {
    if (certificateRef.current) {
      try {
        // Espera a que el contenido esté completamente cargado
        await waitForContent();
        const canvas = await html2canvas(certificateRef.current, {
          // Eliminamos foreignObjectRendering para evitar problemas con algunos elementos
          scale: 2,
          useCORS: true,
          allowTaint: false,
          backgroundColor: "#ffffff",
        });
        const image = canvas.toDataURL("image/png");
        setImageURL(image);

        // Descargar la imagen
        const link = document.createElement("a");
        link.href = image;
        link.download = `Certificate-${studentName || "unnamed"}.png`;
        link.click();
      } catch (error) {
        console.error("Error generating image:", error);
      }
    }
  };

  // Función para generar el PDF a partir del certificado
  const generatePDF = async () => {
    if (certificateRef.current) {
      try {
        await waitForContent();
        const canvas = await html2canvas(certificateRef.current, {
          scale: 2,
          useCORS: true,
          allowTaint: false,
          backgroundColor: "#ffffff",
        });
        const image = canvas.toDataURL("image/png");
        setImageURL(image);

        // Crear el PDF en formato landscape y agregar la imagen generada
        const pdf = new jsPDF("landscape", "pt", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        pdf.addImage(image, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Certificate-${studentName || "unnamed"}.pdf`);
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    }
  };

  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#2D0D8A] to-[#F34006] py-8 px-4">
      <h1 className="text-4xl font-extrabold text-white mb-8 text-center">
        ¡Comparte tu camino en MyEnglishBro!
      </h1>

      {/* Formulario para ingresar el nombre del estudiante */}
      <div className="bg-white p-6 rounded-xl shadow-2xl text-gray-900 w-full max-w-md mb-12">
        <input
          type="text"
          placeholder="Escribe tu nombre"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="p-3 border rounded w-full"
        />
      </div>

      {/* Contenedor del certificado (incluye ondas decorativas) */}
      <div
        ref={certificateRef}
        className="relative bg-white w-full max-w-5xl rounded-xl shadow-2xl overflow-hidden"
      >
        {/* Onda superior */}
        <div className="absolute top-0 left-0 w-full overflow-hidden" style={{ height: "150px" }}>
          <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0 C150,100 350,-50 500,50 L500,0 L0,0 Z" fill="#F34006"></path>
          </svg>
        </div>

        {/* Onda inferior */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ height: "150px" }}>
          <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,100 C150,150 350,0 500,100 L500,150 L0,150 Z" fill="#F34006"></path>
          </svg>
        </div>

        {/* Contenido del certificado */}
        <div className="relative z-10 p-12 text-gray-700 text-center min-h-[600px] flex flex-col justify-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src={Logo} alt="MyEnglishBro" className="h-16" />
          </div>

          {/* Título */}
          <h2 className="text-5xl font-bold mb-4 text-gray-800">
            Certificate of Completion
          </h2>

          {/* Nombre del estudiante */}
          <p className="text-3xl font-semibold mb-2 text-blue-600">
            {studentName || "Your Name Here"}
          </p>

          {/* Descripción */}
          <p className="text-xl leading-relaxed mx-auto max-w-3xl">
            This certifies that the student named above has successfully completed the{" "}
            <span className="font-semibold text-blue-500">B2 ENGLISH COURSE</span>{" "}
            on MyEnglishBro as part of the{" "}
            <span className="font-semibold text-blue-500">Autonomous Learning Route</span>.
          </p>

          {/* Información adicional: Fecha, Instructor y Duración del Curso */}
          <div className="mt-8">
            <p className="text-lg">Issued on {currentDate}</p>
            <p className="text-lg">Instructor: {instructorName}</p>
            <p className="text-lg">Duración del curso: 190 horas</p>
          </div>
        </div>
      </div>

      {/* Botones para descargar el certificado */}
      <div className="flex flex-col space-y-4 items-center mt-8">
        <button
          onClick={generateImage}
          className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
        >
          Download as Image
        </button>
        <button
          onClick={generatePDF}
          className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
        >
          Download as PDF
        </button>

        {/* Vista previa de la imagen generada */}
        {imageURL && (
          <div className="mt-4">
            <p className="text-white">Certificate Preview:</p>
            <img src={imageURL} alt="Certificate Preview" className="max-w-md border-2" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Certificate;
