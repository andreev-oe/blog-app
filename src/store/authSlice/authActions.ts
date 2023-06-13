import { createAsyncThunk } from '@reduxjs/toolkit'

import { IErrors, IUser, IUserData } from '../../types'
import { baseUrl } from '../../constants/constants'

const signUpUser = createAsyncThunk<IUser, object, { rejectValue: IErrors }>(
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
      const errors = await response.json()
      return rejectWithValue(errors)
    }
    return await response.json()
  }
)
const signInUser = createAsyncThunk<IUser, object, { rejectValue: IErrors }>(
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
      const errors = await response.json()
      return rejectWithValue(errors)
    }
    return await response.json()
  }
)
const updateUser = createAsyncThunk<IUser, IUserData, { rejectValue: IErrors }>(
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
      const errors = await response.json()
      return rejectWithValue(errors)
    }
    return await response.json()
  }
)

export { signUpUser, signInUser, updateUser }
