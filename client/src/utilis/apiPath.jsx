export const BASE_URL = "http://localhost:8000"


export const API_URL = {


    AUTH: {

        LOGIN: "/api/v1/auth/login",

        REGISTER: "/api/v1/auth/register",


        GET_USER_INFO: "/api/v1/auth/getuser",

    },

    DASHBOARD: {

        GET_DATA: "/api/v1/dashboard",


    },

    INCOME: {
        ADD_INCOME: "/api/v1/income/add",
        GET_ALL_INCOME: "/api/v1/income/get",

        DELETE_INCOME: (id) => `/api/v1/income/${id}`,



        DOWNLOAD_INCOME: "/api/v1/income/download",




    },
    EXPENSE: {

        ADD_EXPENSE: "/api/v1/expense/add",

        GET_ALL_EXPENSE: "/api/v1/expense/get",

        DELETE_EXPENSE: (id) => `/api/v1/expense/${id}`,

        DOWNLOAD_EXPENSE: "/api/v1/expense/download",



    },


    IMAGE:{

        

        UPLOAD_IMAGE: "/api/v1/auth/upload-image",
        
    }


}