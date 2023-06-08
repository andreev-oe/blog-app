import { configureStore } from '@reduxjs/toolkit'

import articlesSlice from './articlesSlice'
import authSlice from './authSlice'

const store = configureStore({
  reducer: {
    articles: articlesSlice,
    user: authSlice,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
