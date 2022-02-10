import { useParams } from 'react-router-dom'

type Props = {}

const Movie = (props: Props) => {
  const params = useParams();
  console.log(params.id);

  return (
    <div>Movie</div>
  )
}

export default Movie