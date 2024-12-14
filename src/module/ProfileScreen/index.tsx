import React, { useEffect } from 'react';
import './index.css';
import Button from '../../component/button';
import ProfilePosts from '../../component/profileposts';
import NavigationButton from '../../component/backforwardscreen';
import SvgHiArrowSmLeft from '../../assets/SvgHiArrowSmLeft';
import { useNavigate } from 'react-router-dom';
import SvgVector from '../../assets/Vector';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchProfileFromFirestore } from '../EditProfileScreen/slice/reducer';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  
  const profile = useSelector((state: RootState) => state.profile);
  // const { usersPost } = useSelector((state: RootState) => state.names);

  useEffect(() => {
    dispatch(fetchProfileFromFirestore()); 
  }, [dispatch]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleEditProfile = () => {
    navigate('/editprofilescreen');
  };

  const handleCameraAccess = () => {
    navigate('/cameraacess');
  };

  return (
    <div className="profile-screen">
      <div
        className="profile-background"
        style={{
          backgroundImage: profile.backgroundImage
            ? `url(${profile.backgroundImage})`
            : "url('https://i.ibb.co/dr8tZnT/66c9da0774bf0b45b020839469eb9db2.png')", 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <img
          src={profile.profileImage || "https://i.ibb.co/S6VFmLG/Menu.png"} 
          alt="Profile"
          className="profile-picture"
        />
        <NavigationButton
          icon={<SvgHiArrowSmLeft color="#fff" />}
          label=""
          onClick={handleBack}
        />
      </div>

      <div className="profile-button-container">
        <Button labelText="Edit Profile" className="but-profile" onClick={handleEditProfile} />
      </div>

      <div className="profile-details-container">
        <div className="profile-details">
          <h1>{profile.name}</h1>
          <p>{profile.bio}</p>
        </div>
      </div>

      <div className="profile-posts-container">
        <ProfilePosts />
      </div>

      <div className="button-overview-icon-profile" onClick={handleCameraAccess}>
        <SvgVector />
      </div>
    </div>
  );
};

export default ProfileScreen;
