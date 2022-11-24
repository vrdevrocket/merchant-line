export interface IPointActivity {
    docs: IActivity[];
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage: number | null;
    page: number;
    pagingCounter: number;
    prevPage: number | null;
    totalDocs: number;
    totalPages: number;
}

export interface IActivity {
    createdAt: string;
    id: string;
    imageUrl: string;
    merchantId: string;
    note: string;
    point: number;
    type: enumActivityType;
    updatedAt: string;
    userId: string;
    __v: number;
    _id: string;
    userImage: string;
}

export interface IPoint {
    add?: {
        points?: number;
        sales?: number;
    };
    use?: {
        points?: number;
        sales?: number;
    };
    note: string;
    image_url: string[];
}
export enum enumActivityType {
    GIVEN = "GIVEN",
    REDEEM = "REDEEMED",
}
