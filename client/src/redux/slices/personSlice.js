import {createSlice} from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const signup = createAsyncThunk(
    "person/signup", async (info, {rejectWithValue}) => {
        try {
            const res = await axios.post("/register", info)
            return res.data

        } catch (error) {
            return rejectWithValue(error.response.data.msg)
          
        }
    }
)



export const signin = createAsyncThunk(
    "person/signin", async (info, {rejectWithValue}) => {
        try {
            const res = await axios.post("/login", info)
            return res.data

        } catch (error) {
            return rejectWithValue(error.response.data.msg)
            //  console.log(error.response.data.msg)
        }
    }
)

const personSlice = createSlice({
    name : "person",
    initialState: {
        isAuth: Boolean(localStorage.getItem("isAuth")) || false,
        token: localStorage.getItem("token") || null,
        isLoading: false,
        personeList: [],
        errors: null
    },
    reducers: {
       
        logout: (state) => {state.isAuth = false
        state.token = null 
        localStorage.removeItem("isAuth")
        localStorage.removeItem("token")}
    },
    extraReducers: {
        [signup.pending]: (state) => {state.isLoading= true },
        [signup.fulfilled]: (state, action) => {
            state.isLoading= false 
            state.isAuth = true
            state.token = action.payload.token
            state.errors = null
            state.personeList = action.payload.person
            localStorage.setItem("isAuth", state.isAuth)
            localStorage.setItem("token", state.token)
        },
        [signup.rejected]: (state, action) => {
            state.isLoading= false 
            state.isAuth = false
            state.token = null
            state.errors = action.payload
        },
        [signin.pending]: (state) => {state.isLoading= true },
        [signin.fulfilled]: (state, action) => {
            state.isLoading= false 
            state.isAuth = true
            state.token = action.payload.token
            state.errors = null
            state.personeList = action.payload.person
            localStorage.setItem("isAuth", state.isAuth)
            localStorage.setItem("token", state.token)
        },
        [signin.rejected]: (state, action) => {
            state.isLoading= false 
            state.isAuth = false
            state.token = null
            state.errors = action.payload
        },
    }
})

export default personSlice.reducer
export const {logout} = personSlice.actions