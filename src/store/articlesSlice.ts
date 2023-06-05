import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { IState } from '../types'

const baseUrl = 'https://blog.kata.academy/api/'
const defaultState: IState = {
  articles: [],
  loading: false,
  error: false,
  articlesCount: 0,
}

const getArticles = createAsyncThunk<IState, undefined, { rejectValue: boolean }>(
  'articles/getArticles',
  async function (_, { rejectWithValue }) {
    const response = await fetch(`${baseUrl}articles?limit=${5}&offset=${0}`)
    if (!response.ok) {
      return rejectWithValue(true)
    }
    const data = await response.json()
    return data
  }
)

const articlesSlice = createSlice({
  name: 'articles',
  initialState: defaultState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.articles = action.payload.articles
        state.articlesCount = action.payload.articlesCount
        state.loading = false
        state.error = false
      })
  },
})

export default articlesSlice.reducer
export { getArticles }
