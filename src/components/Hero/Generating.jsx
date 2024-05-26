import { loading } from "../../assets2";

const Generating = ({ className }) => {
  return (
    <div
      className={`flex items-center h-[3.5rem] px-6 bg-n-8/80 rounded-[1.7rem] ${
        className || ""
      } text-base`}
    >
      <img className="w-5 h-5 mr-4" src={loading} alt="Loading" />
      ACertificater tu ingles este2024  y aprender a ahabalro
    </div>
  );
};

export default Generating;
