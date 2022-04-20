import React from "react";
import style from "./ImageBackgroundLanding.module.css";

export const ImageBackgroundLanding = ({ width, height }) => {
  return (
    <div className={style.imageBackground}>
      <svg width={width} height={height} viewBox="0 0 1440 759" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M0 0H1440V641C1440 641 954 601 1055.5 483C1157 365 830.5 266.5 732 483C633.5 699.5 460 548 354.5 641C249 734 0 759 0 759V0Z" fill="#F29278"/>
      </svg>
    </div>
  );
};
