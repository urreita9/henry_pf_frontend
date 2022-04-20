import React from "react";
import style from './ImagePersonWithPet.module.css'
import imagePerritoPersona from '../../../utils/perritopersona.png'

export const ImagePersonWithPet = ({ width, height }) => {
  return (
    <div className={style.imageContainer}>
        <img src={imagePerritoPersona} alt="Imagen de una persona acariciando su perrito" width={width} height={height}/>
    </div>
  );
};