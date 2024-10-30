import { check } from "../assets2";
import { pricing } from "../constants";
import Button from "./Button";

const PricingList = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {pricing.map((item) => (
        <div
          key={item.id}
          className="w-full h-full px-6 bg-n-8 border border-n-6 rounded-[2rem] py-8"
        >
          <h4 className="h4 mb-4">{item.title}</h4>
          <p className="body-2 min-h-[3rem] mb-1 text-n-1/50">{item.description}</p>

          <div className="flex items-center h-[2.5rem] mb-6">
            {item.price && (
              <>
              <div className="flex flex-row gap-4">
              <div className="text-[1.5rem] leading-none font-bold">{item.price2}</div>
          <div className="text-[1.5rem] leading-none font-bold">{item.price}</div>
          <div className="text-[1rem] leading-none font-bold bg-purple-300 p-2 rounded-md">
              {item.price3}
            </div>
                  </div>
                  
              </>
            )}
          </div>
          <p className="body-2 min-h-[3rem] mb-3 text-n-1/50">{item.description2}</p>

          <Button
            className="w-full mb-6"
            href={item.price ? "https://wa.link/6zozfx" : "mailto:contact@jsmastery.pro"}
            white={!!item.price}
          >
            {item.price ? "Get started" : "Contact us"}
          </Button>
          <ul>
            {item.features.map((feature, index) => (
              <li key={index} className="flex items-start py-5 border-t border-n-6">
                <img src={check} width={24} height={24} alt="Check" />
                <p className="body-2 ml-4">{feature}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PricingList;
