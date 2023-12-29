import React,{useRef} from 'react'
import {useSelector, useDispatch} from "react-redux";
import lang from '../utils/languageConstants';
import {addGptMovieResult} from "../utils/gptSlice";
// import openai from "../utils/openai";
import { API_OPTIONS } from '../utils/constants';
const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang)
  const dispatch = useDispatch();
  const tmdbMovieApi = async(movie) => {
    const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=false&language=en-US&page=1", API_OPTIONS);
    const json = await data.json();
    return json.results;
  }
  const searchText = useRef(null);
  const handleGptSearchClick = async () => {
  //   console.log(searchText.current.value);
  //   const gptQuery = "Act as a movie recommedation system and suggest some movies for the query "+ 
  //   `"${searchText.current.value}" only give me names of 5 movies, comma seperated like the example given ahead.
  //   example: movie1, movie2, movie3 and so on uptill 5`;
  //   const gptResults = await openai.chat.completions.create({
  //     messages: [{ role: 'user', content: gptQuery }],
  //     model: 'gpt-3.5-turbo',
  //   });
  //   console.log(gptResults.choices);
    const gptMovies = ["Andaz Apna Apna", "Hera Pheri", "Chupke Chupke", "Jaane Bhi Do Yaaro", "Padosan"]

    const promiseArray = gptMovies.map((movie)=> tmdbMovieApi(movie));

    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);
    dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}))
  }
  return (
    <div 
      className='pt-[80%] md:pt-[20%] flex justify-center'
    >
      <form 
        className='w-full md:w-1/2 grid grid-cols-12 bg-black'
        onSubmit={(e)=> e.preventDefault()}
      >
      <input 
        ref={searchText}
        type='text'
        className='col-span-9 p-4 m-4'
        placeholder={lang[langKey].gptSearchPlaceholder}
      />
      <button 
        className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg'
        onClick={handleGptSearchClick}
      >
        {
          lang[langKey].search
        }
      </button>
      </form>
    </div>
  )
}

export default GptSearchBar