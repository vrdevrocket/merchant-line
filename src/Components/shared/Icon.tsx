import { Icon } from "antd";
import { memo } from "react";

interface IProps {
    type: string;
    onClick: () => void;
    active: boolean;
}

const activeColor = "#A5A5A5";
const inActiveColor = "#E1E1E1";

export const SharedSortIcon = memo((props: IProps) => {
    //props
    const { type, onClick, active } = props;
    //variable
    const color = active ? activeColor : inActiveColor;

    return <Icon type={type} style={{ color, cursor: "pointer" }} onClick={onClick} />;
});
