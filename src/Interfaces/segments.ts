import { enumStatus } from "@configs";

export interface ISegmentData {
    _id?: string;
    name: string;
    includeOpts: [][];
    excludeOpts: [][];
    status: enumStatus;
    createdAt?: string;
    updatedAt?: string;

    contacts?: number;
    hooks?: string[];
    hook?: string;
}

export interface ISegmentConditionItem {
    title: string;
    key: string;
    type: number;
}

export interface ISegmentCondition {
    basicInfo: ISegmentConditionItem[];
    membership: ISegmentConditionItem[];
    LINEProperties: ISegmentConditionItem[];
    points: ISegmentConditionItem[];
    coupons: ISegmentConditionItem[];
    sales: ISegmentConditionItem[];
    form: ISegmentConditionItem[];
}

export interface ISegmentConditionType {
    text: {
        isEqualToAnyOf: number;
        containsAnyOf: number;
        isKnown: number;
        isUnknown: number;
    };
    date: {
        isEqualTo: number;
        isBefore: number;
        isAfter: number;
        isBetween: number;
    };
    number: {
        isEqualTo: number;
        isGreaterThan: number;
        isLessThan: number;
    };
}

export interface ISegmentText {
    isEqualToAnyOf: string[];
    containsAnyOf: string[];
    isKnown: boolean;
}

export interface ISegmentNumber {
    isEqualTo: number;
    isGreaterThan: number;
    isLessThan: number;
}

export interface ISegmentDate {
    isEqualTo: string[];
    isBefore: string[];
    isAfter: string[];
    isBetween: string[];
}

export interface ISegment {
    name?: ISegmentText;
    dob?: ISegmentDate;
    email?: ISegmentText;
    contactAddDate?: ISegmentDate;
    memberRegistrationDate?: ISegmentDate;
    trafficSource?: ISegmentText;
    lastActivityDate?: ISegmentDate;
    membershipTier?: ISegmentText;
    pointsToNextTier?: ISegmentNumber;
    LINEId?: ISegmentText;
    LINEUserId?: ISegmentText;
    LINEChatTags?: ISegmentText;
    pointsBalance?: ISegmentNumber;
    pointsToExpireIn1Month?: ISegmentNumber;
    lastPointsCollectionDate?: ISegmentDate;
    lastPointsRedemptionDate?: ISegmentDate;
    couponsBalance?: ISegmentNumber;
    couponsUsed?: ISegmentNumber;
    couponsToExpireIn1Month?: ISegmentDate;
    lastCouponCollectionDate?: ISegmentDate;
    lastCouponUsedDate?: ISegmentDate;
    salesAmount?: ISegmentNumber;
    lastSalesDate?: ISegmentDate;
    field1TagValues?: ISegmentText;
    field2TagValues?: ISegmentText;
    field3TagValues?: ISegmentText;
}
