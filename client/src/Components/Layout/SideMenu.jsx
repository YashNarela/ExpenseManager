import React, { useContext } from 'react'

import { SideMenuData } from '../../utilis/data'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router'
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


                <div>

                    {
                        user?.profileImageUrl ? (

                            <img src={user?.profileImageUrl || ""} alt="Profile Image" />


                        ) : (
                            <></>
                        )



                    }

                    <h5 className='' >

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