import { IconStarSub } from "@components";
import { dateFormat } from "@configs";
import { INotifications } from "@interfaces";
import { Avatar } from "antd";
import moment from "moment";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
interface Iprops {
    customer: INotifications;
    callBack?: () => void;
}
const defaultAvatar = "/images/newUser/default-user.png";
export const ModuleMemberCard = (props: Iprops) => {
    const { customer } = props;
    const { t } = useTranslation();
    return (
        <StyledWrapper>
            <div className="close-layout" onClick={props.callBack}>
                <CloseSvg />
            </div>
            <StyledLayout>
                <div className="user-info">
                    <Avatar src={defaultAvatar} className="avatar" />
                    <p className="title">{customer.client_user.fullName}</p>
                    <div className="member-code">
                        {t("page.member_points.id", {
                            id: customer.historyDetail?.ticketCode,
                        })}
                    </div>
                </div>
                <div className="vertical-line"></div>
                <div className="user-contact">
                    <div className="info-item">
                        <p className="label">{t("page.redeem.points")}</p>
                        <div className="point">
                            <IconStarSub size={16} color={"red"} />
                            <p>
                                {customer.client_user?.balancePoint}
                                {t("page.member_points.points")}
                            </p>
                        </div>
                    </div>
                    <div className="info-item">
                        <p className="label">{t("page.redeem.tel")}</p>
                        <p className="value">{customer.client_user?.phoneNumber}</p>
                    </div>
                    <div className="info-item">
                        <p className="label">{t("page.redeem.email")}</p>
                        <p className="value">{customer.client_user?.email || "-"}</p>
                    </div>
                    <div className="info-item">
                        <p className="label">{t("page.redeem.birthday")}</p>
                        <p className="value">
                            {moment(customer.contactDetail?.dateOfBirth || "").format(dateFormat)}
                        </p>
                    </div>
                </div>
            </StyledLayout>
        </StyledWrapper>
    );
};
const CloseSvg = () => (
    <svg width="48" height="25" viewBox="0 0 48 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4.5L32 20.5" stroke="#646464" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 20.5L32 4.5" stroke="#646464" strokeWidth="2" strokeLinecap="round" />
    </svg>
);
const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: baseline;
    justify-content: space-between;
    border: 1px solid #e1e1e1;
    filter: drop-shadow(0px 3px 6px rgba(162, 162, 162, 0.16));
    border-radius: 8px;
    .close-layout {
        display: flex;
        width: 100%;
        background: #f7f7f8;
        justify-content: end;
        padding: 12px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        .close-layout {
            padding: 8px 12px;
            svg {
                width: 40px;
            }
        }
    }
`;
const StyledLayout = styled.div`
    width: 100%;
    background: #fff;
    display: flex;
    padding: 12px 20px;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;

    .user-info {
        flex: 2;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        p {
            margin: 0;
        }
        .avatar {
            width: 74px;
            height: 74px;
            display: flex;
            justify-content: center;
            padding: 4px;
            background: #f0f0f0;
            img {
                padding: 0px;
                border-radius: 22px;
                width: auto;
                height: auto;
            }
        }
    }
    .vertical-line {
        background: #fff;
        border-left: 1px dashed #e1e1e1;
        margin: 0 20px;
    }
    .user-contact {
        flex: 3;
        p {
            margin: 0;
        }
        .info-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
            .label {
                font-style: normal;
                font-weight: 700;
                font-size: 14px;
                line-height: 19px;
                color: #a5a5a5;
            }
            .value {
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
                color: #000000;
            }
        }
        .info-item:last-child {
            margin-bottom: 0;
        }
    }

    .point {
        display: flex;
        align-items: center;
        svg {
            width: 18px;
            height: 18px;
        }
        p {
            margin: 0;
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            display: flex;
            align-items: center;
            color: #f22f46;
            margin-left: 4px;
        }
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        flex-direction: column;
        .user-info {
            padding-bottom: 16px;
            border-bottom: 1px dashed #e1e1e1;
            .avatar {
                width: 42px;
                height: 42px;
                margin-bottom: 8px;
            }
            .title {
                font-style: normal;
                font-weight: 700;
                font-size: 14px;
                line-height: 19px;
                color: #000000;
            }
            .member-code {
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 16px;
                color: #646464;
            }
        }
        .user-contact {
            padding-top: 16px;
        }
        .value {
            font-weight: 400;
            font-size: 14px;
            line-height: 19px;
            display: flex;
            align-items: center;
            color: #646464;
        }
    }
`;
