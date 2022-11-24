import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Button, Tooltip } from "antd";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import { StyledCard, PlanFeatureCheck, PlanFeatureClose, SharedButtonSub } from "@components";
import { selectAuth } from "@redux";
import { PATH_CHOOSE_PLAN } from "@configs";

export const PageFeatureSetting = () => {
    //hook
    const { t } = useTranslation();
    const history = useHistory();
    // redux states
    const { plan } = useSelector(selectAuth);

    // variable
    const nameLength = 50;

    const gotoChoosePlan = useCallback(() => {
        history.push(PATH_CHOOSE_PLAN);
    }, []);
    const handleBack = useCallback(() => {
        history.goBack();
    }, []);
    return (
        <StyledContainer>
            <div className="page">
                <h3>{t("page.features_settings")}</h3>
                <div className="main">
                    <div className="card-wrap">
                        <StyledCard>
                            <h4>{t("page.plan_settings")}</h4>
                            <div className="you-are-on">{t("page.you_are_on")}</div>
                            <div className="button-field">
                                <Tooltip
                                    title={
                                        plan?.name && plan?.name.length > nameLength && plan?.name
                                    }
                                >
                                    <Button className="current-plan" disabled={true}>
                                        {plan?.name && plan?.name.length > nameLength
                                            ? plan?.name.substring(0, nameLength - 1) + "..."
                                            : plan?.name}
                                    </Button>
                                </Tooltip>
                                <Button
                                    type="primary"
                                    className="btn-action"
                                    onClick={gotoChoosePlan}
                                >
                                    {t("page.upgrade")}
                                </Button>
                            </div>
                        </StyledCard>
                    </div>
                    <div className="card-wrap">
                        <StyledCard>
                            <h4>{t("page.plan_features")}</h4>
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
                        </StyledCard>
                    </div>
                </div>
                <div className="button-field">
                    <SharedButtonSub
                        text={t("page.back")}
                        type="default"
                        className="btn-action"
                        onClick={handleBack}
                    />
                </div>
            </div>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    overflow: auto;
    /* height: calc(100vh - 54px); */
    height: 84vh;
    display: flex;
    flex-direction: column;
    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }

    ::-webkit-scrollbar-track {
        display: none;
    }

    ::-webkit-scrollbar-thumb {
        background: ${(p) => p.theme.colors.fadedText};
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #807c7c;
        cursor: grab !important;
    }
    @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
        ::-webkit-scrollbar {
            display: none;
        }
    }
    .main {
        max-width: 730px;
        flex: 1;
    }
    h3 {
        font-weight: 700;
        font-size: 35px;
        margin-bottom: ${(p) => p.theme.margins.pageHeader};
    }
    h4 {
        font-weight: 700;
        font-size: 25px;
        color: black;
        margin-bottom: 22px;
        @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
            /* font-size: 20px; */
            margin-bottom: 18px;
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            color: #000000;
        }
    }
    padding: 3.5rem;
    @media screen and (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        padding: 16px;
    }
    .card-wrap {
        margin-bottom: 28px;
    }
    .you-are-on {
        font-size: 16px;
        font-weight: 500;
    }
    .button-field {
        margin-top: 12px;
    }
    button {
        min-width: 118px;
        height: ${(p) => p.theme.heights.button};
        font-size: 16px;
        font-weight: 500;
    }
    .current-plan {
        margin-right: 12px;
        span {
            cursor: inherit;
            max-width: 200px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            display: block;
        }
    }
    .btn-action {
        background-color: #0263e0;
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
                -webkit-line-clamp: 2;
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
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        .page {
            h3 {
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 22px;
                color: #000000;
            }
            .button-field {
                display: flex;
                column-gap: 10px;
                margin-bottom: 60px;
                .current-plan {
                    display: inline-block;
                    flex: 1;
                    margin-right: 0;
                    button {
                        width: 100%;
                        min-width: 100%;
                    }
                }
                .btn-action {
                    flex: 1;
                }
            }
        }
    }
`;
