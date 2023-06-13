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
const USER = 'user'
const ARTICLES_PER_PAGE = 5
const DEFAULT_PAGE_OFFSET = 0

export { route, ARTICLES_PER_PAGE, DEFAULT_PAGE_OFFSET, USER }
