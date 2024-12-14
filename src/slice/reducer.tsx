import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addDoc, collection, getDocs, DocumentData } from 'firebase/firestore';
import db from '../firebase/config';

interface PostData {
  validImages: string[];
  textarea: string;
  uploadTime: string;
  username: string; 
}


interface PostResponse {
  id: string;
  data: PostData;
}

export const addPostToFirestore = createAsyncThunk<PostResponse, PostData>(
  'createPost',
  async (data) => {
    const addPost = await addDoc(collection(db, 'Post'), data); 
    return { id: addPost.id, data }; 
  }
);


export const fetchData = createAsyncThunk<PostResponse[]>(
  'fetchData',
  async (): Promise<PostResponse[]> => {
    const querySnapshot = await getDocs(collection(db, 'Post'));
    const allData: PostResponse[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data() as PostData,
    }));
    return allData;
  }
);

export const addProfileToFirestore = createAsyncThunk<PostResponse, PostData>(
  'createProfile',
  async (data) => {
    const addProfile = await addDoc(collection(db, 'Post'), data); 
    return { id: addProfile.id, data }; 
  }
);

const initialState = {
  usersPost: [] as PostResponse[], 
};

export const userSliceReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPostToFirestore.fulfilled, (state, action) => {
        state.usersPost.push(action.payload); 
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.usersPost = action.payload; 
      });
  },
});

export default userSliceReducer.reducer;
