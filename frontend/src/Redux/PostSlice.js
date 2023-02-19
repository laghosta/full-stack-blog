import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from '../axios'



export const fetchPosts = createAsyncThunk('posts/fetchPosts', async() => {
    const {data} = await axios.get("/posts")
    return data
})
export const fetchTags = createAsyncThunk('posts/fetchTags', async() => {
    const {data} = await axios.get("/tags")
    return data
})
export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async(id, ) => {
    await axios.delete(`/posts/${id}`,)

})


const initialState = {
    posts:{
        items : [],
        status : 'loading'
    },
    tags:{
        items : [],
        status : 'loading'
    },
}

const PostSlice = createSlice({
    name: "posts",
    initialState,
    reducers:{
    },
    extraReducers:{
        [fetchPosts.pending]: (state) => {
            state.posts.status = "loading"
        },
        [fetchPosts.fulfilled]: (state, payload) => {
            state.posts.items = payload
            state.posts.status = "loaded"
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = []
            state.posts.status = "error"
        },
        [fetchTags.pending]: (state ) => {
            state.tags.status = "loading"
        },
        [fetchTags.fulfilled]: (state, payload) => {
            state.tags.items = payload
            state.tags.status = "loaded"
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = []
            state.tags.status = "error"
        },
        [fetchRemovePost.pending]: (state, action) => {
            state.posts.items.payload = state.posts.items.payload.filter((obj) => obj._id !== action.meta.arg)
            state.posts.status = "loading"
        },
        [fetchRemovePost.fulfilled]: (state, action) => {
            state.posts.status = "loaded"
        },


    }
})
export const PostReducer  =  PostSlice.reducer