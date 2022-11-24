import { Button } from "antd";
import { CSSProperties } from "styled-components";
import styled from "styled-components";

import { StyledButton, StyleButtonSub, StyleSocialButton } from "@components";

interface IProps {
    type: "default" | "ghost" | "primary" | "dashed" | "danger" | undefined;
    size?: "default" | "small" | "large" | undefined;
    text: string;
    className?: string;
    style?: CSSProperties | undefined;
    htmlType?: "button" | "reset" | "submit" | undefined;
    disable?: boolean;
    onClick?: () => void;
    icon?: any;
    customIcon?: JSX.Element | undefined;
}

export const ShareButton = (props: IProps) => {
    return (
        <StyledButton size={props.size || ""}>
            <Button
                htmlType={props.htmlType}
                type={props.type}
                size={props.size}
                className={props.className}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    ...props.style,
                }}
                disabled={props.disable}
                onClick={props.onClick}
                icon={props.icon}
            >
                {props.text}
            </Button>
        </StyledButton>
    );
};

interface IPropsSub {
    size?: "default" | "small" | "large" | "92" | "164" | undefined;
    type: "default" | "sub" | "textMain" | "disable" | "Gray" | "backgroundGray" | "red";
    text: JSX.Element | JSX.Element[] | string | null;
    className?: string;
    style?: CSSProperties;
    htmlType?: "button" | "reset" | "submit" | undefined;
    onClick?: () => void;
    disable?: boolean;
}

export const SharedButtonSub = (props: IPropsSub) => {
    const { text, size, type, className, style, htmlType, onClick, disable } = props;
    return (
        <StyleButtonSub
            disabled={disable || type === "disable"}
            size={size}
            type={htmlType}
            typeBtn={type}
            className={className}
            style={style}
            onClick={onClick}
        >
            {text}
        </StyleButtonSub>
    );
};

interface ISocialButton {
    color: string;
    icon: string;
}

export const ShareSocialButton = (props: ISocialButton) => {
    const { color, icon } = props;
    return (
        <StyleSocialButton color={color}>
            <img src={icon} className="social-icon" />
        </StyleSocialButton>
    );
};

export const SharedButtonDefault = (props: IProps) => {
    const { text, type, size, className, style, disable, onClick, icon, customIcon } = props;
    return (
        <StyledContainer>
            <Button
                style={style}
                className={className}
                type={type || "default"}
                size={size || "default"}
                disabled={disable}
                onClick={onClick}
                icon={icon}
            >
                {customIcon || null}
                <span className={customIcon ? "btn-text" : ""}>{text}</span>
                {/* {text} */}
            </Button>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    button {
        display: flex;
        justify-content: center;
        /* justify-content: space-around; */
        align-items: center;
    }
    span {
        line-height: normal;
        /* font-family: "Nunito" !important; */
    }
    .ant-btn-primary {
        color: white !important;
        background-color: #0263e0;
    }
    .ant-btn-primary[disabled] {
        opacity: 0.8;
        background-color: #0263e0;
    }
`;

interface IPropPreview {
    color: string;
    text: string;
}

export const SharedButtonPreview = (props: IPropPreview) => {
    const { color, text } = props;
    return <StyledButtonPreview color={color}>{text}</StyledButtonPreview>;
};

const StyledButtonPreview = styled.div<{ color: string }>`
    background-color: ${(p) => p.color};
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    padding: 12px 0;
    color: #ffffff;
    width: 100%;
    text-align: center;
    border-radius: 8px;
    cursor: pointer;
`;

export const StyledCancelButton = styled((props) => <SharedButtonSub {...props} />)`
    font-size: 16px;
    min-width: 112px;
`;

export const StyledSubmitButton = styled((props) => <SharedButtonSub {...props} />)`
    font-size: 16px;
    margin-right: 12px;
    min-width: 112px;
`;

export const AuthButton = styled(ShareButton)`
    border: none;
    font-weight: bold;
`;
