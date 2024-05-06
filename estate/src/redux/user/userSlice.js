import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        signInStart: (state) =>{
            state.loading = true;
        },
        signInSuccess: (state, action) =>{
            // this is the data that we get from the server
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure:(state, action) =>{
            state.error = action.payload;
            state.loading = false;
        },
        // add reducer for the update user profile
        updateUserStart:(state) =>{
            state.loading = true;
        },
        updateUserSuccess:(state, action) =>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFailure:(state, action) =>{
            state.error = action.payload;
            state.loading = false;
        }
        
    }
})
export const { signInStart, signInSuccess,signInFailure,updateUserStart, updateUserSuccess,updateUserFailure } = userSlice.actions;
export default userSlice.reducer