export interface IAuthor {
  username: string
  bio: string
  image: string
  following: boolean
}
export interface IArticle {
  edit: boolean
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: IAuthor
}
export interface IState {
  articles: IArticle[]
  article: IArticle
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
export interface IUpdatedArticle {
  token?: string
  slug?: string
  updatedArticle: {
    title: string
    description?: string
    body: string
    tagList: string[]
  }
}
export interface IDeleteArticle {
  token: string
  slug: {
    slug: string
  }
}
export interface IFavoriteArticle {
  article: IArticle
  favorited: boolean
  token: string
  slug: {
    slug: string
  }
}
export interface IGetArticle {
  token: string | undefined
  slug: {
    slug: string
  }
}
export interface IGetArticles {
  offset: number
  token: string | undefined
}
