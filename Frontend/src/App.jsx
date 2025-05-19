import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom' 
import Home from './pages/home'
import Signin from './pages/signin'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/signin' element={<Signin/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App