import axios from "axios";
const queryString = require("query-string");

import { enumClientIdEnum, enumHttpHeader } from "@configs";
import { store, logout, reStoreAuth, openToast } from "@redux";

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,

    headers: {
        "Content-Type": "application/json",
        // "X-Requested-With": "XMLHttpRequest",
    },

    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use((config) => {
    // const token = await getFirebaseToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    //
    const token = store.getState().auth.auth?.accessToken;
    config.headers["access-token"] = token;
    config.headers[enumHttpHeader.ClientId] = enumClientIdEnum.MERCHANT;

    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: any) => {
        // Handle errors
        if (error.response && error.response.status === 401) {
            //refreshToken
            const refreshTk = store.getState().auth.auth?.refreshToken?._id;
            if (refreshTk) {
                const refreshTokenBody = { refreshToken: refreshTk };
                try {
                    const config = {
                        headers: {
                            "client-id": enumClientIdEnum.MERCHANT,
                        },
                    };
                    const res = await axios.post(
                        process.env.REACT_APP_API_URL + "auth/login-refresh-token",
                        refreshTokenBody,
                        config
                    );
                    if (res.status === 200) {
                        store.dispatch(reStoreAuth(res.data));
                        const originalRequest = error.config;
                        const newToken = res.data.accessToken;
                        originalRequest.headers["access-token"] = newToken;
                        return Promise.resolve(axiosClient(originalRequest));
                    }
                } catch (err: any) {
                    store.dispatch(
                        openToast({
                            message: "You need to login again",
                            type: "warning",
                            autoHideDuration: 2000,
                        })
                    );
                    store.dispatch(logout());
                }
            } else {
                store.dispatch(
                    openToast({
                        message: "You need to login again ",
                        type: "warning",
                        autoHideDuration: 2000,
                    })
                );
                store.dispatch(logout());
            }
        }
        throw error;
    }
);

export default axiosClient;
