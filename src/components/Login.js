import React, { useState, useRef } from 'react'
import Header from "./Header";
import {checkValidData} from '../utils/Validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../utils/Firebase";
import {useDispatch} from "react-redux";
import {addUser, removeUser} from "../utils/userSlice";
import {useNavigate} from 'react-router-dom';
import {BACKGROUND_IMG} from "../utils/constants";
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [signUpData, setSignUpData] = useState([]);
  const [signInData, setSignInData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onChangeEvent = (event) => {
    setSignUpData({...signUpData, [event.target.name]:event.target.value})
  }
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm)
  }
  // const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if(message) return;

    if(!isSignInForm){
      const signup = async () =>{
        try{
          const data = await fetch('http://localhost:3000/signup',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(signUpData)
          });
          const jsonValue = await data.json();
          const {id, name, email} = jsonValue.Data;
          if(jsonValue.Status == "success" ){
            dispatch(addUser({id: id, name: name, email:email }));
            navigate("/browse")
          }else{
            dispatch(removeUser());
            navigate("/")
          }
          
        }catch(err){
          console.log(err);
        }
      }
      signup();
      
    }else{
      // sign in logic
      const signin = async () =>{
        try{
          const data = await fetch('http://localhost:3000/signin',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(signUpData)
          });
          const jsonValue = await data.json();
          const {id, name, email} = jsonValue.Data;
          if(jsonValue.Status === "success" ){
            dispatch(addUser({id: id, name: name, email:email }));
            navigate("/browse")
          }else{
            dispatch(removeUser());
            navigate("/")
          }
        }catch(err){
          console.log(err);
        }
      }
      signin();
    }
  }
  return (
    <div>
        <Header />
      <div 
        className='absolute'>
      <img
        className='h-screen object-cover w-screen'
        src={BACKGROUND_IMG}
        alt='background image'
      />
      </div>
      <form 
        onSubmit={(e)=>e.preventDefault()}
        className='w-full bg-black absolute md:w-3/12 p-12 my-40 mx-auto right-0 left-0 bg-opacity-80'
      >
        <h1 
          className='text-4xl text-white my-4'
          >{isSignInForm ? "Sign In" : "Sign Up" }</h1>
          {
            !isSignInForm && 
            <input 
              // ref={name}
              className='text-white p-4 my-4 w-full rounded-lg bg-gray-700'
              type='text'
              name='name'
              placeholder='Full name'
              onChange={onChangeEvent}
            />
          }
        <input 
          ref={email}
          className='text-white  p-4 my-4 w-full rounded-lg bg-gray-700'
          type='text'
          name='email'
          placeholder='Email or phone number'
          onChange={onChangeEvent}
        />
        <input 
          ref={password}
          className='text-white  p-4 my-4 w-full rounded-lg bg-gray-700'
          type='password'
          name='password'
          placeholder='Password'
          onChange={onChangeEvent}
        />
        <p className='text-red-600 text-sm bold'>{errorMessage}</p>
        <button
        onClick={handleButtonClick}
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
