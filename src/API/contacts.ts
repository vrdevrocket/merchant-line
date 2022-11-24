import {
    IContactListParams,
    IMergeListParams,
    IParamsMergeSuggestions,
    // IUpdateContact,
    IContactBase,
} from "@interfaces";

import axiosClient from "./axiosClient";
interface IParamsPoints {
    userId: string;
    amount?: number;
    type?: string;
    isAdd?: boolean;
}
export interface IUpdateMembership {
    userId: string;
    membershipTierId: string;
}

export const contactAPI = {
    getList: (params: IContactListParams) => {
        const url = "contacts";
        return axiosClient.get(url, { params });
    },
    delete: (id: string) => {
        const url = `contacts/${id}`;
        return axiosClient.delete(url);
    },
    duplicate: (id: string) => {
        const url = `contacts/${id}/duplicate`;
        return axiosClient.post(url, { id: id });
    },
    create: (params: IContactBase) => {
        const url = "contacts";
        return axiosClient.post(url, params);
    },
    updateName: (id: string, params: any) => {
        const url = `contacts/${id}/update`;
        return axiosClient.put(url, params);
    },
    detail: (id: string) => {
        const url = `contacts/${id}`;
        return axiosClient.get(url);
    },
    updatePoint: (params: IParamsPoints) => {
        const url = `points/update-point`;
        return axiosClient.put(url, params);
    },
    getMergeList: (params: IMergeListParams) => {
        const url = "contacts/merge-suggestions";
        return axiosClient.get(url, { params });
    },
    mergeSuggest: (params: IParamsMergeSuggestions) => {
        const url = "contacts/merge-contacts";
        return axiosClient.post(url, params);
    },
    updateMembership: (params: IUpdateMembership) => {
        const url = "contacts/update-membership";
        return axiosClient.put(url, params);
    },
    importContact: (params: FormData) => {
        const url = "contacts/import-contact";
        return axiosClient.post(url, params);
    },
    exportContact: () => {
        const url = "contacts/export-contact";
        return axiosClient.post(url);
    },
    downloadTemplate: () => {
        const url = "contacts/download-contact-template";
        return axiosClient.post(url);
    },
    getClientByMemberCode: (memberCode) => {
        const url = `users/getClientByTextSearch/${memberCode}`;
        return axiosClient.get(url);
    },
    getClientHistoryPointByUserId: (id, params) => {
        const url = `/users/getClientHistoryPointByUserId/${id}`;
        return axiosClient.get(url, { params });
    },
};
