// import { IRole } from "./permissions";
import { enumExternalAuthType, enumNotiType } from "@configs";
import {
    // IFieldSignUp,
    IIntegration,
    IMergeSettings,
    ISignupMethod,
} from "@interfaces";
export interface IAuth {
    userAdminId?: string;
    x_token?: string;
    create_token?: string;
    email?: string;
    accessToken?: string;
    refreshToken?: IRefreshToken | null;
    userPermissions?: Array<string> | null;
    isFirstLogin?: boolean;
}

export interface IRefreshToken {
    createdAt: string;
    expires: number | string;
    updatedAt: string;
    _id: string;
}
export interface ILogin {
    email: string;
    password: string;
}
export interface IChooseMerchant {
    x_token: string;
    merchantId: string;
    userAdminId: string;
}

export interface ICreateMerchant {
    x_token: string;
    userAdminId: string;
}
export interface IEmail {
    email: string;
}
export interface IForgotPassword {
    password: string;
}
export interface INitCreatePassword {
    name?: string;
    password: string;
    confirmPassword: string;
}
export interface ICreatePassword {
    resetPasswordId: string;
    password: string;
}

export interface IChangePassword {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}
export interface IInfo {
    _id: string;
    userType: string;
    email: string;
    points: [];
    avatar?: string;
    createdAt: string;
    updatedAt: string;
    __v?: number;
    resetPassword: {
        _id: string;
        id: string;
        expires: number;
    };
    roleId: string;
    merchantId?: string;
    fullName: string;
    themeColor?: string;
    logoUrl?: string;
    name?: string;
    notifSetting: INotifSetting;
    role: IRoleAuth;
    merchant: IMerchant;
    enableAccess: boolean;
    lineUserId?: string;
}

export interface IMerchant {
    membershipTiers: IMembershipTier[];
    _id: string;
    status: string;
    createdBy?: string;
    mergeSettings: IMergeSettings;
    themeColor?: string;
    planId?: string;
    lineIntegration?: IIntegration;
    signUpSettings?: ISignupMethod;
    businessName?: string;
    businessTel?: string;
    name?: string;
    plan?: IMerchantPlan;
    allTransactionCurrentMonth: number;
    allTransactionCurrentMonthPercent: number;
    clientCount: number;
    clientCountPercent: number;
}
export interface IMerchantPlan {
    _id: string;
    name: string;
    membership: {
        status: boolean;
        limit: number;
    };
    limitTransaction: {
        status: boolean;
        limit: number;
    };
}
export interface IMembershipTierRules {
    initPoint: string;
    membershipTiers: IMembershipTier[];
}
export interface IMembershipTier {
    isDefault?: boolean;
    tierName?: string;
    bahtSpent?: number;
    points?: number;
    benefits?: Array<string>;
    status?: boolean;
    _id?: string;
    color?: string;
    iconUrl?: string;
    icon?: string;
    pointThreshold: number;
    membershipName?: string;
    tierId?: string;
    accumulativePoints?: number;
}

export interface IPreview {
    name: string;
    dateFrom: string | Date;
    dateTo: string | Date;
    timeFrom: string;
    timeTo: string;
    code?: string | number;
    images: Array<string>;
    guideline?: string;
}
export interface IRoleAuth {
    _id: string;
    permissions: Array<string>;
    name: string;
}
export interface INotifSetting {
    channels: IChannels;
    events: enumNotiType[];
}

export interface IChannels {
    adminPanel: boolean;
    email: boolean;
    lineChat: boolean;
}

export enum ChannelEnum {
    adminPanel = "adminPanel",
    email = "email",
    lineChat = "lineChat",
}

export interface IUpdateUserProfile {
    fullName: string;
    notifSetting: INotifSetting;
}

export enum EventEnum {
    couponAddOrDel = "couponAddOrDel",
    couponCollection = "couponCollection",
    couponUsage = "couponUsage",
    membershipUpgradeOrDowngrade = "membershipUpgradeOrDowngrade",
    newUserSignUp = "newUserSignUp",
    pointsCollection = "pointsCollection",
    reward = "reward",
    rewardAddOrDel = "rewardAddOrDel",
    rewardRedemption = "rewardRedemption",
    sales = "sales",
}
export interface ICreatePasswordAccount {
    fullName: string;
    password: string;
    resetPasswordId: string;
}

export interface IRegister {
    email: string;
    inviteId?: string;
}

export interface ILineLogin {
    token: string;
    refreshToken: string;
    tokenId: string;
    inviteId?: string;
}

export interface ILineSignup {
    token: string;
    refreshToken: string;
    tokenId: string;
    inviteId?: string;
}

export interface IFBLogin {
    token: string;
    userId: string;
}

export interface IFBSignup {
    token: string;
    userId: string;
    inviteId?: string;
}

export interface IGGLogin {
    token: string;
}

export interface IGGSignup {
    token: string;
    inviteId?: string;
}

export interface IAccountName {
    accountName: string | undefined;
    enableAccess: boolean;
}

export interface ILineState {
    type: enumExternalAuthType;
    inviteId?: string;
}

export interface IExternalAuthState {
    type: enumExternalAuthType;
    inviteId?: string;
}
