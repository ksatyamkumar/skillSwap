import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { User } from "./auth.types";
import { initializeAuth } from "./auth.thunks";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

const authSlice =
createSlice({

name:"auth",

initialState,

reducers:{


loginSuccess:(state, action:
PayloadAction<{
 user:User;
 token:string;
}>)=>{

// state.user =
// action.payload.user;

// state.token =
// action.payload.token;

// state.isAuthenticated =
// true;


// localStorage.setItem(
// "token",
// action.payload.token
// );

state.user = action.payload.user;

state.token = action.payload.token;

state.isAuthenticated = true;


if(action.payload.token){
  localStorage.setItem(
    "token",
    action.payload.token
  );
}


},



logout:(state)=>{

state.user=null;

state.token=null;

state.isAuthenticated=false;


localStorage.removeItem(
"token"
);


},

initializeAuth(
  state,
  action: PayloadAction<{
    user: User | null;
    token: string | null;
  }>
) {
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.isAuthenticated = !!action.payload.token;
  state.isLoading = false;
},

setLoading(
  state,
  action: PayloadAction<boolean>
) {
  state.isLoading = action.payload;
}


},

extraReducers: (builder) => {
  builder

    .addCase(
      initializeAuth.pending,
      (state) => {
        state.isLoading = true;
      }
    )

    .addCase(
      initializeAuth.fulfilled,
      (state, action) => {
        state.user = action.payload.user;

        state.token = action.payload.token;

        state.isAuthenticated =
          !!action.payload.token;

        state.isLoading = false;
      }
    )

    .addCase(
      initializeAuth.rejected,
      (state) => {
        state.user = null;

        state.token = null;

        state.isAuthenticated = false;

        state.isLoading = false;
      }
    );
}


});


export const {
loginSuccess,
logout,
setLoading,


}
=
authSlice.actions;


export default authSlice.reducer;