import { enumStatus } from "@configs";
import { ICoupon, IPagination } from "@interfaces";
import axiosClient from "./axiosClient";

export const couponAPI = {
    createCoupon: (params: ICoupon) => {
        const url = "/coupons";
        return axiosClient.post(url, params);
    },
    getListCoupon: (params: IPagination) => {
        const url = "/coupons";
        return axiosClient.get(url, { params });
    },
    toggleStatus: (id: string, params: enumStatus) => {
        const url = `/coupons/${id}/status`;
        const values = {
            status: params,
        };
        return axiosClient.put(url, values);
    },
    duplicate: (id: string) => {
        const url = `/coupons/${id}/duplicate`;
        return axiosClient.post(url);
    },
    delete: (id: string) => {
        const url = "/coupons/" + id;
        return axiosClient.delete(url);
    },
    getCouponById: (id: string) => {
        const url = "/coupons/" + id;
        return axiosClient.get(url);
    },
    updateCouponById: (id: string, value: ICoupon) => {
        const url = "/coupons/" + id;
        return axiosClient.put(url, value);
    },
};
