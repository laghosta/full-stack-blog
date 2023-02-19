import {configureStore} from "@reduxjs/toolkit";
import {PostReducer} from './PostSlice'
import {AuthReducer} from "./AuthSlice";

const store = configureStore({
    reducer:{
        PostReducer,
        AuthReducer
    },
})
export default store

