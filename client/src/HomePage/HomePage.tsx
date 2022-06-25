import React, { useState } from "react";
import  images from "../imagesData";
import "./style.css";




const HomePage:React.FC = () => {
    const [photo, setPhoto] = useState<number>();
    const [width , setWidth] = useState<any>("0");
    const [height , setHeight] = useState<any>("0");
    const [srcValue, setSrcValue] = useState<string>("");
    const resized: HTMLImageElement | null = document.getElementById("resizedImage") as HTMLImageElement;
    
    const choosedImage = (choosedImage:number,event: React.MouseEvent<HTMLButtonElement>) =>{
        setPhoto(choosedImage);
        const img = event.target as HTMLElement;
        if(img.style.transform === "scale(1.5)"){
            img.style.transform = "scale(1)";
            img.style.zIndex = "1";
            setPhoto(undefined);

        }else if(photo === undefined){
            img.style.transform = "scale(1.5)";
            img.style.zIndex = "999";
        }else{
            alert("remove select image");
        }
    };
    const showImage = () =>{
        const view:HTMLElement = document.getElementById("view") as HTMLElement;
        view.style.display = "flex";
    };
    const   hideImage = () =>{
        const view:HTMLElement | null = document.getElementById("view") as HTMLElement;
        view.style.display = "none";
    };
    const handleResize = async () => {
        if(photo !== undefined && width > 200 && height > 200){
            await fetch(`http://localhost:5000/image/${photo}/?width=${width}&height=${height}`)
           .then(response => response.blob())
           .then(imageBlob => {
               // Then create a local URL for that image and print it 
               const imageObjectURL = URL.createObjectURL(imageBlob);
               
                setSrcValue(imageObjectURL);
               showImage();
           }).catch(err => console.log(err)); 
            
        }
        else{
            alert("plese choose photo and write 'width > 200' and 'height > 200' ");
        }
    };
    return (
        <div className="home-wrapper">
            <div className="dimention-wrapper">
                <input className="input-dimention" type="text" placeholder='Width' onChange={(event)=>setWidth(event.target.value)}/>
                <input type="text" className="input-dimention" placeholder="height"  onChange={(event)=>setHeight(event.target.value)}/>

                <button className="sharp-btn" onClick={() =>handleResize()}>change</button>
           
            </div>
            <div className="images-wrapper">
                {images.map((image, index) => (
                    
                    <button key={index} className="image-data" onClick={(e :React.MouseEvent<HTMLButtonElement,MouseEvent> )=> {choosedImage(image.id , e  );}}>
                        <img className='image' src={require(`../Images/${image.img}`)} alt="material to resize" />
                        {image.name}
                    </button>
                ))}
            </div>
            <div className="full-image" id="view" onClick={() => hideImage()} data-show="none">
                {
                     srcValue.length > 0 && <img id="resizedImage" className="image-view" src={`${srcValue}`} alt="view"/>
                    
                }
            </div>
        </div>
    );
};

export default HomePage;