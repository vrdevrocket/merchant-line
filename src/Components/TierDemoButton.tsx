import { RightOutlined } from "@ant-design/icons";
import { FAMILY_COLOR_BENEFITS } from "@configs";
import styled from "styled-components";
import { MemberCrown, MemberDiamond, MemberStar } from "./icon";
// import { ThemeColorText } from "./ThemeColorText";
interface IProps {
    color: string;
    icon?: string;
    height?: number;
    width?: number;
    iconWidth?: string;
    iconHeight?: string;
    size?: string;
}
export const TierDemoButton = (props: IProps) => {
    const { color, icon, height, width, iconHeight, iconWidth, size } = props;
    const getFamilyColor = () =>
        FAMILY_COLOR_BENEFITS[color] !== undefined
            ? FAMILY_COLOR_BENEFITS[color].join()
            : // : FAMILY_COLOR_BENEFITS["#B99128"].join();
              [color, color].join();

    return (
        <StyledOuterLayout color={getFamilyColor() || ""}>
            <StyledButton
                color={getFamilyColor() || ""}
                height={height || 44}
                width={width || 140}
                size={size || ""}
            >
                <StyledIconLayout size={size || ""}>
                    {icon === undefined && (
                        <MemberStar iconHeight={iconHeight || "22"} iconWidth={iconWidth || "22"} />
                    )}
                    {icon === "star" && (
                        <MemberStar iconHeight={iconHeight || "22"} iconWidth={iconWidth || "22"} />
                    )}
                    {icon === "crown" && (
                        <MemberCrown
                            iconHeight={iconHeight || "22"}
                            iconWidth={iconWidth || "22"}
                        />
                    )}
                    {icon === "diamond" && (
                        <MemberDiamond
                            iconHeight={iconHeight || "22"}
                            iconWidth={iconWidth || "22"}
                        />
                    )}
                </StyledIconLayout>
                {/* <ThemeColorText color={color || ""} /> */}
                Member
                <RightOutlined />
            </StyledButton>
        </StyledOuterLayout>
    );
};
const StyledIconLayout = styled.div<{ size: string }>`
    border-radius: 50%;
    padding: ${(p) => (p.size === "small" ? "0 2px" : "6px")};
    background: rgb(232 225 225 / 50%);
    margin-right: 2px;
    svg {
        padding-top: 2px;
    }
`;
const StyledOuterLayout = styled.div<{ color: string }>`
    background: linear-gradient(to bottom, ${(p) => p.color});
    width: fit-content;
    padding: 2px;
    border-radius: 23px;
`;
const StyledButton = styled.button<{ color: string; height: number; width: number; size: string }>`
    text-transform: uppercase;
    color: white;
    font-size: ${(p) => (p.size === "small" ? "10px" : "14px")};
    padding: ${(p) => (p.size === "small" ? "0 2px" : "4px 8px")};
    height: ${(p) => p.height}px;
    /* width: ${(p) => p.width}px; */
    border-radius: 22px;
    background: linear-gradient(to bottom, ${(p) => p.color});
    border: 0.5px solid white;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 428px) {
        height: 20px;
        font-size: 8px;
    }
`;
// font-size:10px
// text-transform: uppercase;
//     color: white;
//     padding: 0px 4px;
//     height: 18px;
//     width: 72px;
//     border-radius: 22px;
//     background: linear-gradient(to bottom,#EF281C,#EF281C);
//     border: 0.1px solid white;
//     font-weight: bold;
//     display: -webkit-box;
//     display: -webkit-flex;
//     display: -ms-flexbox;
//     display: flex;
//     -webkit-align-items: center;
//     -webkit-box-align: center;
//     -ms-flex-align: center;
//     align-items: center;
//     -webkit-box-pack: justify;
//     -webkit-justify-content: space-between;
//     -ms-flex-pack: justify;
//     justify-content: space-between;
