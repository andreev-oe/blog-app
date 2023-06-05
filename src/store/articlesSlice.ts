import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface IAuthor {
  username: string
  bio: string
  image: string
  following: boolean
}
interface IArticle {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: boolean
  author: IAuthor
}
interface IState {
  articles: IArticle[]
  loading: boolean
  error: boolean
}
const baseUrl = 'https://blog.kata.academy/api/'
const defaultState: IState = {
  articles: [],
  loading: false,
  error: false,
}

const getArticles = createAsyncThunk<IArticle[], undefined, { rejectValue: boolean }>(
  'articles/getArticles',
  async function (_, { rejectWithValue }) {
    const response = await fetch(`${baseUrl}articles?limit=${5}&offset=${5}`)
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
        state.articles = action.payload
        state.loading = false
        state.error = false
      })
  },
})

export default articlesSlice.reducer
export { getArticles }
