import { useState } from 'react'
import './App.css'

import { BrowserRouter, Routes, Route } from "react-router";
import Layout from './Layout';
import Home from "./Pages/Dashboard/Home";
import Insert from './Pages/Insert';
import Display from './Pages/Display';
import Login from './Pages/Auth/Login';

import Slice from './Pages/Slice';
import Signup from './Pages/Auth/Signup';
import Income from './Pages/Dashboard/Income';
import Expense from './Pages/Dashboard/Expense';

import UserProvider from './context/userContext';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <UserProvider>

      <BrowserRouter>


        <Routes>

          <Route path='/' element={<Layout />}>

            <Route index element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path='insert' element={<Insert />} />
            <Route path='display' element={<Display />} />
            <Route path='login' element={<Login />} />
           

            <Route path='signup' element={<Signup/>} />

          
            <Route path='income' element={<Income/>} />
            <Route path='expense' element={<Expense/>} />
         
            <Route path='/slice' element={<Slice />} />


          </Route>

            <Route path='dashboard' element={<Home />} />
        </Routes>
      </BrowserRouter>

        </UserProvider>
    </>
  )
}

export default App
