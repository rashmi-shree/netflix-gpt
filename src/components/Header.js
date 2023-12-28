import React from 'react'
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {removeUser} from "../utils/userSlice";
import { NETFLIX_LOGO, USER_LOGO } from '../utils/constants';
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user)
  const handleSignOut = () => {
    dispatch(removeUser());
    navigate("/");
  }
  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-br from-black z-10 flex justify-between'>
      <img 
        className='w-44'
        src={NETFLIX_LOGO}
        alt='logo'
      />
      {
        user && (
          <div className='flex my-9'>
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