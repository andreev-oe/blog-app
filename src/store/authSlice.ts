import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IUser } from '../types'

const baseUrl = 'https://blog.kata.academy/api/'
const defaultState: IUser = {
  user: {
    username: 'Олег',
    email: '123@qwe.ru',
    password: '123',
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

const authSlice = createSlice({
  name: 'user',
  initialState: defaultState,
  reducers: {},
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
        state.loading = false
        state.error = false
        localStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(signUpUser.rejected, (state) => {
        state.loading = false
        state.error = true
      })
  },
})

export default authSlice.reducer
export { authSlice, signUpUser }
