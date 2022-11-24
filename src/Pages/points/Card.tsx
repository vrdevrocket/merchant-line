import { IconStarSub } from "@components";
import { IContactDetail } from "@interfaces";
import { selectContact } from "@redux";
import { Avatar } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
interface Iprops {
    customer: IContactDetail;
    callBack?: () => void;
}
const defaultAvatar = "/images/newUser/default-user.png";
export const ModuleMemberCard = (props: Iprops) => {
    const { customer } = props;
    const { t } = useTranslation();
    const currentPoints = useSelector(selectContact).currentPoints;
    return (
        <StyledWrapper>
            <StyledLayout>
                <div className="user-info">
                    <Avatar src={customer.avatar || defaultAvatar} className="avatar" />
                    <div className="user-info-detail">
                        <div className="member-code">
                            {t("page.member_points.id", {
                                id: customer.memberCode,
                            })}
                        </div>
                        <p className="title">{customer.fullName}</p>
                        <p className="title">{customer.phoneNumber}</p>
                    </div>
                </div>
                <div className="point">
                    <IconStarSub size={16} color={"red"} />
                    <p>
                        {t("page.member_points.pts", {
                            point: currentPoints,
                        })}
                    </p>
                </div>
            </StyledLayout>
            <div className="left-icon" onClick={props.callBack}>
                <CloseSvg />
            </div>
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
    align-items: center;
    justify-content: space-between;
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        .left-icon {
            svg {
                width: 40px;
            }
        }
    }
`;
const StyledLayout = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 20px;
    background: #ffffff;
    border: 1px solid #e1e1e1;
    box-shadow: 0px 3px 6px rgba(162, 162, 162, 0.16);
    border-radius: 8px;
    flex: 9;
    .user-info {
        display: flex;
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
        .member-code {
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 16px;
            color: #646464;
        }
        .title {
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            color: #000000;
        }
        .user-info-detail {
            padding-left: 20px;
        }
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        padding: 16px;
        .user-info {
            .avatar {
                width: 36px;
                height: 36px;
            }
            .user-info-detail {
                padding-left: 8px;
                .member-code {
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 16px;
                    color: #646464;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    max-width: 116px;
                }
            }
        }
        .point {
            p {
                max-width: 130px;
                text-overflow: ellipsis;
                overflow: hidden;
            }
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
`;
