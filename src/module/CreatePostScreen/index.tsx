import React, { useState, useEffect } from 'react';
import './index.css';
import Button from '../../component/button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavigationButton from '../../component/backforwardscreen';
import SvgHiArrowSmLeft from '../../assets/SvgHiArrowSmLeft';
import SvgDelete from '../../assets/SvgDelete';
import { addPostToFirestore } from '../../slice/reducer';
import { AppDispatch } from '../../store';
import { fetchProfileFromFirestore } from '../EditProfileScreen/slice/reducer';

const CreatePostScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [images, setImages] = useState<(string | ArrayBuffer | null)[]>([]); 
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [textarea, setTextArea] = useState<string>("");

  useEffect(() => {
    const storedImages = localStorage.getItem('postImages');
    if (storedImages) {
      setImages(JSON.parse(storedImages)); 
    }
  }, []);
  const profile = useSelector((state: any) => state.profile); 
  var username = profile.name
      useEffect(() => {
        dispatch(fetchProfileFromFirestore()); 
      }, [dispatch]);

  const handleSave = () => {
    const validImages = images.filter((image) => image !== null) as string[]; 
    console.log(validImages, "validImages");
    const uploadTime = new Date().toISOString();
   
  
    const data = {
      validImages,
      textarea,
      uploadTime,
      username,
    };
  
    dispatch(addPostToFirestore(data));
  
    
    localStorage.removeItem('postImages');
    
    navigate('/'); 
  };
  

  const handleDeleteImage = () => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(currentImageIndex, 1); 
      return updatedImages;
    });
    setCurrentImageIndex(0);
  };

 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: (string | ArrayBuffer | null)[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result);
          setImages((prevImages) => {
            const updatedImages = [...prevImages, ...newImages];
            localStorage.setItem('postImages', JSON.stringify(updatedImages)); 
            return updatedImages;
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="create-post-container">
      <div className="navigation-container-createpost">
        <NavigationButton
          icon={<SvgHiArrowSmLeft color="#000" />}
          label="New post"
          onClick={handleBack}
          classname="lable-navication"
        />
      </div>

      <div className="upload-section">
        <label htmlFor="file-input" className="upload-label">
          {images.length > 0 ? (
            <div className="image-container">
              <img
                src={images[currentImageIndex] as string} // Only display current image
                alt={`Uploaded ${currentImageIndex}`}
                className="create-post-image"
              />
              <div className="image-overlay">
                <span className="image-count">
                  {currentImageIndex + 1}/{images.length}
                </span>
              </div>
              <div onClick={handleDeleteImage} className="delete-icon">
                <SvgDelete />
              </div>
            </div>
          ) : (
            <div className="upload-placeholder">
              <p>Upload Image or Use Camera</p>
            </div>
          )}
        </label>
      </div>

      <textarea
        placeholder="Write your post..."
        className="create-post-input"
        rows={4}
        onChange={(e) => setTextArea(e.target.value)}
        value={textarea}
      />

      <Button labelText="Create" onClick={handleSave} className="button-creatpost" />
    </div>
  );
};

export default CreatePostScreen;
