import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../slice/reducer';  
import userProfileSliceReducer from '../module/EditProfileScreen/slice/reducer';  

export type RootState = ReturnType<typeof store.getState>;


export type AppDispatch = typeof store.dispatch;


const store = configureStore({
  reducer: {
    names: usersReducer,  
    profile: userProfileSliceReducer, 
  },
});

export default store;
