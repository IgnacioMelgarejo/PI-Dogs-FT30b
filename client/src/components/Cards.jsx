import React from "react";
import "./components.css/Cards.css"

export default function cards({ name, image, temperament, weight, }) {
    return (
        <div className="main-container-card">
            <div className="link-to-details">
                <h3>{name}</h3>
            </div>
            <div className="image-dog-card">
                <img src={image} alt="img not found" width="240px" height="180px" />
            </div>
            
            <div >
               <button className="information-dog-card">DETAILS</button>
            </div>
            
        </div>
    )
}