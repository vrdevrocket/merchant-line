import { enumStatus } from "@configs";

export interface IRewardData {
    _id?: string;
    point?: number;
    levelIds?: string[];
    status: enumStatus;
    name: string;
    quantity?: number;
    limit?: number;
    imageUrl: string[];
    description?: string;
    startDate?: string | Date;
    endDate?: string | Date;
    code: string;
    birthMonths?: string[];
    variants: IVariant[];
    createdAt?: string;
    updatedAt?: string;
}

export interface IVariant {
    _id?: string;
    name: string;
}
