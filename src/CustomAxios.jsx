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
        if ((response.data.error || '').toString().includes("io.jsonwebtoken") == true) {
            const getToken = await axios.get("http://localhost:8081/api/v1/user/issue/token", {
                headers: {
                    rxauth: window.localStorage.getItem("rxauth"),
                }
            });
            console.log(getToken.data, "response toekn ==============================================================================")
            window.localStorage.setItem("xauth", getToken.data.xauth);
            response.config.headers.xauth = getToken.data.xauth
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