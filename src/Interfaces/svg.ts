import { CSSProperties } from "styled-components";

export interface ISvg {
    size?: number;
    style?: CSSProperties | undefined;
    strokeColor?: string;
    strokeWidth?: number;
    color?: string;
    fill?: string;
    width?: number;
    height?: number;
}

export interface IIconStat {
    type: "total_sale" | "total_contact" | "total_member" | "point_given" | "point_redeem";
}
