import { useParams } from 'react-router-dom'

const Article = () => {
  const { slug } = useParams()
  return <div>{slug}</div>
}

export default Article
