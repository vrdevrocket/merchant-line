import { Drawer, Button } from "antd";
import { useTranslation } from "react-i18next";
import { IPoint } from "@interfaces";
import styled from "styled-components";
interface Iprops {
    isVisible: boolean;
    handleCancel: () => void;
    handleOk: () => void;
    values: IPoint;
    customerName: string;
    isSubmitting: boolean;
    isUpdate: boolean;
    userData;
}
export const ModuleMobilePopup = (props: Iprops) => {
    const { t } = useTranslation();
    const { isVisible, handleCancel, customerName, values, handleOk, userData } = props;
    const changeBahtPoint = (baht: number | undefined) => {
        if (!baht || userData === undefined) return null;
        const bathSpent = userData?.user?.currentTier?.bahtSpent || 0;
        const point = userData?.user?.currentTier?.points || 0;
        return Math.floor((baht / bathSpent) * point) || "0";
    };
    return (
        <StyledDrawer
            title={
                <div className="h-layout">
                    <h4>{t("page.member_points.confirm_points")}</h4>
                    <div onClick={handleCancel}>
                        <CloseIcon />
                    </div>
                </div>
            }
            placement={"bottom"}
            closable={false}
            onClose={handleCancel}
            visible={isVisible}
            height="84vh"
        >
            <div className="drawer-wrapper">
                <div className="form-group">
                    <label>{t("page.member_points.name")}</label>
                    <div className="value">{customerName || "-"}</div>
                </div>
                <div className="point-value">
                    <div className="point-label">
                        {values.add?.points
                            ? t("page.member_points.add_points")
                            : t("page.member_points.add_points")}
                    </div>
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="16" cy="16" r="16" fill="white" />
                        <circle
                            cx="16"
                            cy="16"
                            r="15.25"
                            stroke="#0263E0"
                            strokeOpacity="0.36"
                            strokeWidth="1.5"
                        />
                        <path
                            d="M8.53125 15.25C8.11704 15.25 7.78125 15.5858 7.78125 16C7.78125 16.4142 8.11704 16.75 8.53125 16.75L8.53125 15.25ZM25.0616 16.5303C25.3545 16.2374 25.3545 15.7626 25.0616 15.4697L20.2886 10.6967C19.9957 10.4038 19.5208 10.4038 19.2279 10.6967C18.9351 10.9896 18.9351 11.4645 19.2279 11.7574L23.4706 16L19.2279 20.2426C18.9351 20.5355 18.9351 21.0104 19.2279 21.3033C19.5208 21.5962 19.9957 21.5962 20.2886 21.3033L25.0616 16.5303ZM8.53125 16.75L24.5312 16.75L24.5313 15.25L8.53125 15.25L8.53125 16.75Z"
                            fill="#0263E0"
                        />
                    </svg>
                    <div
                        className={
                            values.add?.points || values.add?.sales
                                ? "point-value-num green"
                                : "point-value-num red"
                        }
                    >
                        {values.add?.points || values.add?.sales ? "+ " : "- "}
                        {values.add?.points ||
                            changeBahtPoint(values.add?.sales) ||
                            values.use?.points}
                        {t("page.member_points.points")}
                    </div>
                </div>
                <div className="form-group">
                    <label>{t("page.member_points.notation")}</label>
                    <div className="value">{values.note || "-"}</div>
                </div>
                <div className="form-group image">
                    <label>{t("page.member_points.attach_images")}</label>
                    <div>
                        <div className="image-value">
                            {values.image_url.map((url) => (
                                <img src={url} key={url} />
                            ))}
                        </div>
                    </div>
                </div>
                <Button onClick={handleOk} className="drawer-btn">
                    {t("page.member_points.confirm")}
                </Button>
            </div>
        </StyledDrawer>
    );
};
const CloseIcon = () => (
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1.5L17 17.5" stroke="#646464" strokeWidth="2" strokeLinecap="round" />
        <path d="M1 17.5L17 1.5" stroke="#646464" strokeWidth="2" strokeLinecap="round" />
    </svg>
);
const StyledDrawer = styled(Drawer)`
    .ant-drawer-wrapper-body {
        .ant-drawer-header {
            padding: 32px 16px !important;
            height: 70px !important;
            .ant-drawer-title {
                width: 100%;
                .h-layout {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    h4 {
                        font-style: normal;
                        font-weight: 700;
                        font-size: 25px;
                        line-height: 34px;
                        text-align: center;
                        color: #000000;
                        margin: 0;
                    }
                }
            }
        }
        .ant-drawer-body {
            display: flex;
            align-items: baseline;
            flex-direction: column;

            padding: 32px 32px 48px 32px !important;
            .drawer-wrapper {
                max-height: 512px;
                overflow-y: scroll;
                width: 100%;
            }
            .form-group {
                margin-bottom: 16px;
                label {
                    font-style: normal;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 22px;
                    color: #a5a5a5;
                }
                .value {
                    font-style: normal;
                    font-weight: 700;
                    font-size: 16px;
                    line-height: 22px;
                    color: #000000;
                }
                .image-value {
                    display: flex;
                    width: 380px;
                    overflow-x: scroll;
                    img {
                        width: 250px;
                        height: 183px;
                    }
                }
                &.image {
                    min-height: 240px;
                }
            }
            .point-value {
                display: flex;
                justify-content: space-between;
                width: 100%;
                align-items: center;
                padding: 16px;
                border: 1px solid #f7f7f8;
                box-shadow: 0px 3px 6px rgb(162 162 162 / 16%);
                border-radius: 8px;
                margin-bottom: 16px;
                .point-label {
                    flex: 1;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 22px;
                    display: flex;
                    align-items: center;
                    color: #a5a5a5;
                }
                .point-value-num {
                    flex: 1;
                    font-style: normal;
                    font-weight: 700;
                    font-size: 25px;
                    line-height: 34px;
                    color: #6cd14e;
                    display: flex;
                    justify-content: center;
                    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
                        font-size: 21px;
                    }
                    &.red {
                        color: #f22f46;
                    }
                    &.green {
                        color: #6cd14e;
                    }
                }
            }
            .drawer-btn {
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                padding: 16px 64px;
                gap: 10px;
                height: 49px;
                background: #0263e0;
                border-radius: 4px;
                color: #f7f7f8;
                font-weight: bold;
            }
        }
    }
`;
