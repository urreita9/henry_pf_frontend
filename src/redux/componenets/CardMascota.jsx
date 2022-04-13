import React from "react";
//import styles from "../Styles/SingleCard.module.css"


export default function CardMascota({image,name,size,anos,raza}){


    

    return (
        <div >
            <div>
                <h3 >{name}</h3>
                <img src={image} width = "350px" height="250px" alt="la imagen no se encuentra "/>
                <div>Años: {anos}</div>
                <div>Tamaño: {size} </div>
                <div>Raza: {base?base:"no hay"} </div>
            </div>
        </div>
    )
}