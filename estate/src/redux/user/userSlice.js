import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    isLoading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        signInStart: (state) =>{
            state.isLoading = true;
        },
        signInSuccess: (state, action) =>{
            // this is the data that we get from the server
            state.currentUser = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        signInFailure:(state, action) =>{
            state.error = action.payload;
            state.isLoading = false;
        },
        // add reducer for the update user profile
        updateUserStart:(state) =>{
            state.isLoading = true;
        },
        updateUserSuccess:(state, action) =>{
            state.currentUser = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        updateUserFailure:(state, action) =>{
            state.error = action.payload;
            state.isLoading = false;
        },
        deleteUserStart:(state)=>{
            state.isLoading = true;
        },
        deleteUserSuccess:(state, action) =>{
            state.currentUser = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        deleteUserFailure:(state, action) =>{
            state.error = action.payload;
            state.isLoading = false;
        }
        
    }
})
export const { signInStart, signInSuccess,signInFailure,updateUserStart, updateUserSuccess,updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure } = userSlice.actions;
export default userSlice.reducer