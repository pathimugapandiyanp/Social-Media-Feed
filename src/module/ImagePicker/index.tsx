import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './index.css';  
// import SvgHiHeart from "../../assets/SvgHiHeart";
// import NavigationButton from "../../component/backforwardscreen";
import SvgHiArrowSmLeft from "../../assets/SvgHiArrowSmLeft";
import SvgCamera from "../../assets/SvgCamera";
import SvgFolder from "../../assets/SvgFolder";

interface CameraAndImageGridProps {}

const CameraAccess: React.FC<CameraAndImageGridProps> = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]); 
  const [stream, setStream] = useState<MediaStream | null>(null); 
  const [imageList, setImageList] = useState<string[]>([]); 
  const [capturedImage, setCapturedImage] = useState<string | null>(null); 
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false); 
  const videoRef = useRef<HTMLVideoElement | null>(null); 
  const canvasRef = useRef<HTMLCanvasElement | null>(null); 
  const fileInputRef = useRef<HTMLInputElement | null>(null); 
  const navigate = useNavigate(); 

  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      setImageList((prevImages) => [...prevImages, ...newImages]);
    }
  };

 
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const video = videoRef.current;

     
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);

      
      const capturedUrl = canvas.toDataURL("image/png");
      setCapturedImage(capturedUrl);

      handleCloseCamera();
    }
  };


  const startCamera = async () => {
    try {
      const userMedia = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(userMedia);
      if (videoRef.current) {
        videoRef.current.srcObject = userMedia;
      }
    } catch (err) {
      console.error("Error accessing the camera:", err);
    }
  };


  const handleOpenCamera = () => {
    setIsCameraOpen(true);
    startCamera();
  };

 
  const handleCloseCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setIsCameraOpen(false); 
  };

  useEffect(() => {
    if (selectedImages.length >= 2) {
     
      handleCloseCamera();
    }
  },[selectedImages]);

  
  const handleImageSelect = (image: string) => {
    setSelectedImages((prevSelected) => {
      if (prevSelected.includes(image)) {
       
        return prevSelected.filter((img) => img !== image);
      } else {
       
        return [...prevSelected, image];
      }
    });
  };
console.log(imageList,"selectedImages") 
  const handleSave = () => {
    const imagesToSave = [...imageList];
    console.log(imagesToSave,"imagesToSave")
    if (capturedImage) {
      imagesToSave.push(capturedImage); 
    }

  
    console.log("Selected and Captured Images:", imagesToSave);
    localStorage.setItem("postImages", JSON.stringify(imagesToSave));
   
     navigate("/createpostscreen"); 
  };

  const handlebackonClick = () => {
    navigate(-1);
  }

  return (
    <div className="imgepicker-container">
    
      <button className="imgepicker-navigation-button" onClick={handlebackonClick}>
        <div className="button-content">
          <div className="icon-container"><SvgHiArrowSmLeft color="#000" /></div>
          <span className={"lable-navication"}>New Post</span>
        </div>
      </button>

     
      <div className="imgepicker-camera-container">
        {isCameraOpen ? 
          <video ref={videoRef} autoPlay playsInline width="100%" height="100%" /> :
          <div className="imagepicker-lable-top">What’s on your mind?</div>
        }
      </div>

      
      {isCameraOpen && (
        <div className="imgepicker-capture-button-icons">
          <SvgCamera />
          <button onClick={captureImage} className="imgepicker-capture-button">
            Capture Image
          </button>
        </div>
      )}

    
      {!isCameraOpen && (
        <div className="imgepicker-capture-button-icons">
          <SvgCamera />
          <button onClick={handleOpenCamera} className="imgepicker-capture-button">
            Open Camera
          </button>
        </div>
      )}

     
      <canvas ref={canvasRef} style={{ display: "none" }} />

      <div className="imgepicker-file-input-container">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="imgepicker-file-input"
          id="file-input"
        />
        <div className="imgepicker-capture-button-icons">
          <SvgFolder />
          <label htmlFor="file-input" className="imgepicker-file-input-label">
            Choose file
          </label>
        </div>
      </div>

      
      <div className="imgepicker-image-grid-container">
        <div className="imgepicker-image-grid">
         
          {capturedImage && (
            <div
              key="captured"
              className="imgepicker-image-item"
              onClick={() => handleImageSelect(capturedImage)}
            >
              <img
                src={capturedImage}
                alt="Captured"
                className={`imgepicker-image ${selectedImages.includes(capturedImage) ? "selected" : ""}`}
              />
            </div>
          )}

         
          {imageList.map((image, index) => (
            <div
              key={index}
              className="imgepicker-image-item"
              onClick={() => handleImageSelect(image)}
            >
              <img
                src={image}
                alt={`image-${index}`}
                className={`imgepicker-image ${selectedImages.includes(image) ? "selected" : ""}`}
              />
            </div>
          ))}
        </div>
      </div>

     
      <div className="imgepicker-save-button-container">
        <button onClick={handleSave} className="imgepicker-save-button">
          Create
        </button>
      </div>
    </div>
  );
};

export default CameraAccess;
