import React from 'react'
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {removeUser} from "../utils/userSlice";

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
        src='https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png'
        alt='logo'
      />
      {
        user && (
          <div className='flex my-9'>
            <p 
              className='text-white font-bold m-2'
            >{user?.name}</p>
            <img 
              src='https://occ-0-4994-2186.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229'
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