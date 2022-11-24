import axiosClient from "./axiosClient";

interface IParam{
    page: number;
    limit: number;
}
export const permissionAPI = {
    getList: (params: IParam) => {
        const url = "users/staff";
        return axiosClient.get(url, {params});
    },
    delete: (id: string) => {
        const url = `users/${id}`;
        return axiosClient.delete(url);
    },
    updateRole: (id: string,  params: {roleId: string}) => {
        const url= `users/${id}/updateRole`;
        return axiosClient.put(url, params);
    },
    getListRole: ()=> {
        const url =`roles`;
        return axiosClient.get(url);
    },
    createInviteLink: (bodyData: {roleId: string}) => {
        const url = "invite-links";
        return axiosClient.post(url, bodyData);
    }
};

