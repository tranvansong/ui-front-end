import React from 'react';
import calvinKleinImage from '../../assets/calvinklein.png';
import versaceImage from '../../assets/versace.png';
import gucciImage from '../../assets/gucci.png';
import pradaImage from '../../assets/prada.png';
import zaraImage from '../../assets/zara.png';

const Rectangle = () => {
  return (
    <div className="flex justify-between bg-black px-12 py-3">
      <img
        className="w-36 h-8 object-contain"
        src={versaceImage}
        alt="versace logo"
          />
          <img
        className="w-36 h-8 object-contain"
        src={zaraImage}
        alt="zara logo"
          />
          <img
        className="w-36 h-8 object-contain"
        src={gucciImage}
        alt="gucci logo"
          />
          <img
        className="w-36 h-8 object-contain"
        src={pradaImage}
        alt="prada logo"
          />
          <img
        className="w-36 h-8 object-contain"
        src={calvinKleinImage}
        alt="calvin Klein logo"
          />
    </div>
  );
};

export default Rectangle;
