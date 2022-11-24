import axiosClient from "./axiosClient";

export const dashboardAPI = {
    getListNavigationBoxs: () => {
        const url = "navigation-boxes";
        return axiosClient.get(url);
    },
    getPointsGiven: () => {
        const url = "dashboard/points-given";
        return axiosClient.get(url);
    },
    getPointsRedeemed: () => {
        const url = "dashboard/points-redeemed";
        return axiosClient.get(url);
    },
    getSalesRedeemed: () => {
        const url = "dashboard/sales-redeemed";
        return axiosClient.get(url);
    },
    getTotalContacts: () => {
        const url = "dashboard/total-contacts";
        return axiosClient.get(url);
    },
    getTotalMembers: () => {
        const url = "dashboard/total-members";
        return axiosClient.get(url);
    },
    getPosters: () => {
        const url = "posters";
        return axiosClient.get(url);
    },
};
