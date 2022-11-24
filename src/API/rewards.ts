import axiosClient from "./axiosClient";

import { enumStatus } from "@configs";
import { IDefaultListParam, IRewardData, IVariant } from "@interfaces";

// interface IParamsList {
//     page: number;
//     limit: number;
// }
interface IUpdateStatus {
    status: enumStatus;
}

export const rewardAPI = {
    getList: (params: IDefaultListParam) => {
        const url = "rewards";
        return axiosClient.get(url, { params });
    },
    detail: (id: string) => {
        const url = "rewards/" + id;
        return axiosClient.get(url);
    },
    create: (params: IRewardData) => {
        const url = "rewards";
        return axiosClient.post(url, params);
    },
    update: (id: string, params: IRewardData) => {
        const url = "rewards/" + id;
        return axiosClient.put(url, params);
    },
    updateStatus: (id: string, params: IUpdateStatus) => {
        const url = `rewards/${id}/status`;
        return axiosClient.put(url, params);
    },
    duplicate: (id: string) => {
        const url = `rewards/${id}/duplicate`;
        return axiosClient.post(url, { id: id });
    },
    delete: (id: string) => {
        const url = "rewards/" + id;
        return axiosClient.delete(url);
    },
    listVariant: (params: IDefaultListParam) => {
        const url = "variants";
        return axiosClient.get(url, { params });
    },
    createVariant: (params: IVariant) => {
        const url = "variants";
        return axiosClient.post(url, params);
    },
};
