import { enumStatus } from "@configs";

export interface IFreePoint {
    _id?: string;
    name: string;
    point?: number;
    levelIds: Array<string> | undefined;
    status: enumStatus;
    qrToken: string;
    quantity?: number;
    limit?: number;
    imageUrl: Array<string>;
    startDate: Date | string;
    endDate: Date | string;
    qrImageLink: string;
}
