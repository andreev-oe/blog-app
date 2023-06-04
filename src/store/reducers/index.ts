import { combineReducers } from '@reduxjs/toolkit'

import { articlesReducer } from './articlesReducer'

export const rootReducer = combineReducers({
  articles: articlesReducer,
})
