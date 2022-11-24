import styled from "styled-components";

export const StyledButton = styled.div<{ size?: string }>`
    text-align: center;
    .ant-btn {
        width: ${(p) => (p.size === "large" ? "100%" : p.size === "small" ? "60%" : "")};
        color: #fff;
        padding: 16px 0;
        height: ${(p) => p.theme.heights.input};
        background-color: #f22f46;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobilePhone}) {
            height: 50px;
        }
    }
    .ant-btn-primary {
        border-color: #d9d9d9 !important;
        box-shadow: none !important;
    }
    .ant-btn:hover {
        color: #fff !important;
    }
`;

export const StyleButtonSub = styled.button<{
    size: "default" | "small" | "large" | "92" | "164" | undefined;
    typeBtn: "default" | "sub" | "textMain" | "disable" | "Gray" | "backgroundGray" | "red";
}>`
    padding: 16px 32px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    margin-bottom: 8px;
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        padding: 12px 24px;
        ${(p) => {
            if (p.size !== "large") {
                return `
            max-width:140px;
            `;
            }
        }}
    }
    ${(p) => {
        if (p.typeBtn === "default") {
            return `
            background-color:${p.theme.colors.subColor};
            color:#ffffff;
            border:none;
            &:hover{
                background: ${p.theme.colors.processing};;
                box-shadow: 0px 4px 12px ${p.theme.colors.processingShadow};
            }
            `;
        }
        if (p.typeBtn === "sub") {
            return `
             color: #283441;
             background-color:transparent;
             border: 0.5px solid rgba(112,112,112,0.5);
            `;
        }
        if (p.typeBtn === "disable") {
            return `
            color: #646464;
            background: #F7F7F8;
            border: 0.5px solid #A5A5A5;
            `;
        }
        if (p.typeBtn === "textMain") {
            return `
             color: ${p.theme.colors.subColor};
             background-color:#fff;
             border: 0.5px solid ${p.theme.colors.subColor};
            `;
        }
        if (p.typeBtn === "Gray") {
            return `
             color: #646464;
             background-color:#E1E1E1;
             border: none;
            `;
        }
        if (p.typeBtn === "backgroundGray") {
            return `
             color: #fff;
             background-color:#646464;
             border: none;
            `;
        }
        if (p.typeBtn === "red") {
            return `
             color: #fff;
             background-color:#F22F46;;
             border: none;
            `;
        }
    }}
    ${(p) => {
        if (p.size === "large") {
            return `
            width: 100% !important;
            max-width:initial;
            margin-top:12px;
            `;
        }
        if (p.size === "small") {
            return `
            padding:4px 12px;
            line-height:unset;
            font-size: 12px;
            max-width:initial;
            `;
        }
        if (p.size === "92") {
            return `
            width:92px;
            font-size: 16px;
            height:39px;
            `;
        }
        if (p.size === "164") {
            return `
            width:164px;
            font-size: 20px;
            height:52px;
            `;
        }
        if (p.size === "default") {
            return `
            padding:6px 18px;
            line-height:unset;
            font-size: 16px;
            max-width:initial;
            `;
        }
    }}
`;

export const StyleSocialButton = styled.div<{ color?: string }>`
    cursor: pointer;
    /* background-color: ${(props) => props?.color || "#fff"}; */
    /* background-color: #fff; */
    padding: 9px 0;
    width: 100%;
    box-sizing: border-box;
    border-radius: 5px;
    display: flex;
    transition: all 0.5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #f7f7f8;

    border: 1px solid #e1e1e1;
    .social-icon {
        width: 36px;
        margin: auto;
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
        padding: 8px 0;
        svg {
            width: 25px;
            height: 24px;
        }
    }
`;
