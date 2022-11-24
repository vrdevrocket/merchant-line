import { enumStatus } from "@configs";
import { IFreePoint, IPagination } from "@interfaces";
import axiosClient from "./axiosClient";

export const freePointAPI = {
    createFreePoint: (params: IFreePoint) => {
        const url = "/free-points";
        return axiosClient.post(url, params);
    },
    getListFreePoint: (params: IPagination) => {
        const url = "/free-points";
        return axiosClient.get(url, { params });
    },
    toggleStatus: (id: string, params: enumStatus) => {
        const url = `/free-points/${id}/status`;
        const values = {
            status: params,
        };
        return axiosClient.put(url, values);
    },
    duplicate: (id: string) => {
        const url = `/free-points/${id}/duplicate`;
        return axiosClient.post(url);
    },
    delete: (id: string) => {
        const url = "/free-points/" + id;
        return axiosClient.delete(url);
    },
    getFreePointById: (id: string) => {
        const url = "/free-points/" + id;
        return axiosClient.get(url);
    },
    updateFreePointById: (id: string, value: IFreePoint) => {
        const url = "/free-points/" + id;
        return axiosClient.put(url, value);
    },
};
