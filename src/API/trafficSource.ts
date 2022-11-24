import { enumStatus } from "@configs";
import { ITrafficSource, ITrafficParam } from "@interfaces";
import axiosClient from "./axiosClient";

export const trafficSourceAPI = {
    createTrafficSource: (params: ITrafficSource) => {
        const url = "/traffic-source";
        return axiosClient.post(url, params);
    },
    getListTrafficSource: (params: ITrafficParam) => {
        const url = "/traffic-source";
        return axiosClient.get(url, { params });
    },
    toggleStatus: (id: string, params: enumStatus) => {
        const url = `/traffic-source/${id}/status`;
        const values = {
            status: params,
        };
        return axiosClient.put(url, values);
    },
    duplicate: (id: string) => {
        const url = `/traffic-source/${id}/duplicate`;
        return axiosClient.post(url);
    },
    delete: (id: string) => {
        const url = "/traffic-source/" + id;
        return axiosClient.delete(url);
    },
    getTrafficSourceById: (id: string) => {
        const url = "/traffic-source/" + id;
        return axiosClient.get(url);
    },
    updateTrafficSourceById: (id: string, value: ITrafficSource) => {
        const url = "/traffic-source/" + id;
        return axiosClient.put(url, value);
    },
};
