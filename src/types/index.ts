export interface IAuthor {
  username: string
  bio: string
  image: string
  following: boolean
}
export interface IArticle {
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
export interface IState {
  articles: IArticle[]
  article?: IArticle
  loading?: boolean
  error?: boolean
  articlesCount: number
  activePage: number
  activeArticleSlug: string
}
export interface IUserData {
  username: string
  email: string
  password?: string
  token: string | undefined
  bio?: string
  image?: string
}
export interface IErrors {
  errors: {
    email?: string
    username?: string
    password?: string
    image?: string
    bio?: string
  }
}
export interface IUser {
  user: IUserData
  loading?: boolean
  error?: boolean
  serverErrors?: {
    email?: string
    username?: string
    password?: string
    image?: string
    bio?: string
  }
}
export interface IPostArticle {
  article: {
    token?: string
    title: string
    description: string
    body: string
    tagList: string[]
  }
}
