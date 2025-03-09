import React, { useEffect, useRef, useState } from "react";
import "../style2.css";

const images = [
  "https://i.ibb.co/Xk2S1YLk/DALL-E-2025-03-09-09-06-43-A-highly-detailed-medieval-style-shield-in-the-official-colors-of-the-Uni.webp",
  "https://i.ibb.co/xS28VZc8/DALL-E-2025-03-09-09-05-13-A-detailed-medieval-style-shield-in-the-official-University-of-Michigan-c.webp",
  "https://i.ibb.co/wNtFsXt3/DALL-E-2025-03-09-09-08-02-A-highly-detailed-medieval-style-shield-in-the-official-colors-of-TOEFL-b.webp",
  "https://i.ibb.co/JZYg0MB/DALL-E-2025-03-09-09-08-53-A-highly-detailed-medieval-style-shield-in-the-official-colors-of-IELTS-r.webp",
  "https://i.ibb.co/nNLB3m8V/DALL-E-2025-03-09-09-10-48-A-highly-detailed-medieval-style-shield-in-the-official-colors-of-CELPIP.webp"
];

function Slider({ reverse = false }) {
  const sliderRef = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleMouseEnter = () => setPaused(true);
    const handleMouseLeave = () => setPaused(false);

    slider.addEventListener("mouseenter", handleMouseEnter);
    slider.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      slider.removeEventListener("mouseenter", handleMouseEnter);
      slider.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="slider-container">
      <div className={`slider ${reverse ? "reverse" : ""}`} ref={sliderRef}>
        <div className="slider-track" style={{ animationPlayState: paused ? "paused" : "running" }}>
          {images.concat(images).map((img, index) => (
            <div key={index} className="slider-item">
              <img src={img} alt={`Slide ${index}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slider;
