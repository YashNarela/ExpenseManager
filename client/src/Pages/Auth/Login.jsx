import React, { useContext, useState } from 'react'
import AuthLayout from '../../Components/Layout/AuthLayout'
import { Link, useNavigate } from 'react-router'

import { validateEmail } from "../../utilis/helper"

import Inputs from '../../Components/inputs/Inputs'
import axiosInstance from '../../utilis/axiosInstanse'
import { API_URL } from '../../utilis/apiPath'
import { BASE_URL } from '../../utilis/apiPath'
import { UserContext } from '../../context/userContext'
const Login = () => {



  const [email, setEmail] = useState("")

  const [password, setPassword] = useState("")

  const [err, setErr] = useState("")

  const { updateUser } = useContext(UserContext)




  const navigate = useNavigate()


  const handleLogin = async (e) => {

    e.preventDefault()

    if (!validateEmail(email)) {

      setErr("Pelease Enter Valid Email")
      return
    }

    if (!password) {

      setErr("Please Enter Valid Password")
      return
    }

    setErr("")


    console.log(`${BASE_URL}${API_URL.AUTH.LOGIN}`);


    try {

      const response = await axiosInstance.post(
        `${BASE_URL}${API_URL.AUTH.LOGIN}`, {
        email,
        password
      })

      const { token, user } = response.data

      

      if (token) {

        localStorage.setItem("token", token)

        updateUser(user)

        navigate("/dashboard")


      }



    } catch (error) {

      if (error.response.data.msg) {
        setErr(error.response.data.msg)
      }
      else {

        setErr("Something went wrong")

      }



    }



  }


  return (
    <>
      <AuthLayout>

        <div className='lg:w-[70%] h-3/4  md:h-full  flex flex-col  justify-center ' >


          <h3 className=' text-xl   font-semibold  text-black'  >Welcome Back</h3>

          <p className='  text-xs text-slate-700  mt-[5px] mb-6' >

            please enter details to login

          </p>


          <form onSubmit={handleLogin} >


            <Inputs type="text" value={email} label="Email Adress" placeholder='Yash123@gmail.com' onChange={({ target }) => { setEmail(target.value) }} />
            <Inputs type="password" value={password} label="Password " placeholder='Min 8 Characters' onChange={({ target }) => { setPassword(target.value) }} />


            {
              err && <p className=' text-red-500 text-xs pb-2.5' >{err}</p>
            }



            <button type='submit' className='btn-primary'   >Login</button>


            <p className='text-[13px]  text-slate-800 mt-3' >Don't have an account? {" "}  <Link className=' font-medium text-primary  underline' to="/signup">Signup</Link> </p>

          </form>





        </div>

      </AuthLayout>
    </>
  )
}

export default Login
