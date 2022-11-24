import { IMembershipTier } from "./auth";
import { enumExpLoyaltyHub, enumMergeSettingMatch, enumStaffAmount } from "@configs";

export interface IMerchantData {
    contacts?: number | string;
    createdAt?: string;
    createdBy?: string;
    initPoint?: number | string;
    logoUrl?: string;
    members?: number | string;
    membershipTiers: IMembershipTier[];
    name?: string;
    planId?: string;
    planName?: string;
    plans?: IPlans[];
    status?: string;
    themeColor?: string;
    timeExpires?: number;
    updatedAt?: string;
    users?: string[];
    welcomeImageUrls?: Array<string>;
    __v?: number | string;
    _id?: string;
    mergeSettings?: IMergeSettings;
    lineIntegration?: IIntegration;
    termCondition?: string;
    isPointExpire?: boolean;
    pointExpiryType?: enumPointExpiryType;
    monthExpires?: string;
    downGradeRule?: IDownGradeRule;
    // isDownGrade: boolean;
    // downGradeType: enumDownGradeType;
    // specificMonth: string;
    // downGradeCycle: enumDownGradeCycle;
}
export interface IUpdateMerchant {
    planExpires: number;
    isPaidPlan: boolean;
}
export enum enumDownGradeCycle {
    MONTH_12_CYCLE = "MONTH_12_CYCLE",
    MONTH_24_CYCLE = "MONTH_24_CYCLE",
}
export enum enumPointExpiryType {
    SPECIFIC_MONTH = "SPECIFIC_MONTH",
    FIXED_FREQUENCY_MONTH = "FIXED_FREQUENCY_MONTH",
}
export enum enumDownGradeType {
    REAL_TIME = "REAL_TIME",
    EVERY_MONTH = "EVERY_MONTH",
    SPECIFIC_MONTH = "SPECIFIC_MONTH",
}
export interface IDownGradeRule {
    isDownGrade?: boolean;
    downGradeType?: enumDownGradeType;
    specificMonth?: string;
    downGradeCycle?: enumDownGradeCycle;
}
export interface IPlans {
    name: string;
    _id: string;
}

export interface IWelcomeImage {
    key: string;
    publicUrl: string;
}
export interface IProfileMeChant {
    name: string;
    themeColor: string;
    logoUrl: string;
    logoSmallUrl: string;
    enableAccess: boolean;
    qrInviteLinkImgUrl: string;
}
export interface IUpdatemerchantAdmin {
    businessName: string;
    themeColor: string;
    logoUrl: string;
}

export interface IMergeSettings {
    isTel: boolean;
    isEmail: boolean;
    isLineId: boolean;
    isAutoMerge: boolean;
    match: enumMergeSettingMatch;
}

export interface IIntegration {
    lineMessaging: ILineMessaging;
    lineLoginApi: ILineLoginApi;
}

export interface ILineMessaging {
    accessToken: string;
}

export interface ILineLoginApi {
    channelID: string;
    channelSecret: string;
    liffUrl: string;
    getEmail: boolean;
}

export interface ICreateNewMerchant {
    name: string;
    businessTypeName: string;
    businessTel: string;
    staffAmount: string;
    expLoyaltyHub: string;
    logoUrl: string;
    firstAdminName: string;
    businessEmail: string;
    firstAdminEmail: string;
    themeColor: string;
}
export interface INewAccount {
    firstAdminName: string;
    name: string;
    businessName: string;
    businessTypeName: string;
    businessTel: string;
    staffAmount: enumStaffAmount;
    expLoyaltyHub: enumExpLoyaltyHub;
}
