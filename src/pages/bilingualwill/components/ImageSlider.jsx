import { useState, useRef } from "react";

const images = [
  "https://i.ibb.co/b5DfbPT1/foto1.png",
  "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722163/AbhirajK/Abhirajk%20mykare.webp",
  "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722161/AbhirajK/Abhirajk2.webp",
  "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722161/AbhirajK/Abhirajk3.webp",
  "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722160/AbhirajK/Abhirajk4.webp",
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const scrollToIndex = (index) => {
    setCurrentIndex(index);
    if (sliderRef.current) {
      const scrollWidth = sliderRef.current.clientWidth;
      sliderRef.current.scrollTo({ left: scrollWidth * index, behavior: "smooth" });
    }
  };

  return (
    <div className=" flex items-center justify-center min-h-screen">
      <div className="w-full max-w-4xl mx-auto">
        <div
          ref={sliderRef}
          className="flex overflow-x-scroll space-x-4 rounded-lg shadow-lg no-scrollbar scroll-smooth"
          style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
        >
          {images.map((src, index) => (
            <div key={index} className="flex-shrink-0 w-full md:w-3/4 lg:w-2/3 scroll-ml-6" style={{ scrollSnapAlign: "center" }}>
              <img src={src} alt={`Slide ${index + 1}`} className="w-full h-[500px] object-cover rounded-lg" />
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-4 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? "bg-gray-700" : "bg-gray-300"}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}