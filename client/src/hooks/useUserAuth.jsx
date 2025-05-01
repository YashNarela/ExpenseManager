import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router'

import { API_URL } from '../utilis/apiPath'

import { BASE_URL } from '../utilis/apiPath'
import axiosInstance from '../utilis/axiosInstanse'

const useUserAuth = () => {


    const { user, updateUser, clearUser } = useContext(UserContext)

    const navigate = useNavigate()

    useEffect(() => {

        if (user) return;

        let isMounted = true

        const fetchUserInfo = async () => {


            try {

                const response = await axiosInstance.get(API_URL.AUTH.GET_USER_INFO)

                if (isMounted && response.data) {

                    updateUser(response.data)
                }


            } catch (error) {

                console.error(error)


                if (isMounted) {



                    clearUser()
                    navigate("/login")
                }


            }


        }



        fetchUserInfo()

        return () => {
            isMounted = false
        }





    }, [updateUser, clearUser, navigate,])


    return (
        <div>




        </div>
    )
}

export default useUserAuth