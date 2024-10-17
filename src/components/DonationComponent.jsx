import React from 'react';
import styles from '../style';

const DonationComponent = () => {
  return (
    <div className="container relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
      <div className={`${styles.boxWidth} mx-auto`}>
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Support Our Project</h2>
        <p className="text-white mb-6 text-center">
          If you like the resources and want to support us, feel free to make a donation or payment using the QR codes below. Your support helps us keep creating!
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-6">
          {/* First QR code image */}
          <div className="flex flex-col items-center">
            <img
              src="https://i.ibb.co/SynLJ72/yape-1.jpg" 
              alt="Yape"
              className="w-32 h-32 sm:w-40 sm:h-40 object-cover transition-transform duration-300 hover:scale-105"
            />
            <span className="text-white mt-2">Apóyame con Yape</span>
            <span className="text-gray-300 text-sm">Plin Number: 982 668 882</span> {/* Número de Plin */}

          </div>

          {/* Second QR code image */}
          <div className="flex flex-col items-center">
            <img
              src="https://i.ibb.co/MDCRhh8/plin.jpg" 
              alt="Payment QR Code"
              className="w-32 h-32 sm:w-40 sm:h-40 object-cover transition-transform duration-300 hover:scale-105"
            />
            <span className="text-white mt-2">Apóyame con Plin</span>
            <span className="text-gray-300 text-sm">Plin Number: 982 668 882</span> {/* Número de Plin */}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-300">
            Thank you for your support! 😊
          </p>
          <span className="text-gray-300 text-sm">PayPal Email: temis_it@hotmail.com</span> {/* Correo de PayPal */}

        </div>
      </div>
    </div>
  );
};

export default DonationComponent;
