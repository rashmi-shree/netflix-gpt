import React, { useState } from 'react'
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm)
  }
  return (
    <div>
        <Header />
      <div className='absolute'>
      <img 
        src='https://assets.nflxext.com/ffe/siteui/vlv3/563192ea-ac0e-4906-a865-ba9899ffafad/6b2842d1-2339-4f08-84f6-148e9fcbe01b/IN-en-20231218-popsignuptwoweeks-perspective_alpha_website_large.jpg'
        alt='background image'
      />
      </div>
      <form className='bg-black absolute w-3/12 p-12 my-40 mx-auto right-0 left-0 bg-opacity-80'>
        <h1 
          className='text-4xl text-white my-4'
          >{isSignInForm ? "Sign In" : "Sign Up" }</h1>
          {
            !isSignInForm && 
            <input 
              className='bg-white p-4 my-4 w-full rounded-lg bg-gray-700'
              type='text'
              placeholder='Full name'
            />
          }
        <input 
          className='bg-white p-4 my-4 w-full rounded-lg bg-gray-700'
          type='text'
          placeholder='Email or phone number'
        />
        <input 
          className='bg-white p-4 my-4 w-full rounded-lg bg-gray-700'
          type='password'
          placeholder='Password'
        />
        <button
        className='bg-red-700 text-white p-2 my-4 w-full rounded-lg cursor-pointer'
        >{isSignInForm ? "Sign In" : "Sign Up" }</button>
        <p
          className='text-white cursor-pointer'
          onClick={toggleSignInForm}
        > {isSignInForm ? "New to Netflix? Sign up now" : "Already a user? Sign In" }</p>
      </form>
    </div>
  )
}

export default Login
