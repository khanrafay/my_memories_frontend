import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPosts, createPost as cP, updatePost as uP } from "../api";

const initialState = {
    posts: [],
    isLoading: false,
    getPostLoading: false,
}


export const createPost = createAsyncThunk('posts/addPost',
    async (postData) => {
        const { data } = await cP(postData);
        return data;
    })

export const getPosts = createAsyncThunk('posts/getPosts',
    async () => {
        const response = await fetchPosts();
        return response;
    })

export const updatePost = createAsyncThunk('posts/updatePost',
    async (postData) => {
        try {
            const response = await uP(postData._id, postData);
            return response
        } catch (error) {
            console.log('error', error)
        }

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
        [getPosts.pending]: (state, action) => {
            console.log('get post called 1', state, action)
            state.isLoading = true;
        },
        [getPosts.fulfilled]: (state, action) => {
            console.log('get post called 2', state, action)
            state.isLoading = false;
            state.posts = action.payload.data;
        },
        [getPosts.reject]: (state, action) => {
            console.log('get post called 4', state, action)
            state.isLoading = false;
        },
        [createPost.pending]: (state, action) => {
            console.log('state 1', state, action)
        },
        [createPost.fulfilled]: (state, action) => {
            console.log('state 2', state, action)
            state.posts = action.payload.data
        },
        [createPost.reject]: (state, action) => {
            console.log('state 3', state, action)
        },
        [updatePost.pending]: (state, action) => {
            console.log('state 1', state, action)
        },
        [updatePost.fulfilled]: (state, action) => {
            console.log('state 2', state, action)
            state.getPostLoading = true;
            //const updatedPost = state.posts.map((post) => post._id === action.payload._id ? action.payload : post)
            // console.log('updated post', updatedPost)
            // state.posts = updatedPost
        },
        [updatePost.reject]: (state, action) => {
            console.log('state 3', state, action)
        }
    }
})

export const { fetch, create } = postSlice.actions;
export const selectPosts = (state) => ({
    post: state.post.posts,
    getPostLoading: state.post.getPostLoading
});
export default postSlice.reducer; 