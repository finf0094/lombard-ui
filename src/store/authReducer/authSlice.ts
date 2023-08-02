import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface authState {
  username: string 
  token: string
}

const initialState: authState = {
  username: "",
  token: ""
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<authState>) => {
      localStorage.setItem("token", JSON.stringify({
        username: action.payload.username,
        token: action.payload.token,
      }));
      state.token = action.payload.token,
        state.username = action.payload.username
    },
    logoutUser: (state) => {
      localStorage.clear()
      state.token = "";
      state.username = ""
    }
  },
})

export const selectAuth = (state: RootState) => state.auth

export const { setUser, logoutUser } = authSlice.actions

export default authSlice.reducer