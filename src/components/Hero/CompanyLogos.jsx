import { companyLogos } from "../../constants";

const CompanyLogos = ({ className }) => {
  return (
    <div className={className}>
      <h5 className="body-1 mb-2 text-center text-n-2">
       Aprende de forma personalizada y a tu propio ritmo , aprende ingles para la vida real y compruebalo con un examen internacional
      </h5>
      <ul className="flex">
        {companyLogos.map((logo, index) => (
          <li
            className="flex items-center justify-center flex-1 h-[9.5rem]"
            key={index}
          >
            <img src={logo} width={134} height={48} alt={logo} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyLogos;
