import React from "react";
interface IProps {
    color?: string;
}
export const ThemeColorText = (props: IProps) => {
    const { color } = props;
    switch (color) {
        case "#B99128":
            return <span>{"GOLD"}</span>;
            break;
        case "#FFE25F":
            return <span>{"YELLOW"}</span>;
            break;
        case "#D2E1F2":
            return <span>{"FIRST"}</span>;
            break;
        case "#A2A1A1":
            return <span>{"SILVER"}</span>;
            break;
        case "#716A62":
            return <span>{"BLACK IRON"}</span>;
            break;
        case "#D79D6D":
            return <span>{"BRONZE"}</span>;
            break;
        case "#EF281C":
            return <span>{"THEME"}</span>;
            break;
        default:
            return <span>{"THEME"}</span>;
            break;
    }
};
