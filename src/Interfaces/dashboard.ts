export interface INavigationBox {
    _id: string;
    colorTheme: string;
    createdAt: string;
    dropdownOptions?: IDropdownOptions[];
    iconUrl?: string;
    link: string;
    text: string;
    title: string;
    title_th: string;
    text_th: string;
    updatedAt: string;
    dropdownStatus: boolean;
}

export interface IDropdownOptions {
    link: string;
    name: string;
    iconUrl: string;
}
export interface IChartData {
    value: number;
    date?: string;
    initTotal: number;
}

export interface IPoster {
    _id: string;
    imageUrl: string;
    link: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
