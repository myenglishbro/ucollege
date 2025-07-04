import React from "react";

const Hero = () => {
  return (
    <section
      className="relative pb-16 pt-12 px-4 md:px-10 mt-15"
      style={{
        background: "linear-gradient(120deg,#182034 70%,#25314a 100%)",
        minHeight: "70vh",
      }}
    >
      {/* Glass Card Main */}
      <div
        className="relative flex flex-col md:flex-row justify-center items-center max-w-5xl mx-auto gap-3 md:gap-0 shadow-xl"
        style={{
          backdropFilter: "blur(14px)",
          background: "rgba(36,51,82,0.7)",
          borderRadius: "2.5rem",
          border: "2.5px solid #30406070",
          boxShadow: "0 8px 50px 0 #36a6f735",
        }}
      >
        {/* Text Side */}
        <div className="w-full md:w-[54%] p-6 md:pl-10 md:py-10 flex flex-col items-start">
          <div className="flex gap-2 mb-2">
            <svg width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="17" fill="#46b3f7" opacity="0.18"/><path d="M11 18h14M18 11v14" stroke="#46b3f7" strokeWidth="2.5" strokeLinecap="round" /></svg>
            <span className="uppercase tracking-wider text-[#46b3f7] font-semibold text-xs drop-shadow-glow">Your English Journey</span>
          </div>
          <h1 className="text-[2.2rem] md:text-[2.6rem] font-extrabold leading-tight tracking-tight text-[#eaf3fa] mb-2 drop-shadow-glow">
            <span className="text-[#46b3f7]">Hello!</span> MyEnglishBro
          </h1>
          <p className="text-lg md:text-xl text-[#b5d1fc] mb-8 font-medium" style={{ textShadow: "0 2px 12px #101c2c60" }}>
            Aprender inglés <b className="text-[#fff8de] bg-[#ffe0852a] rounded px-2 py-0.5 shadow">puede ser fácil y divertido</b>.<br />
            Clases 1:1, feedback en vivo y <span className="text-[#46b3f7] font-semibold">progreso real</span>. <br />
            <span className="inline-block mt-2 text-[#b5d1fc] font-bold">Level Up <span className="font-normal text-[#9dfbfa]">/ˈlɛvəl ʌp/</span></span>
          </p>
          <a
  href="https://api.whatsapp.com/send?phone=51926922032&text=Hola%20quiero%20informacion%20sobre%20el%20curso"
  target="_blank"
  rel="noopener noreferrer"
  className="uppercase font-bold text-sm rounded-2xl py-3 px-10 bg-[#25314a]/70 border border-[#b55cff] text-[#eaf3fa] shadow-xl hover:bg-[#b55cff] hover:text-[#222741] hover:shadow-[0_0_18px_#b55cffaa] transition-all"
>
  Start Now
</a>

        </div>
        {/* Image Side with 3D Glow Glass Style */}
        <div className="flex justify-center items-center w-full md:w-[46%] p-4 md:pr-10 md:py-10 -mt-8 md:mt-0">
          <div
            className="relative rounded-3xl p-2"
            style={{
              background: "linear-gradient(120deg,rgba(59,86,151,0.25) 70%,rgba(70,179,247,0.19) 100%)",
              border: "2.5px solid #46b3f7a6",
              boxShadow: "0 6px 60px 0 #46b3f7a0",
              backdropFilter: "blur(8px)",
              maxWidth: "330px",
            }}
          >
            <img
              className="w-full max-w-[310px] rounded-[1.4rem] shadow-2xl"
              src="https://i.ibb.co/YBBvdhz8/Chat-GPT-Image-4-jul-2025-11-23-15.png"
              alt="MyEnglishBro Mascot"
              draggable={false}
            />
            {/* Star icon for a little 3D accent */}
            <div className="absolute bottom-4 right-4">
              <svg width="28" height="28" viewBox="0 0 34 34"><path d="M17 3l4.09 8.26L30 12.27l-6.18 6.02L25.18 29 17 24.27 8.82 29l1.36-10.71L4 12.27l8.91-1.01L17 3z" fill="#f7d144" stroke="#dcc674" strokeWidth="1.5"/></svg>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Hero;
