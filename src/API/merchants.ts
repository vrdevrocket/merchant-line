import {
    IIntegration,
    IMerchantData,
    IMergeSettings,
    IProfileMeChant,
    ISignupMethod,
    IUpdateUserProfile,
    IUpdateMerchant,
    IUpdatemerchantAdmin,
} from "@interfaces";
import axiosClient from "./axiosClient";
import { store } from "@redux";

export const merchantAPI = {
    getMerchant: (id: string) => {
        const url = `merchants/${id}`;
        return axiosClient.get(url);
    },
    updateLoyaltyRule: (id: string, params: IMerchantData) => {
        const url = `merchants/${id}/loyalty/rules`;
        return axiosClient.put(url, params);
    },
    uploadImage: (params: FormData) => {
        const url = `upload`;
        return axiosClient.post(url, params);
    },
    updateProfileMerchantById: (value: IProfileMeChant) => {
        const id = store.getState().auth.userInfo.merchantId;
        const url = `merchants/${id}`;
        return axiosClient.put(url, value);
    },
    updateUserProfile: (params: IUpdateUserProfile) => {
        const url = "/users/merchant";
        return axiosClient.put(url, params);
    },
    //draft
    updateMerchantPlan: (id: string, params: IUpdateMerchant, planId: string) => {
        const url = `merchants/${id}/owner/update-plan`;
        const data = {
            planId,
            ...params,
            // secretKey: "string",
            // secretClient: "string",
            // planExpires: 1,
        };
        return axiosClient.put(url, data);
    },
    updateTrialPlan: (planId: string) => {
        const url = "merchants/init-plan";
        const values = {
            planId,
        };
        return axiosClient.put(url, values);
    },
    mergeSetting: (params: IMergeSettings) => {
        const url = "merchants/merge-settings";
        return axiosClient.put(url, params);
    },
    updateLINEconfig: (params: IIntegration) => {
        const restParam = {
            lineMessaging: params.lineMessaging,
            lineLoginApi: params.lineLoginApi,
        };
        const url = "merchants/line-config";
        return axiosClient.post(url, restParam);
    },
    updateSignUpMethod: (params: ISignupMethod) => {
        const url = "merchants/signup-setting";
        return axiosClient.post(url, params);
    },
    createMerchant: (params) => {
        const url = "merchants/merchantAdminUpdateMerchant";
        return axiosClient.post(url, params);
    },
    updateMerchantAdmin: (params: IUpdatemerchantAdmin) => {
        const url = "/merchants/merchantAdminUpdateCompanyName";
        return axiosClient.post(url, params);
    },
    getMerchantCongratulation: () => {
        const url = "/merchants/congratulationPage";
        return axiosClient.get(url);
    },
    sendSignupMobileEmail: (params) => {
        const url = "/merchants/sendSignupMobileEmail";
        return axiosClient.get(url, params);
    },
    getMerchantListOfSameMerchantAdmin: (userAdminId: string, page: number, x_token: string) => {
        const url = `/auth/getMerchantListOfSameMerchantAdmin?userAdminId=${userAdminId}&&x_token=${x_token}&page=${page}&limit=20`;
        return axiosClient.get(url);
    },
    createNewMerchant: (params) => {
        const url = "/auth/createNewMerchant";
        return axiosClient.post(url, params);
    },
};
