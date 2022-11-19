import Image from "next/image";
import React from "react";

const Carousel = () => {
  return (
    <div>
      <div className="carousel w-full flex justify-center">
        <div id="item1" className="carousel-item">
          <Image
            src="/carousel-1.gif"
            alt="streams"
            width="0"
            height="0"
            className="w-screen h-auto max-h-96 min-h-[35vh] lg:min-h-0 min-w-[850px]"
          />
        </div>
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        <a href="#item1" className="btn btn-xs">
          1
        </a>
      </div>
    </div>
  );
};

export default Carousel;
