import React, { useRef, useState } from 'react'
import { LuUser } from "react-icons/lu";
import { LuUpload } from "react-icons/lu";
import { LuTrash } from "react-icons/lu";
const ProfilePhotoSelector = ({ image, setImage }) => {


    const inputref = useRef(null)
    const [previewUrl, setPreviewUrl] = useState(null)

    const handleImageChange = (e) => {


        const file = e.target.files[0]

        console.log(file);


        if (file) {


            setImage(file);

            const preview = URL.createObjectURL(file);

            console.log(preview);

            setPreviewUrl(preview);


        }

        // generate preview url



    }

    const handleRemoveUrlImage = () => {

        setImage(null)
        setPreviewUrl(null)



    }

    const onChoseFile = () => {

        inputref.current.click()
    }

    return (
        <>

            <div className='flex justify-center  mb-6  ' >


                <input type="file" accept='image/*' ref={inputref} onChange={handleImageChange} className='hidden ' />

                {
                    !image ? <div className='w-20 h-20  flex items-center  justify-center  bg-purple-100 rounded-full relative'  >
                        <LuUser className='text-4xl  text-primary' />

                        <button type='button ' className='w-8 h-8  flex items-center justify-center bg-primary text-white  rounded-full absolute -bottom-1 -right-1' onClick={onChoseFile} ><LuUpload />
                        </button>
                    </div> :
                        <div className='relative' >
                            <img src={previewUrl} alt="profile photo" className='w-20 h-20 ' />

                            <button type='button' className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 ' onClick={handleRemoveUrlImage} >

                                <LuTrash />
                            </button>
                        </div>

                }

            </div>



        </>
    )
}

export default ProfilePhotoSelector