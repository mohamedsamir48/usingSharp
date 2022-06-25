import React from "react";
import "./style.css";
interface Props {
    imagePath:string;
}

export const ImagFull: React.FC<Props> = (imagePath) => {

    return (
        <div className="image-container">
            <img alt="something going wrong"  className="image" src={require(`../images/${imagePath}`)}/>
            
        </div>
    )
}
