import React, { useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import {login , logout} from './store/authSlice'
import { Outlet } from 'react-router-dom'
import {Header, Footer} from './components/index'
const App = () => {
  const [loading, setloading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    authService.getCurrentuser()
    .then((userData)=>{
      if(userData){
        // console.log("hii")
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=>setloading(false))
  }, [])
  
  return !loading ? 
  <div className='min-h-screen bg-gray-600 content-between flex flex-wrap'>
    <div className='w-full block'>
      <Header/>
      <main>
        Todo <Outlet/>
      </main>
      <Footer/>
    </div>
  </div> : null
}

export default App