import { enumStatus } from "@configs";
import { ISegmentListParam } from "@interfaces";
import axiosClient from "./axiosClient";

interface IParamsCreate {
    name: string;
    includeOpts: [][];
    excludeOpts: [][];
    status: enumStatus;
}
interface IParamsUpdate {
    name?: string;
    includeOpts?: [][];
    excludeOpts?: [][];
    status?: enumStatus;
}
export const segmentAPI = {
    getList: (params: ISegmentListParam) => {
        const url = "segments";
        return axiosClient.get(url, { params });
    },
    detail: (id: string) => {
        const url = `segments/${id}`;
        return axiosClient.get(url);
    },
    delete: (id: string) => {
        const url = `segments/${id}`;
        return axiosClient.delete(url);
    },
    duplicate: (id: string) => {
        const url = `segments/${id}/duplicate`;
        return axiosClient.post(url, { id: id });
    },
    edit: (id: string, params: IParamsUpdate) => {
        const url = `segments/${id}`;
        return axiosClient.put(url, params);
    },
    create: (params: IParamsCreate) => {
        const url = "segments";
        return axiosClient.post(url, params);
    },
    updateContact: (id: string) => {
        const url = `segments/${id}/contacts`;
        return axiosClient.get(url);
    },
    export: (id: string) => {
        const url = `segments/${id}/exports`;
        return axiosClient.post(url);
    },
    getTrafficSource: () => {
        const url = "traffic-source/list-name";
        return axiosClient.get(url);
    },
    getMembershipTier: () => {
        const url = "merchants/membership-name";
        return axiosClient.get(url);
    },
    getOption: (id: string) => {
        const url = "merchants/signup-settings/survey/" + id;
        return axiosClient.get(url);
    },
};
