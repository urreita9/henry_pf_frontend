import Glide from "@glidejs/glide";
import { useImperativeHandle, useEffect, useRef, forwardRef } from "react";

import "@glidejs/glide/dist/css/glide.core.css";

export const Carousel = forwardRef(({ options, children }, ref) => {
  const sliderRef = useRef();

  useImperativeHandle(ref, () => sliderRef.current);

  useEffect(() => {
    const slider = new Glide(sliderRef.current, options);

    slider.mount();

    return () => slider.destroy();
  }, [options]);

  return (
    <div className="glide" ref={sliderRef}>
      <div className="glide__track" data-glide-el="track" style={{borderRadius: '10px'}}>
        <ul className="glide__slides">{children}</ul>
      </div>
    </div>
  );
});

export const Slide = forwardRef(({ children }, ref) => {
  return (
    <li className="glide__slide" ref={ref} style={{borderRadius: '10px'}}>
      {children}
    </li>
  );
});
