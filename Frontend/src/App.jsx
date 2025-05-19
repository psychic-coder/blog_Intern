import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom' 
import Home from './pages/home'
import Signin from './pages/signin'
import Blog from './pages/Blog'
import Navbar from './components/Navbar'
import CreateBlog from './pages/CreateBlog'


const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/home' element={<Home/>} />
      <Route path='/signin' element={<Signin/>} />
      <Route path='/blog/:blogId' element={<Blog/>} />
      <Route path='/createblog' element={<CreateBlog/>} />
      <Route path='/' element={<Home/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App