import React from 'react'
import {Route,BrowserRouter,Routes} from 'react-router-dom'
import LoginForm from '../screens/Login'
import Register from '../screens/Register'
import Home from '../screens/Home'
import Project from '../screens/Project'


const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/project" element={<Project/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes