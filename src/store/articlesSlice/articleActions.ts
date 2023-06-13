import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  IErrors,
  IState,
  IPostArticle,
  IDeleteArticle,
  IUpdatedArticle,
  IFavoriteArticle,
  IGetArticle,
  IGetArticles,
} from '../../types'
import { ARTICLES_PER_PAGE, baseUrl } from '../../constants/constants'

const getArticles = createAsyncThunk<IState, IGetArticles, { rejectValue: boolean }>(
  'articles/getArticles',
  async function (data, { rejectWithValue }) {
    const { offset, token } = data
    const response = await fetch(`${baseUrl}articles?limit=${ARTICLES_PER_PAGE}&offset=${offset}`, {
      method: 'GET',
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
const getArticle = createAsyncThunk<IState, IGetArticle, { rejectValue: boolean }>(
  'articles/getArticle',
  async function (data, { rejectWithValue }) {
    const {
      token,
      slug: { slug },
    } = data
    const response = await fetch(`${baseUrl}articles/${slug}`, {
      method: 'GET',
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
const updateArticle = createAsyncThunk<IUpdatedArticle, IUpdatedArticle, { rejectValue: IErrors }>(
  'articles/postArticle',
  async function (article, { rejectWithValue }) {
    const { token, slug, updatedArticle } = article
    const response = await fetch(`${baseUrl}articles/${slug}`, {
      method: 'PUT',
      body: JSON.stringify({ article: updatedArticle }),
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
const favoriteArticle = createAsyncThunk<IFavoriteArticle, IFavoriteArticle, { rejectValue: IErrors }>(
  'articles/favoriteArticle',
  async function (data, { rejectWithValue }) {
    const {
      favorited,
      token,
      slug: { slug },
    } = data
    const response = await fetch(`${baseUrl}articles/${slug}/favorite`, {
      method: favorited ? 'DELETE' : 'POST',
      body: JSON.stringify({ slug: slug }),
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
const deleteArticle = createAsyncThunk<IDeleteArticle, IDeleteArticle, { rejectValue: IErrors }>(
  'articles/deleteArticle',
  async function (data, { rejectWithValue }) {
    const {
      token,
      slug: { slug },
    } = data
    const response = await fetch(`${baseUrl}articles/${slug}`, {
      method: 'DELETE',
      body: JSON.stringify({ slug: slug }),
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

export { getArticles, getArticle, postArticle, deleteArticle, updateArticle, favoriteArticle }
