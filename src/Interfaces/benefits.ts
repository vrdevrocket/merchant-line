import { enumStatus } from "@configs";

export interface IBenefitData {
    _id?: string;
    levelIds: Array<string>;
    status: enumStatus;
    name: string;
    quantity?: number;
    limit?: number;
    code: string;
    quantityUnit?: string;
    limitUnit?: string;
    imageUrl: string[];
    description: string;
    startDate: string | Date;
    endDate: string | Date;
    birthMonths: Array<string>;
    createdAt?: string;
    updatedAt?: string;
}
