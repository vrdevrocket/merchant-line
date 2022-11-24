import { IAuth, IFBLogin, IGGLogin } from "./../Interfaces/auth";
import axiosClient from "./axiosClient";
import {
    ILogin,
    ICreatePassword,
    ICreatePasswordAccount,
    IRegister,
    ILineLogin,
    IChangePassword,
    ILineSignup,
    IFBSignup,
    IGGSignup,
} from "@interfaces";

export const authApi = {
    login: (params: ILogin) => {
        const url = "/auth/login";
        return axiosClient.post(url, params);
    },
    getInfo: () => {
        const url = "/users/profile";
        return axiosClient.get(url);
    },
    resetPassword: (params: ICreatePassword) => {
        const url = "/auth/reset-password";
        return axiosClient.put(url, params);
    },
    refreshToken: (refreshToken: string) => {
        const url = "/auth/login-refresh-token";
        const params = {
            refreshToken,
        };
        return axiosClient.post(url, params);
    },
    sendResetPassword: (value: string) => {
        const url = "auth/send-reset-password";
        const params = {
            email: value,
        };
        return axiosClient.post(url, params);
    },
    reSendEmail: (value: string) => {
        const url = "auth/resend-email";
        const params = {
            email: value,
        };
        return axiosClient.post(url, params);
    },
    register: (params: IRegister) => {
        const url = "auth/register";
        return axiosClient.post(url, params);
    },
    createPassword: (params: ICreatePasswordAccount) => {
        const url = "auth/create-password";
        return axiosClient.put(url, params);
    },
    lineLogin(params: ILineLogin) {
        const url = "/auth/line-login";
        return axiosClient.post(url, params);
    },
    lineSignup(params: ILineSignup) {
        const url = "/auth/line-signup";
        return axiosClient.post(url, params);
    },
    fbLogin(params: IFBLogin) {
        const url = "/auth/facebook-login";
        return axiosClient.post(url, params);
    },
    fbSignup(params: IFBSignup) {
        const url = "/auth/facebook-signup";
        return axiosClient.post(url, params);
    },
    ggLogin(params: IGGLogin) {
        const url = "/auth/google-login";
        return axiosClient.post(url, params);
    },
    ggSignup(params: IGGSignup) {
        const url = "/auth/google-signup";
        return axiosClient.post(url, params);
    },
    changePassword(values: IChangePassword) {
        const url = "users/merchant/password";
        return axiosClient.put(url, values);
    },
    getPlan: (id: string) => {
        const url = "/plans/" + id;
        return axiosClient.get(url);
    },
    loginRefreshToken: (params: { refreshToken: string }) => {
        const url = "/auth/login-refresh-token";
        return axiosClient.post(url, params);
    },
    adminMerchantChooseMerchant: (params) => {
        const url = "/auth/adminMerchantChooseMerchant";
        return axiosClient.post(url, params);
    },
    getCreateToken: (params: IAuth) => {
        const url = "/auth/getCreateToken";
        return axiosClient.post(url, params);
    },
};
