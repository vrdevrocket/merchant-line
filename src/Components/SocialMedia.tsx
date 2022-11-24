import styled, { CSSProperties } from "styled-components";
import { useTranslation } from "react-i18next";

import { IconFaceBook, IconGoogle, IconLine } from "@components";

interface IProps {
    style?: CSSProperties | undefined;
    reverse?: boolean;
    textCenter?: string;
}

export const ComponentSocialMedia = (props: IProps) => {
    //page Hooks
    const { t } = useTranslation();
    //page props
    const { reverse, textCenter, style } = props;
    return (
        <StyleSocialMedia reverse={!!reverse} style={style}>
            <div className="social_media">
                <IconLine />
                <IconFaceBook />
                <IconGoogle />
            </div>
            {textCenter && <div className="text_center">{textCenter}</div>}
            <div className="or">
                <div className="line_left"></div>
                <div className="text">{t("page._or")}</div>
                <div className="line_right"></div>
            </div>
        </StyleSocialMedia>
    );
};

const StyleSocialMedia = styled.div<{ reverse: boolean }>`
    margin: 0 auto;
    display: flex;
    flex-direction: ${(props) => (props.reverse ? "column-reverse" : "column")};
    .social_media {
        text-align: center;
        svg {
            margin: 0 6px;
            width: 28%;
            @media (max-width: ${(p) => p.theme.breakPoints.breakMobile}) {
                margin: 0 4px;
            }
            cursor: pointer;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobile}) {
            height: 50px;
        }
    }
    .or {
        display: flex;
        align-items: center;
        margin-top: 24px;
        position: relative;
        top: -1px;
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            margin-top: 12px;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobile}) {
            margin-top: 4px;
        }
    }
    .line_left,
    .line_right {
        height: 2px;
        background-color: #a5a5a5;
        flex: 1;
        margin-top: 3px;
    }
    .text,
    .text_center {
        font-weight: 600;
        font-size: 20px;
        line-height: 27px;
        color: #a5a5a5;
        margin: 0 12px;
    }
    .text_center {
        margin: 22px 0px;
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            margin: 16px 0px;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobile}) {
            margin: 12px 0px;
        }
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
        width: 250px;
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakMobile}) {
        width: 195px;
    }
`;
