import React, { useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import {
  AiFillEye,
  AiFillEyeInvisible
} from 'react-icons/ai'
import { useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { CLEAR_AUTH_MESSAGE } from '../redux/auth/actionTypes'
import { login } from '../redux/auth/action'
import { useRouter } from 'next/router'

const initialState = {
  username: '',
  password: '',
}
function Login() {
  const [ formData, setFormData ] = useState(initialState)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const authState = useSelector(state => state.auth)

  useEffect(() => {
    if(authState.message) {
      toast(authState.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        type: authState.error ? 'error' : 'success'
        });
        dispatch({ type: CLEAR_AUTH_MESSAGE })
        setFormData(initialState)
    }
  }, [authState.message])

  
  useEffect(() => {
    if(authState.isAuth){
      setTimeout(() => {
      router.push('/')
      }, 2000)
    }
  }, [authState.isAuth])


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
     
    for(let key in formData) {
      if(formData[key] === '') {
        toast('Please fill all the fields!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          type: 'error'
          });
        return
      }
    }
    
    dispatch(login(formData))
  }

  return (
    <>
     <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='grid grid-cols-1 lg:grid-cols-2 items-center justify-center h-screen p-4'>

      <form className='border-2  mx-auto py-10 px-8 rounded-lg shadow-md  max-w-[505px]' onSubmit={handleSubmit}>
      <p className='text-3xl mb-8'>Welcome!</p>
      <h1 className='text-3xl font-semibold mb-8'>Sign in to</h1>
        <label >
        <span >User name</span>
      </label>
      <input type='text' className='mb-4 p-2 border-2 border-gray-300 rounded-md h-10 w-full'  placeholder='Enter your username' name='username' value={formData.username} onChange={handleChange}/>
      <label>
        <span >Password</span>
      </label>
      <div className='relative'>

      <input type={showPassword ? 'text':'password'} className='mb-4 p-2 border-2 border-gray-300 rounded-md h-10 w-full'   placeholder='Enter your password' name='password' value={formData.password} onChange={handleChange}/>
      
      {
        showPassword ? <AiFillEye
        onClick={()=>{
          setShowPassword(false)
        }}
        size={'22'} className='absolute top-2 right-3 cursor-pointer'/> : <AiFillEyeInvisible onClick={()=>{
          setShowPassword(true)
        }} size={'22'} className='absolute top-2 right-3 cursor-pointer'/>
      }
      </div>
        <div className='flex justify-between items-center'>
        <div className='flex items-center'>
        <input type='checkbox' className='mr-2'/>
        <span>Remember me</span>
        </div>
        <p className='text-blue-600'>Forgot password?</p>
        </div>
   
      <input type='submit' className='text-lg my-8 p-2 border-2 border-gray-300 rounded-md w-full bg-black text-white hover:bg-white cursor-pointer hover:text-black hover hover:border-2 hover:border-black' value='Login'/>


      <p className='text-center w-full'>Don't have an account? <Link href='/signup' className='text-blue-600'>Signup</Link></p>
      </form>
      <div className='hidden lg:block'>

      <img  src='/register-image.png' alt='register-image' className='w-[110%] -ml-20'/>
      </div>
      </div>
      
    </>
  )
}

export default Login