import styled from "styled-components";
import { MemberStar, MemberDiamond, MemberCrown } from "./icon";

interface Iprops {
    icon: string;
    callbackIcon?: (icon: string) => void;
}
const ComponentBadgeIcon = (props: Iprops) => {
    const { icon, callbackIcon } = props;
    const handleClickFun = () => {
        if (callbackIcon) {
            callbackIcon(icon);
        }
    };
    return (
        <StyledColor color="" onClick={handleClickFun}>
            {icon === "" && <MemberStar />}
            {icon === "star" && <MemberStar />}
            {icon === "crown" && <MemberCrown />}
            {icon === "diamond" && <MemberDiamond />}
        </StyledColor>
    );
};

export default ComponentBadgeIcon;
const StyledColor = styled.div`
    background-color: #646464;
    width: 32px;
    height: 32px;
    margin: 4px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;
