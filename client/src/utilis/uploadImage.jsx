
import { API_URL} from "./apiPath";

import { BASE_URL } from "./apiPath";

import axiosInstance from "./axiosInstanse";


const uploadImage = async (image) => {


    try {
        const formData = new FormData();
        formData.append("image", image);
    
        const response = await axiosInstance.post(
            `${BASE_URL}${API_URL.IMAGE.UPLOAD_IMAGE}`,
        formData,
        {
            headers: {
            "Content-Type": "multipart/form-data",
            },
        }
        );
    
        return response.data;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }



}

export default uploadImage;