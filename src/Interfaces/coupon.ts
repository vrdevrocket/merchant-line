import { enumStatus } from "@configs";

export interface ICoupon {
    _id?: string;
    name: string;
    code?: string;
    levelIds: Array<string> | undefined;
    status: enumStatus;
    qrToken: string;
    quantity?: number;
    limit?: number;
    imageUrl: Array<string>;
    guideline?: string;
    startDate: Date | string;
    endDate: Date | string;
    qrImageLink: string;
    benefit?: number;
    unit?: string;
    isDisplayed: enumStatus;
}

export interface IEditor {
    value: string;
    error: string;
}

export interface IDate {
    date: Date | string;
    time: string;
}
export interface IDataDate {
    from: IDate;
    to: IDate;
}
