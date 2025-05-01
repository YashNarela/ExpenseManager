import React, { useContext } from 'react'

import { SideMenuData } from '../../utilis/data'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router'

import CharAvatar from '../Cards/CharAvatar'
const SideMenu = ({ activeMenu }) => {

    const { user, clearUser } = useContext(UserContext)

    const navigate = useNavigate()


    const handleClick = (path) => {

        if (path === "/logout") {

            handleLogout()
            return
        } else {
            navigate(path)
        }


    }

    const handleLogout = () => {


        localStorage.clear()

        clearUser()

        navigate("/login")

    }


    return (
        <>


            <div className='w-64  bg-white  border-r border-gray-200/50 p-5  top-[61px]  z-20 ' >


                <div className='flex flex-col items-center justify-center  gap-3 mt-2'  >

                    {
                        !user?.profileImageUrl ? (

                            <img className='w-20 h-20 bg-slate-400    ' src={user?.profileImageUrl || ""} alt="Profile Image" />


                        ) : (
                            <>

                                <CharAvatar fullName={user?.fullName} width="w-20" height="h-20" style="text-xl" />

                            </>
                        )



                    }

                    <h5 className='text-gray-950  font-medium leading-6' >

                        {
                            user?.fullName || ""}


                    </h5>
                </div>

            </div>


            {

                SideMenuData.map((item) => (


                    <button

                        key={item.id}

                        className={`w-full  flex  items-center gap-4 text-[15px]  ${activeMenu == item.label ? "text-white  bg-primary " : ""} py-3 px-6 rounded-lg mb-3 `}

                        onClick={() => handleClick(item.path)}



                    >

                        <item.icon className='text-xl' />


                        {item.label}
                    </button>
                ))
            }



        </>
    )
}

export default SideMenu