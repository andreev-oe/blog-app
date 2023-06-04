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
interface IArticlesAction {
  type: string
  payload: IArticle[]
}
// TODO make proper typing of reducers
type Action = IArticlesAction | any

const defaultState: IState = {
  articles: [],
  loading: false,
  error: false,
}
const articlesReducer = (state = defaultState, action: Action): IState => {
  switch (action.type) {
    case 'GET_ARTICLES':
      return {
        articles: action.payload,
        loading: false,
        error: false,
      }
    default:
      return state
  }
}

export { articlesReducer }
