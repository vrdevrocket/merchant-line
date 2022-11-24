export interface IHandleChange {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any>
        ? void
        : (e: string | React.ChangeEvent<any>) => void;
}

export interface IHandleBlur {
    (e: React.FocusEvent<any>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
}

export type IHandleSubmit = (e?: React.FormEvent<HTMLFormElement> | undefined) => void;

export interface ILimitDate {
    maxDate?: string | Date;
    minDate?: string | Date;
}

export interface ISelect {
    id?: string;
    label?: string;
}

export interface ISelectBirthMonth {
    name: string;
    value: string;
}
export interface ILimitSelect {
    name: string;
    value: string;
}
