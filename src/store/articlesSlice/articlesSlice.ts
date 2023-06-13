import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { defaultArticlesState } from '../../constants/constants'

import { getArticles, getArticle, favoriteArticle } from './articleActions'

const articlesSlice = createSlice({
  name: 'articles',
  initialState: defaultArticlesState,
  reducers: {
    setActivePage(state, action: PayloadAction<number>) {
      state.activePage = action.payload
    },
    setActiveArticleSlug(state, action: PayloadAction<string>) {
      state.activeArticleSlug = action.payload
    },
    setEdit(state, action: PayloadAction<boolean>) {
      state.article.edit = action.payload
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
      .addCase(favoriteArticle.fulfilled, (state, action) => {
        state.articles.forEach((article) => {
          if (article.slug === action.payload.article.slug) {
            article.favorited = action.payload.article.favorited
            article.favoritesCount = action.payload.article.favoritesCount
          }
        })
        state.article = action.payload.article
        state.loading = false
        state.error = false
      })
  },
})

export default articlesSlice.reducer
export { articlesSlice }
