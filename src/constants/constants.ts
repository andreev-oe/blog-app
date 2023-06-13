import { IState, IUser } from '../types'

const route = {
  MainPage: '/',
  ArticlesList: 'articles',
  Article: 'articles/:slug',
  SignUp: 'sign-up',
  SignIn: 'sign-in',
  EditProfile: 'profile',
  ArticleForm: 'new-article',
  EditArticle: 'articles/:slug/edit',
}
const defaultArticlesState: IState = {
  articles: [],
  loading: false,
  error: false,
  articlesCount: 0,
  activePage: 1,
  activeArticleSlug: '',
  article: {
    slug: '',
    edit: false,
    title: '',
    description: '',
    body: '',
    tagList: [],
    createdAt: '',
    updatedAt: '',
    favorited: false,
    favoritesCount: 0,
    author: {
      username: '',
      bio: '',
      image: '',
      following: false,
    },
  },
}
const defaultUserState: IUser = {
  user: {
    username: JSON.parse(localStorage.getItem('user') || '""').user?.username,
    email: JSON.parse(localStorage.getItem('user') || '""').user?.email,
    token: JSON.parse(localStorage.getItem('user') || '""').user?.token,
    bio: JSON.parse(localStorage.getItem('user') || '""').user?.bio,
    image: JSON.parse(localStorage.getItem('user') || '""').user?.image,
  },
}
const baseUrl = 'https://blog.kata.academy/api/'

const USER = 'user'
const ARTICLES_PER_PAGE = 5
const DEFAULT_PAGE_OFFSET = 0

export { route, ARTICLES_PER_PAGE, DEFAULT_PAGE_OFFSET, USER, baseUrl, defaultArticlesState, defaultUserState }
