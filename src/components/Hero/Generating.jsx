import { loading } from "../../assets2";

const Generating = ({ className }) => {
  return (
    <div
      className={`flex items-center h-[3.5rem] px-6 bg-n-8/80 rounded-[1.7rem] ${
        className || ""
      } text-base`}
    >
      <img className="w-20 h-20 mr-4" src={loading} alt="Loading" />
      Certifica tu dominio del inglés en 2024 y aprende a hablarlo con fluidez
    </div>
  );
};

export default Generating;
