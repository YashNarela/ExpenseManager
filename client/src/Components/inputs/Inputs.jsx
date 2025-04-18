import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa";

import { FaRegEyeSlash } from "react-icons/fa";
const Inputs = ({ value, onChange, placeholder, label, type, }) => {

    console.log(value);
    

    const [Showpassword, setShowPassword] = useState(false)


    const showTogglePassword = () => {


        setShowPassword(!Showpassword)


    }


    return (
        <>




            <div className='' >


                <label className="  text-[13px]  text-slate-800  " >{label}</label>


                <div className='input-box'>

                    <input type={type == "password" ? Showpassword ? 'text' : 'password' : type} placeholder={placeholder} className='w-full bg-transparent outline-none' value={value} onChange={(e) => { onChange(e) }} />




                    {

                        type == "password" && (


                            <>

                                {

                                    Showpassword ? (<> <FaRegEye size={22} className='text-primary cursor-pointer ' onClick={() => { showTogglePassword() }} /> </>) : (<> <FaRegEyeSlash size={22} className='text-slate-200  cursor-pointer ' onClick={() => { showTogglePassword() }} />  </>)

                                }

                            </>
                        )
                    }
                </div>


            </div>




        </>
    )
}

export default Inputs