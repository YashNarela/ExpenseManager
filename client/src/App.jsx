import { useState } from 'react'
import './App.css'

import { BrowserRouter, Routes, Route } from "react-router";
import Layout from './Layout';
import Home from './Pages/Home';
import Insert from './Pages/Insert';
import Display from './Pages/Display';
import Login from './Pages/Auth/Login';

import Slice from './Pages/Slice';
import Signup from './Pages/Auth/Signup';
import Income from './Pages/Dashboard/Income';
import Expense from './Pages/Dashboard/Expense';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <BrowserRouter>


        <Routes>

          <Route path='/' element={<Layout />}>

            <Route index element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path='insert' element={<Insert />} />
            <Route path='display' element={<Display />} />
            <Route path='login' element={<Login />} />
           

            <Route path='signup' element={<Signup/>} />

            <Route path='dashboard' element={<Home/>} />
            <Route path='income' element={<Income/>} />
            <Route path='expense' element={<Expense/>} />
         
            <Route path='/slice' element={<Slice />} />


          </Route>
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
