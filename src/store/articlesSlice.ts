import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IErrors, IState, IPostArticle } from '../types'

const baseUrl = 'https://blog.kata.academy/api/'
const defaultState: IState = {
  articles: [],
  loading: false,
  error: false,
  articlesCount: 0,
  activePage: 1,
  activeArticleSlug: '',
}
const ARTICLES_PER_PAGE = 5

const getArticles = createAsyncThunk<IState, number, { rejectValue: boolean }>(
  'articles/getArticles',
  async function (offset, { rejectWithValue }) {
    const response = await fetch(`${baseUrl}articles?limit=${ARTICLES_PER_PAGE}&offset=${offset}`)
    if (!response.ok) {
      return rejectWithValue(true)
    }
    return await response.json()
  }
)
const getArticle = createAsyncThunk<IState, string, { rejectValue: boolean }>(
  'articles/getArticle',
  async function (slug, { rejectWithValue }) {
    const response = await fetch(`${baseUrl}articles/${slug}`)
    if (!response.ok) {
      return rejectWithValue(true)
    }
    return await response.json()
  }
)

const postArticle = createAsyncThunk<IPostArticle, IPostArticle, { rejectValue: IErrors }>(
  'articles/postArticle',
  async function (article, { rejectWithValue }) {
    const { token } = article.article
    const response = await fetch(`${baseUrl}articles`, {
      method: 'POST',
      body: JSON.stringify(article),
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
const articlesSlice = createSlice({
  name: 'articles',
  initialState: defaultState,
  reducers: {
    setActivePage(state, action: PayloadAction<number>) {
      state.activePage = action.payload
    },
    setActiveArticleSlug(state, action: PayloadAction<string>) {
      state.activeArticleSlug = action.payload
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
      .addCase(getArticles.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(getArticle.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(getArticle.fulfilled, (state, action) => {
        state.article = action.payload.article
        state.loading = false
        state.error = false
      })
      .addCase(getArticle.rejected, (state) => {
        state.loading = false
        state.error = true
      })
  },
})

export default articlesSlice.reducer
export { articlesSlice, getArticles, getArticle, postArticle }
