import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom' 
import Home from './pages/home'
import Signin from './pages/signin'
import Blog from './pages/Blog'


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/home' element={<Home/>} />
      <Route path='/signin' element={<Signin/>} />
      <Route path='/blog/:blogId' element={<Blog/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App