import { enumNotificationAction } from "@configs";

export interface IParams {
    page: number;
    limit: number;
    search?: string;
}

export interface IParamsNotify extends IParams {
    type?: "ALL" | "REWARDS";
    status?: enumNotificationAction;
    dateFilter?: string;
    searchText?: string;
}
