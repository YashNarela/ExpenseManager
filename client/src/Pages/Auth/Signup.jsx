import React, { useState, useContext } from 'react'
import AuthLayout from '../../Components/Layout/AuthLayout'
import { Link, useNavigate } from 'react-router'

import { validateEmail } from "../../utilis/helper"

import axiosInstance from '../../utilis/axiosInstanse'
import { API_URL } from '../../utilis/apiPath'
import { BASE_URL } from '../../utilis/apiPath'
import { UserContext } from '../../context/userContext'
import ProfilePhotoSelector from '../../Components/inputs/ProfilePhotoSelector'
import Inputs from '../../Components/inputs/Inputs'

import uploadImage from '../../utilis/uploadImage'
import axios from 'axios'
const Signup = () => {

  const { updateUser } = useContext(UserContext)

  const [profilepic, setProfilepic] = useState("")

  const [fullname, setFullname] = useState("")

  const [email, setEmail] = useState("")

  const [password, setPassword] = useState("")

  const [err, setErr] = useState("")


  const navigate = useNavigate()


  const handleSignUp = async (e) => {

    e.preventDefault()

    let profileImageUrl = ""

    if (!fullname) {

      setErr("please Enter Your  Name ")
      return
    }

    setErr("")

    try {


      if (profilepic) {

        const imgUploadRes = await uploadImage(profilepic)


        console.log(imgUploadRes);



        profileImageUrl = imgUploadRes.imgUrl || "";

      }



      const response = await axios.post(
        `${BASE_URL}${API_URL.AUTH.REGISTER}`, {
        fullname,
        email,
        password,
        profileImageUrl
      })

      console.log(response.data);




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

        <div className='lg:w-[100%]  h-auto md:h-full mt-10  md:mt-0 flex flex-col  justify-center ' >


          <h3 className='text-xl font-semibold  text-black ' >Create an Account</h3>

          <p className=' text-xs text-slate-700 mt-[5px]  mb-6' >

            Join Us Today by Entering Details
          </p>


          <form onSubmit={handleSignUp}  >

            <ProfilePhotoSelector image={profilepic} setImage={setProfilepic} />


            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

              <Inputs value={fullname} onChange={({ target }) => setFullname(target.value)} label="Full Name" placeholder="Yash " type="text" />

              <Inputs type="text" value={email} label="Email Adress" placeholder='Yash123@gmail.com' onChange={({ target }) => { setEmail(target.value) }} />

              <div className='col-span-2' >
                <Inputs type="password" value={password} label="Password " placeholder='Min 8 Characters' onChange={({ target }) => { setPassword(target.value) }} />
              </div>


            </div>
            {
              err && <p className=' text-red-500 text-xs pb-2.5' >{err}</p>
            }



            <button type='submit' className='btn-primary'   >SignUp</button>
            <p className='text-[13px]  text-slate-800 mt-3' >Already  have an account? {" "}  <Link className=' font-medium text-primary  underline' to="/login">Login</Link> </p>

          </form>

        </div>


      </AuthLayout>



    </>
  )
}

export default Signup