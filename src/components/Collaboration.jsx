import { brainwaveSymbol, check } from "../assets2";
import { collabContent } from "../constants";
import Button from "./Button";

const Collaboration = () => {
  return (
    <div className="relative mx-auto max-w-5xl mt-10">
      {/* Outer Gradient Border */}
      <div
        className="rounded-xl p-1"
        style={{
          backgroundImage:
            "linear-gradient(to right bottom, rgb(79, 70, 229) 0%, rgb(165, 56, 164) 50%, rgb(220, 38, 38) 100%)",
        }}
      >
        {/* Inner Content */}
        <div className="rounded-lg bg-black/80 backdrop-blur">
          <div className="flex w-full flex-wrap items-center justify-between gap-8 px-8 py-10 sm:px-16 lg:flex-nowrap">
            {/* Left Content: Header and Description */}
            <div className="lg:max-w-xl">
              <h2 className="block w-full pb-2 bg-gradient-to-b from-white to-gray-400 bg-clip-text font-bold text-transparent text-3xl sm:text-4xl">
              Join Our English Programs
              </h2>
              <p className="my-4 bg-transparent font-medium leading-relaxed tracking-wide text-gray-400">
              Whether you're preparing for exams like TOEFL, CELPIP, or Cambridge, or simply looking to improve your English skills, we’ve got you covered!              </p>

              <ul className="mt-6 space-y-4">
                {collabContent.map((item) => (
                  <li key={item.id} className="flex items-start space-x-3">
                    <img
                      src={check}
                      alt="check"
                      className="w-6 h-6 flex-shrink-0 text-violet-600"
                    />
                    <span className="text-gray-300">{item.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Content: Call to Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              <button className="bg-violet-600 text-white button-text flex items-center justify-center whitespace-nowrap rounded-md transition-all duration-300 px-8 py-3 text-xs sm:text-sm">
                Get Started
              </button>
              <button className="flex items-center justify-center whitespace-nowrap rounded-md border border-zinc-700 bg-zinc-900 text-center text-white backdrop-blur transition-all hover:bg-zinc-800 px-8 py-3 text-xs sm:text-sm">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaboration;
