import { IPagination } from "./paginate";
import {
    enumStatus,
    enumContactSortFields,
    enumSortBy,
    enumMergeSortFields,
    enumDefaultSortFields,
    enumSegmentSortFields,
} from "@configs";
import { IBenefitData, IMembershipTier, IMerchantData } from "@interfaces";
import { ITrafficSource } from "./trafficSource";

export interface IContactBase {
    fullName: string;
    phoneNumberFormat?: { code: string; number: string };
    merchantId?: string;
    email?: string;
    phoneNumber?: string;
}

export interface IUpdateContact {
    fullName?: string;
    phoneNumber?: string;
    email?: string;
    dateOfBirth?: Date | string;
}
export interface IContactData {
    _id: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    createdAt?: string;
    updatedAt?: string;
    merchant?: IMerchantData;
    dateOfBirth?: string;
    user?: IUser;
    avatar?: string;
    memberTier?: IMembershipTier;
}

export interface IContactDetail {
    _id: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    createdAt?: string;
    updatedAt?: string;
    merchant?: IMerchantData;
    dateOfBirth?: string;
    user?: IUserDetail;
    avatar?: string;
    memberTier?: IMembershipTier;
    trafficSources: ITrafficSource[];
    memberCode?: string;
}

export interface IUserDetail {
    memberTier: IMembershipTier;
    _id?: string;
    points: IUserPoints;
    avatar?: string;
    status: enumStatus;
    userType: string;
    email: string;
    tier: string;
    createdAt: string;
    lastActive: string;
    dob: string;
    lineUserId?: string;
    pointsToNextTier: IMembershipTier;
    coupons: IUserCoupons;
    sales: ISales;
    surveyQuestions: ISurveyQuestion[];
    memberCode?: string;
    currentTier?: ICurrentTier;
}
export interface ICurrentTier {
    bahtSpent: number;
    benefits: Array<string>;
    color: string;
    icon: string;
    isDefault: boolean;
    membershipName: string;
    pointThreshold: number;
    points: number;
    status: boolean;
    _id: string;
}

export interface ISurveyQuestion {
    question: string;
    answers: string[];
    propertyName: string;
}
export interface ISales {
    totalSales: number;
    salesLastDate: string;
}

export interface IUserPoints {
    totalPoints: number;
    lastCollectionDate: string;
    lastRedemptionDate: string;
    expiredPointsOneMonth: number;
}

export interface IUserCoupons {
    balance: number;
    lastCollectionDate: string;
    lastRedemptionDate: string;
    used: number;
    expiredCouponsOneMonth: number;
}
export interface IUserPointsNextTier {
    bahtSpent?: string;
    benefit?: IBenefitData;
}
export interface IMergeData {
    _id: string;
    createdAt?: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    resourceUser: IMergeResourceUser;
    status: enumStatus;
    updatedAt?: string;
    avatar?: string;
}

export interface IMergeResourceUser {
    _id: string;
    status: enumStatus;
    email: string;
    phoneNumber: string;
    avatar?: string;
    fullName: string;
}
export interface IUser {
    memberTier: IMembershipTier;
    _id: string;
    status: enumStatus;
    userType: string;
    email: string;
    points: number;
    saleAmount: number;
    tier: string;
    createdAt: string;
    activityAt: string;
    dob: string;
    trafficSource: string;
    avatar?: string;
    memberCode: string;
}

export interface IContactListParams extends IPagination {
    search?: string;
    sortBy?: enumSortBy;
    sortField?: enumContactSortFields;
}

export interface IMergeListParams extends IPagination {
    sortBy?: enumSortBy;
    sortField?: enumMergeSortFields;
}

export interface IDefaultListParam extends IPagination {
    sortBy?: enumSortBy;
    sortField?: enumDefaultSortFields;
}
export interface IParamsMergeSuggestions {
    suggestions: ISuggestionsValue[];
}

export interface ISegmentListParam extends IPagination {
    sortBy?: enumSortBy;
    sortField?: enumSegmentSortFields;
}

export interface ITrafficParam extends IPagination {
    sortBy?: enumSortBy;
    sortField?: "url";
}

export interface ISuggestionsValue {
    resourceId: string;
    targetId: string;
}
