import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { doc, getDoc, setDoc, DocumentData } from 'firebase/firestore';
import db from '../../../firebase/config';

interface ProfileState {
  name: string | undefined;
  bio: string;
  profileImage: string;
  backgroundImage: string;
}
const profilename = localStorage.getItem('email');
const username = profilename?.split('@')[0];

console.log(username);
const initialState: ProfileState = {
  name:username,
  bio: '',
  profileImage: 'https://i.ibb.co/zZB99S5/image.jpg',
  backgroundImage: 'https://i.ibb.co/zZB99S5/image.jpg',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<ProfileState>) => {
      state.name = action.payload.name;
      state.bio = action.payload.bio;
      state.profileImage = action.payload.profileImage;
      state.backgroundImage = action.payload.backgroundImage;
    },
  },
});

export const { setProfile } = profileSlice.actions;

export const fetchProfileFromFirestore = () => async (dispatch: any) => {
  try {
    const profileRef = doc(db, 'profiles', 'userProfile'); 
    const docSnap = await getDoc(profileRef);

    if (docSnap.exists()) {
      
      const profileData = docSnap.data() as ProfileState; 
      dispatch(setProfile(profileData)); 
    } else {
      console.log('No profile found');
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
};


export const addProfileToFirestore = (profileData: ProfileState) => async (dispatch: any) => {
  try {
    const profileRef = doc(db, 'profiles', 'userProfile');
    await setDoc(profileRef, profileData);
    dispatch(setProfile(profileData)); 
  } catch (error) {
    console.error('Error saving profile:', error);
  }
};

export default profileSlice.reducer;
