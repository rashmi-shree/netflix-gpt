import React from 'react'
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {removeUser} from "../utils/userSlice";
import { NETFLIX_LOGO, USER_LOGO } from '../utils/constants';
import {toggleGptSearchView} from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from '../utils/constants';
import {changeLanguage} from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user)
  const showGptSearch = useSelector((store)=> store.gpt.showGptSearch);
  const handleSignOut = () => {
    dispatch(removeUser());
    navigate("/");
  }
  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  }
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value))
  }
  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-br from-black z-10 flex justify-between flex-col md:flex-row'>
      <img 
        className='w-44 mx-auto md:mx-0'
        src={NETFLIX_LOGO}
        alt='logo'
      />
      {
        user && (
          <div className='flex my-9'>
            { showGptSearch && ( <select 
              className='bg-gray-700 text-white p-2 mr-4'
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang)=> 
              <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
              )}
            </select>)}
            <button 
              className='bg-purple-800 rounded-lg text-white px-2 py-2 hover:bg-opacity-80'
              onClick={handleGptSearchClick}
            >
               {showGptSearch ? "Home Page" : "GPT Search"}
            </button>
            <p 
              className='text-white font-bold m-2'
            >{user?.name}</p>
            <img 
              src={USER_LOGO}
              alt='user icon'
            />
            <button 
              onClick={handleSignOut}
              className='text-white font-bold m-2 cursor-pointer'>
              Sign out
            </button>
          </div>
        )
      }
      
    </div>
  )
}

export default Header