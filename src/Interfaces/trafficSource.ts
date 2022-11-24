import { enumStatus } from "@configs";

export interface ITrafficSource {
    _id?: string;
    name: string;
    url: string;
    status: enumStatus;
    qrToken: string;
    qrImageLink: string;
    totalClick?: number;
}
