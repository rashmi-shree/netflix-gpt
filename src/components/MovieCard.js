import React from 'react'
import { MOVIE_CARD_IMG_URL } from '../utils/constants'
const MovieCard = (props) => {
  
  const {posterPath} = props
  return (
    <div className='pr-4 w-48'>
      <img 
        src={MOVIE_CARD_IMG_URL + posterPath}
        alt='movie card'
      />
    </div>
  )
}

export default MovieCard