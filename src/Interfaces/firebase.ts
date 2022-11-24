import { enumNotificationAction, enumNotiType, enumStatus } from "@configs";

export interface INotifications {
    _id?: string;
    status: enumStatus;
    notiStatus: enumNotificationAction;
    merchantId?: string;
    type: enumNotiType;
    body: string;
    title: string;
    ticketCode?: string;
    updatedAt?: string;
    createdAt?: string;
    client_user: INotificationsUserInfo;
    historyDetail?: IHistoryData;
    contactDetail?: contactDetail;
    rewardDetail?: IRewardDetail;
}
export interface IRewardDetail {
    _id: string;
    imageUrl: string[];
}
export interface contactDetail {
    _id: string;
    dateOfBirth: string;
}
export interface IHistoryData {
    points: number;
    quantity: number;
    ticketCode: string;
    type: string;
    userId: string;
    _id: string;
}
export interface INotificationsUserInfo {
    _id?: string;
    email?: string;
    fullName?: string;
    memberCode?: string;
    phoneNumber?: string;
    balancePoint?: number;
    avatar: string;
}
