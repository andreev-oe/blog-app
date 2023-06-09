import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IUser, IUserData } from '../types'

const baseUrl = 'https://blog.kata.academy/api/'
const defaultState: IUser = {
  user: {
    username: JSON.parse(localStorage.getItem('user') || '')?.user.username,
    email: JSON.parse(localStorage.getItem('user') || '')?.user.email,
    token: JSON.parse(localStorage.getItem('user') || '')?.user.token,
    bio: JSON.parse(localStorage.getItem('user') || '')?.user.bio,
    image: JSON.parse(localStorage.getItem('user') || '')?.user.image,
  },
}

const signUpUser = createAsyncThunk<IUser, object, { rejectValue: boolean }>(
  'user/signUpUser',
  async function (user, { rejectWithValue }) {
    const response = await fetch(`${baseUrl}users`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json',
      },
    })
    if (!response.ok) {
      return rejectWithValue(true)
    }
    return await response.json()
  }
)
const signInUser = createAsyncThunk<IUser, object, { rejectValue: boolean }>(
  'user/signInUser',
  async function (user, { rejectWithValue }) {
    const response = await fetch(`${baseUrl}users/login`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json',
      },
    })
    if (!response.ok) {
      return rejectWithValue(true)
    }
    return await response.json()
  }
)
const updateUser = createAsyncThunk<IUser, IUserData, { rejectValue: boolean }>(
  'user/updateUser',
  async function (user, { rejectWithValue }) {
    const { token } = user
    const response = await fetch(`${baseUrl}user`, {
      method: 'PUT',
      body: JSON.stringify({ user }),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      return rejectWithValue(true)
    }
    return await response.json()
  }
)

const authSlice = createSlice({
  name: 'user',
  initialState: defaultState,
  reducers: {
    logOutUser(state) {
      state.user.username = ''
      state.user.email = ''
      state.user.token = ''
      state.user.bio = ''
      state.user.image = ''
      localStorage.removeItem('user')
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
        state.loading = false
        state.error = false
        localStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(signUpUser.rejected, (state) => {
        state.loading = false
        state.error = true
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
        state.loading = false
        state.error = false
        localStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(signInUser.rejected, (state) => {
        state.loading = false
        state.error = true
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
        state.loading = false
        state.error = false
        localStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(updateUser.rejected, (state) => {
        state.loading = false
        state.error = true
      })
  },
})

export default authSlice.reducer
export { authSlice, signUpUser, signInUser, updateUser }
