export interface IError {
    path: string;
    statusCode: number;
    timestamp: string;
    message:IMessageError[];
}

export interface IMessageError {
    children: Array<any>[];
    constraints: any;
    property: string;
}

// export interface IContainerError {
//     minLength:string;
// }
