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
