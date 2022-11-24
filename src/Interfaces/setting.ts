import { enumNotificationAction, enumSignUpMethods, enumStatus } from "@configs";

export interface ISignupMethod {
    fields: IFieldSignUp[];
    turnOn: boolean;
    signUpMethods: enumSignUpMethods[];
    welcomeScreenImages: string[];
    welcomeScreenStatus: enumStatus;
}

export interface IFieldSignUp {
    fieldName: string;
    propertyName: string;
    options: { optionName: string; tag: string }[];
    multiple: boolean;
    _id?: string;
}

export interface INotificationData {
    allNotifications: INotificationItem[];
    rewardCoupon: INotificationItem[];
}

export interface INotificationItem {
    title: string;
    content: string;
    actions?: enumNotificationAction;
}
