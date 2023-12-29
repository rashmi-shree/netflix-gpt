import React from 'react'
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BACKGROUND_IMG } from '../utils/constants';

const GptSearch = () => {
  return (
    <div>
        <div className='fixed -z-10'>
            <img 
                src={BACKGROUND_IMG}
                alt='background image'
            />
        </div>
        <GptSearchBar />
        <GptMovieSuggestions />
    </div>
  )
}

export default GptSearch