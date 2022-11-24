import { enumStatus } from "@configs";

export interface IDataCart {
    _id?: string;
    name: string;
    code?: number | string;
    point?: number | string;
    levelIds: Array<string> | undefined;
    status: enumStatus;
    qrToken: string;
    quantity: string | number;
    limit: string | number;
    imageUrl: Array<string>;
    guideline?: string;
    startDate: Date | string;
    endDate: Date | string;
    qrImageLink: string;
}
