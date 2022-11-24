import { enumNotificationAction } from "@configs";
import { IParams } from "@interfaces";
import axiosClient from "./axiosClient";

export const fireBaseAPI = {
    saveToken: (userId: string, params: { notiToken: string }) => {
        const url = `/users/${userId}/notiToken`;
        return axiosClient.put(url, params);
    },
    listNotify: (params: IParams) => {
        const url = "/notifications";
        return axiosClient.get(url, { params });
    },
    updateStatus: (id: string, params: { status: enumNotificationAction }) => {
        const url = "/notifications/" + id;
        return axiosClient.patch(url, params);
    },
    getHistoryByTicketCode: (ticketCode) => {
        const url = "/notifications/getHistoryByTicketCode/" + ticketCode;
        return axiosClient.get(url);
    },
};
