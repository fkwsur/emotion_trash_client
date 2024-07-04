// axiosConfig.js
import React from 'react';
import axios from 'axios';

export const CustomAxios = axios.create({
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false
});
CustomAxios.interceptors.request.use(
    async (config) => {
        return config
    },
    (error) => {
        console.log(error);
        return Promise.reject(error)
    }
);
CustomAxios.interceptors.response.use(
    async (response) => {
        if (response.data.expired == true){
            const getToken = await axios.get("http://localhost:8081/api/v1/user/issue/token", {
                headers: {
                    refreshauthorization: window.localStorage.getItem("refreshauthorization"),
                }
            });
            console.log(getToken.data, "response toekn ==============================================================================")
            window.sessionStorage.setItem("authorization", getToken.data.authorization);
            response.config.headers.authorization = getToken.data.authorization
            return CustomAxios(response.config);
        } else {
            return response
        }
    },
    (error) => {
        console.log(error)
        return Promise.reject(error)
    }
);