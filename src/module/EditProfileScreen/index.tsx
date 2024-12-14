import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import NavigationButton from '../../component/backforwardscreen';
import SvgHiArrowSmLeft from '../../assets/SvgHiArrowSmLeft';
import { useNavigate } from 'react-router-dom';
import SvgHiPencil from '../../assets/SvgHiPencil';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { addProfileToFirestore, fetchProfileFromFirestore } from './slice/reducer';

const EditProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: any) => state.profile); 

  useEffect(() => {
    dispatch(fetchProfileFromFirestore()); 
  }, [dispatch]);

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  const [name, setName] = useState<string>('');
  const [bio, setBio] = useState<string>('');

  const profileImageInput = useRef<HTMLInputElement | null>(null);
  const backgroundImageInput = useRef<HTMLInputElement | null>(null);

  
  const handleBack = () => {
    navigate(-1);
  };

  
  const handleEditProfileImage = () => {
    if (profileImageInput.current) {
      profileImageInput.current.click();
    }
  };


  const handleEditBackgroundImage = () => {
    if (backgroundImageInput.current) {
      backgroundImageInput.current.click();
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl); 
    }
  };

  const handleBackgroundImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); 
      setBackgroundImage(imageUrl); 
    }
  };

 
  const handleSave = () => {
    const profileData = {
      name,
      bio,
      profileImage: profileImage || '', 
      backgroundImage: backgroundImage || '', 
    };

   
    dispatch(addProfileToFirestore(profileData));

    console.log('Profile Saved:', profileData);
    navigate('/profilescreen')
  };

  useEffect(() => {
    if (profile) {
      setName(profile.name || ''); 
      setBio(profile.bio || ''); 
      setProfileImage(profile.profileImage || ''); 
      setBackgroundImage(profile.backgroundImage || ''); 
    }
  }, [profile]);

  return (
    <div className="profileedit-screen">
      <div
        className="profileedit-background"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : "url('https://i.ibb.co/X7qf1p2/e03f5843a9e45ac45d45afb62caf7b85.png')", // Default background if no image selected
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div>
          <img
            src={profileImage || "https://i.ibb.co/S6VFmLG/Menu.png"}
            alt="Profile"
            className="profileedit-picture"
          />
          <div className="profileedit-background-profile" onClick={handleEditProfileImage}>
            <SvgHiPencil />
          </div>
        </div>
        <div className="navigation-container">
          <NavigationButton
            icon={<SvgHiArrowSmLeft color="#fff" />}
            label="Edit Profile"
            onClick={handleBack}
          />
        </div>
        <div className="edit-profile" onClick={handleEditBackgroundImage}>
          <SvgHiPencil />
        </div>
      </div>

      
      <input
        type="file"
        ref={profileImageInput}
        style={{ display: 'none' }}
        onChange={handleProfileImageChange}
      />
      <input
        type="file"
        ref={backgroundImageInput}
        style={{ display: 'none' }}
        onChange={handleBackgroundImageChange}
      />

      
      <div className="edit-form">
        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Bio</label>
          <input
            type="text"
            className="form-input"
            value={bio}
            onChange={(e) => setBio(e.target.value)} 
          />
        </div>
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditProfileScreen;
