export interface IStaffData {
    _id: string;
    status: string;
    userType: string;
    email: string;
    roleId: string;
    createdAt: string;
    updatedAt: string;
    fullName: string;
    merchantId: string;
    roles: string[];
    roleName: string;
    avatar?: string;
}

export interface IRole {
    createAt?: string;
    updateAt?: string;
    name: string;
    permissions: string[];
    roleType?: string;
    status?: string;
    _id: string;
}
