import React from 'react'
import {Route, Routes} from 'react-router-dom'
import SignUp from '../module/SignUp'
import HomeFeedScreen from '../module/HomeFeedScreen'
import ProfileScreen from '../module/ProfileScreen'
import EditProfileScreen from '../module/EditProfileScreen'
import CreatePostScreen from '../module/CreatePostScreen'
import ProtectedLayout from './productedRoute'
import CameraAccess from '../module/ImagePicker'
const MainComponent: React.FC = () => {
  return (
    <Routes>
        <Route path="/" element={<SignUp/>}/>


        {/* <Route element={<ProtectedLayout />}> */}
        <Route path="/homefeedscreen" element={<HomeFeedScreen/>}/>
        <Route path="/profilescreen" element={<ProfileScreen/>}/>
        <Route path="/editprofilescreen" element={<EditProfileScreen/>}/>
        <Route path="/createpostscreen" element={<CreatePostScreen/>}/>
        <Route path="/cameraacess" element={<CameraAccess/>}/>
{/* </Route> */}
    </Routes>
  )
}

export default MainComponent
