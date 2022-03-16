import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    posts: []
}

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        fetch(state) {
            state;
        },
        create(state, action) {
            state;
        }
    }
})

export const { fetch, create } = postSlice.actions;
export default postSlice.reducer;