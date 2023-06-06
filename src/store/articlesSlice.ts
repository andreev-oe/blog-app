import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IState } from '../types'

const baseUrl = 'https://blog.kata.academy/api/'
const defaultState: IState = {
  articles: [],
  loading: false,
  error: false,
  articlesCount: 0,
  activePage: 1,
}
const ARTICLES_PER_PAGE = 5

const getArticles = createAsyncThunk<IState, number, { rejectValue: boolean }>(
  'articles/getArticles',
  async function (offset, { rejectWithValue }) {
    const response = await fetch(`${baseUrl}articles?limit=${ARTICLES_PER_PAGE}&offset=${offset}`)
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
  reducers: {
    setActivePage(state, action: PayloadAction<number>) {
      state.activePage = action.payload
    },
  },
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
export { articlesSlice, getArticles }
