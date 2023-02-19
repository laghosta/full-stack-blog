import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchPosts} from "./PostSlice";
import axios from "../axios";
import {useSelector} from "react-redux";


export const fetchAuth = createAsyncThunk("auth/fetchAuthUser", async(params) =>{
    const {data} = await axios.post('/auth/login', params)
    return data
})
export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async() =>{
    const {data} = await axios.get('/me')
    return data
})
export const fetchRegister = createAsyncThunk("auth/fetchRegister", async(params) =>{
    const {data} = await axios.post('/auth/register', params)
    return data
})
const initialState = {
    data : null,
    status : "loading",
}


const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers : {
        logout : (state)=>{
            state.data = null
        }
    },
    extraReducers:{
        [fetchAuth.pending]: (state) => {
            state.status = "loading"
            state.data = null
        },
        [fetchAuth.fulfilled]: (state, payload) => {
            state.data = payload
            state.status = "loaded"
        },
        [fetchAuth.rejected]: (state) => {
            state.data = null
            state.status = "error"
        },
        [fetchAuthMe.pending]: (state) => {
            state.status = "loading"
            state.data = null
        },
        [fetchAuthMe.fulfilled]: (state, payload) => {
            state.data = payload
            state.status = "loaded"
        },
        [fetchAuthMe.rejected]: (state) => {
            state.data = null
            state.status = "error"
        },
        [fetchRegister.pending]: (state) => {
            state.status = "loading"
            state.data = null
        },
        [fetchRegister.fulfilled]: (state, payload) => {
            state.data = payload
            state.status = "loaded"
        },
        [fetchRegister.rejected]: (state) => {
            state.data = null
            state.status = "error"
        }
    }
})
export const isLogged = state => Boolean(state.AuthReducer.data)
export const {logout} = AuthSlice.actions
export const AuthReducer  =  AuthSlice.reducer