import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IUser } from '../../types'
import { defaultUserState, USER } from '../../constants/constants'

import { signInUser, signUpUser, updateUser } from './authActions'

const authSlice = createSlice({
  name: 'user',
  initialState: defaultUserState,
  reducers: {
    logOutUser(state) {
      state.user.username = ''
      state.user.email = ''
      state.user.token = ''
      state.user.bio = ''
      state.user.image = ''
      localStorage.removeItem(USER)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(signUpUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.user.username = action.payload.user.username
        state.user.email = action.payload.user.email
        state.user.token = action.payload.user.token
        state.user.bio = action.payload.user.bio
        state.user.image = action.payload.user.image
        state.serverErrors = {}
        state.loading = false
        state.error = false
        localStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.serverErrors = action.payload?.errors
      })
      .addCase(signInUser.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(signInUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.user.username = action.payload.user.username
        state.user.email = action.payload.user.email
        state.user.token = action.payload.user.token
        state.user.bio = action.payload.user.bio
        state.user.image = action.payload.user.image
        state.serverErrors = {}
        state.loading = false
        state.error = false
        localStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.serverErrors = action.payload?.errors
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.user.username = action.payload.user.username
        state.user.email = action.payload.user.email
        state.user.token = action.payload.user.token
        state.user.bio = action.payload.user.bio
        state.user.image = action.payload.user.image
        state.serverErrors = {}
        state.loading = false
        state.error = false
        localStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.serverErrors = action.payload?.errors
      })
  },
})

export default authSlice.reducer
export { authSlice }
