import { Dispatch } from '@reduxjs/toolkit'

// TODO make proper typing of actions
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
interface IArticlesAction {
  type: string
  payload: IArticle[]
}

const baseUrl = 'https://blog.kata.academy/api/'
const getArticles = (dispatch: Dispatch<IArticlesAction>) => {
  return async () => {
    try {
      const response = await fetch(`${baseUrl}articles?limit=${5}&offset=${5}`)
      const data = await response.json()
      dispatch({
        type: 'GET_ARTICLES',
        payload: data,
      })
    } catch (e) {
      dispatch({
        type: 'GET_ARTICLES',
        payload: [],
      })
    }
  }
}

export { getArticles }
