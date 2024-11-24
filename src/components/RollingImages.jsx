import React from "react";

const RollingImages = ({ stylenum, startIndex = 1}) => {
  return (
    <div className={`marquee marquee--${stylenum}`}>
      <img
        className="marquee__item"
        src={`/src/assets/root-page/icons/${startIndex}.svg`}
        width="250"
        height="250"
        alt={`${startIndex + 1}`}
      />
      <img
        className="marquee__item"
        src={`/src/assets/root-page/icons/${startIndex + 1}.svg`}
        width="250"
        height="250"
        alt={`${startIndex + 2}`}
      />
      <img
        className="marquee__item"
        src={`/src/assets/root-page/icons/${startIndex + 2}.svg`}
        width="250"
        height="250"
        alt={`${startIndex + 3}`}
      />
       <img
        className="marquee__item"
        src={`/src/assets/root-page/icons/${startIndex + 3}.svg`}
        width="250"
        height="250"
        alt={`${startIndex + 4}`}
      />
    </div>
  );
};

export default RollingImages;
