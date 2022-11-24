import axiosClient from "./axiosClient";

import { enumStatus } from "@configs";
import { IDefaultListParam, IBenefitData } from "@interfaces";

// interface IParamsList {
//     page: number;
//     limit: number;
// }
interface IUpdateStatus {
    status: enumStatus;
}

export const benefitAPI = {
    getList: (params: IDefaultListParam) => {
        const url = "benefits";
        return axiosClient.get(url, { params });
    },
    detail: (id: string) => {
        const url = "benefits/" + id;
        return axiosClient.get(url);
    },
    create: (params: IBenefitData) => {
        const url = "benefits";
        return axiosClient.post(url, params);
    },
    update: (id: string, params: IBenefitData) => {
        const url = "benefits/" + id;
        return axiosClient.put(url, params);
    },
    updateStatus: (id: string, params: IUpdateStatus) => {
        const url = `benefits/${id}/status`;
        return axiosClient.put(url, params);
    },
    duplicate: (id: string) => {
        const url = `benefits/${id}/duplicate`;
        return axiosClient.post(url, { id: id });
    },
    delete: (id: string) => {
        const url = "benefits/" + id;
        return axiosClient.delete(url);
    },
};
