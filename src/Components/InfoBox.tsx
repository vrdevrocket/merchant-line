import { enumPlacement } from "@configs";
import { Popover } from "antd";
import styled from "styled-components";
import { InfoIconColor } from "./icon";
import { selectApp, useAppSelector } from "@redux";
interface Iprops {
    videoUrl?: string;
    title: string;
    body: string[];
    footer?: string;
    footerTitle?: string;
    placement: enumPlacement;
}
export const ComponentInfoBox = (props: Iprops) => {
    const app = useAppSelector(selectApp);
    const { videoUrl, title, body, placement, footer, footerTitle } = props;
    const content = (
        <StyledLayout>
            {videoUrl && (
                <iframe
                    width={"100%"}
                    height={"auto"}
                    src="https://www.youtube.com/embed/5hPtU8Jbpg0"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            )}
            <div className="info">
                <h4>{title}</h4>
                {body.length > 0 &&
                    body.map((item, index) => {
                        if (item !== "") {
                            return <p key={index}>{item}</p>;
                        }
                    })}
                {footerTitle && <h4 className="footer">{footerTitle}</h4>}
                {footer && <p>{footer}</p>}
            </div>
        </StyledLayout>
    );
    return (
        <Popover placement={placement} title={null} content={content} trigger="click">
            <StyledButton>
                <InfoIconColor size={app.mobile ? 14 : 20} />
            </StyledButton>
        </Popover>
    );
};
const StyledButton = styled.button`
    border: 0;
    background-color: transparent;
    padding: 0;
    margin-left: 8px;
    &:focus-visible {
        outline: 0;
    }
    &:hover {
        svg {
            circle {
                fill: #000000;
            }
        }
    }
`;
const StyledLayout = styled.div`
    text-align: center;
    iframe {
        margin-bottom: 16px;
    }
    .info {
        max-width: 336px;
        margin: auto;
    }
    h4 {
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 19px;
        text-align: center;
        color: #000000;
        margin-bottom: 12px;
    }
    p {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        text-align: center;
        color: #646464;
        margin: 0;
    }
    .footer {
        margin-top: 16px;
    }
`;
