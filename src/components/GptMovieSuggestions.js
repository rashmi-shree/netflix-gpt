import React from 'react'
import {useSelector} from 'react-redux';
import MovieList from "../components/MovieList";

const GptMovieSuggestions = () => {
  const {movieNames, movieResults} = useSelector((store)=> store.gpt);
  if(!movieNames) return null;
  return (
    <div className='bg-black text-white bg-opacity-90'>
      {
        movieNames.map((movieName, index)=> 
        <MovieList 
          key={movieName}
          title={movieName} 
          movies={movieResults[index]}
        />)
      }
    </div>
  )
}

export default GptMovieSuggestions