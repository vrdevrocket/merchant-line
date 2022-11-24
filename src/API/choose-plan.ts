import axiosClient from "./axiosClient";

export const choosePlanAPI = {
    getChoosePlan: () => {
        const url = "plans/init-merchant";
        return axiosClient.get(url);
    },
};
