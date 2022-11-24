import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { memo, useEffect } from "react";

import { logout, selectAuth } from "@redux";
import { PlanFeatureCheck, PlanFeatureClose } from "@components";

interface IProps {
    visible: boolean;
    onClose: () => void;
    handleUpgrade: () => void;
}

export const ModuleCurrentPlan = memo((props: IProps) => {
    // props
    const { visible, onClose, handleUpgrade } = props;
    // hook
    const { t } = useTranslation();
    const dispatch = useDispatch();
    // redux state
    const { plan } = useSelector(selectAuth);
    useEffect(() => {
        if (typeof plan === "string") {
            dispatch(logout());
        }
    }, [plan]);
    return (
        <StyledCurrentPlan
            onCancel={onClose}
            onOk={handleUpgrade}
            okText={t("page.upgrade")}
            visible={visible}
            title={t("page.current_plan")}
            centered={true}
        >
            <h4>{t("page.below_are_the_features_of_the_current_plan")}</h4>
            {plan && typeof plan !== "string" && (
                <div className="feature-field">
                    {plan?.reward.status ? (
                        <PlanFeatureCheck text={t("page.loyalty_points")} />
                    ) : (
                        <PlanFeatureClose text={t("page.loyalty_points")} />
                    )}
                    {plan?.coupon.status ? (
                        <PlanFeatureCheck text={t("page.coupons")} />
                    ) : (
                        <PlanFeatureClose text={t("page.coupons")} />
                    )}
                    {plan?.benefit.status ? (
                        <PlanFeatureCheck text={t("page.member_benefits")} />
                    ) : (
                        <PlanFeatureClose text={t("page.member_benefits")} />
                    )}
                    {plan?.memberShipTier ? (
                        <PlanFeatureCheck text={t("page.membership_tiering")} />
                    ) : (
                        <PlanFeatureClose text={t("page.membership_tiering")} />
                    )}
                    {plan?.customSignUp ? (
                        <PlanFeatureCheck text={t("page.custom_form")} />
                    ) : (
                        <PlanFeatureClose text={t("page.custom_form")} />
                    )}
                    {plan?.multiSignUp ? (
                        <PlanFeatureCheck text={t("page.multi_signup_method")} />
                    ) : (
                        <PlanFeatureClose text={t("page.multi_signup_method")} />
                    )}
                </div>
            )}
        </StyledCurrentPlan>
    );
});

const StyledCurrentPlan = styled(Modal)`
    .ant-modal-header {
        padding: 16px 4rem !important;
    }
    .ant-modal-body {
        padding: 2rem 4rem;
    }
    h4 {
        font-weight: 600;
        max-width: 300px;
        margin-bottom: 2rem;
    }
    .feature-field {
        .feature-item {
            margin: 12px 0;
            display: flex;
            align-items: center;
            p,
            svg {
                font-size: 16px;
            }
            p {
                margin-bottom: 0;
                color: ${(p) => p.theme.colors.fadedColor};
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            svg {
                margin-right: 16px;
            }
        }
        .item-check {
            svg {
                fill: #0263e0;
            }
        }
        .item-close {
            opacity: 0.5;
        }
    }
`;
