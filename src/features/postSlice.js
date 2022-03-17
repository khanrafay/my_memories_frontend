import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPosts } from "../api";

const initialState = {
    posts: [],
    isLoading: false
}

export const getPosts = createAsyncThunk('posts/getPosts',
    async () => {
       
        const response = await fetchPosts();
        console.log('async thunk', response)
        return response;
    })

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        fetch(state) {
           return state;
        },
        create(state, action) {
           return state;
        }
    },
    extraReducers: {
        [getPosts.pending] : (state, action) =>  {
            console.log('inside post slice pending', state, action);
            state.isLoading = true;
        },
        [getPosts.fulfilled] : (state, action) =>  {
            console.log('inside post slice fullfilled', state, action);
            state.isLoading = false;
        },
        [getPosts.reject] : (state, action) =>  {
            console.log('inside post slice reject', state, action);
            state.isLoading = false;
        }
    }
})

export const { fetch, create } = postSlice.actions;
export const selectPosts = (state) => state.posts;
export default postSlice.reducer; 