import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { IconCheck, IconNotCheck, SharedButtonSub } from "@components";
import { ICartPlan } from "@interfaces";
import { selectAuth, getInfo } from "@redux";
import { merchantAPI } from "@api";
import { enumStatus, PATH_CREATE_BUSINESS, PATH_HOME } from "@configs";
import { showErrorMessage, useNotify } from "@utils";

interface IProps {
    data: ICartPlan;
    setLoading: (status: boolean) => void;
}

export const ModuleCartChoosePlan = (props: IProps) => {
    //page props
    const { data, setLoading } = props;
    //page Hooks
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const { error } = useNotify();
    //redux state
    const { userInfo } = useSelector(selectAuth);
    const choosePlan = async () => {
        //TODO: Fake logic
        setLoading(true);

        if (userInfo && userInfo.merchantId) {
            try {
                const res = await merchantAPI.updateMerchantPlan(
                    userInfo.merchantId,
                    {
                        planExpires: 1,
                        isPaidPlan: true,
                    },
                    data._id || ""
                );
                if (res.data?.planId) {
                    await dispatch(getInfo());
                    history.push(PATH_CREATE_BUSINESS);
                    // history.push(PATH_HOME);
                }
            } catch (err: any) {
                if (err.response) {
                    error(showErrorMessage(err.response));
                } else error(t("message.error"));
            } finally {
                setLoading(false);
            }
        }
    };

    const chooseTrialPlan = async () => {
        setLoading(true);
        if (userInfo && userInfo.merchantId) {
            try {
                const res = await merchantAPI.updateTrialPlan(data?.trialPlan._id);

                if (res.data?.status === enumStatus.ACTIVE) {
                    await dispatch(getInfo());
                    history.push(PATH_HOME);
                }
            } catch (err: any) {
                if (err.response) {
                    error(showErrorMessage(err.response));
                } else error(t("message.error"));
            } finally {
                setLoading(false);
            }
        }
    };
    return (
        <StyledCartChoosePlan>
            <div className="title_children">{data.name}</div>
            <div className="month">
                {t("page.$")}
                {data.price}
                <span>/ {t("page._month")}</span>
            </div>
            <div className="desc">{t("page.desc")}</div>
            {data.plans.map((item, index) => {
                return (
                    <div className="ground_choose_plan " key={index}>
                        {item.status ? <IconCheck /> : <IconNotCheck />}{" "}
                        <span className={(!item.status && "notCheck") || ""}>{item.name} </span>
                    </div>
                );
            })}
            <div className="ground_btn">
                {data?.trialPlan?.status === "ACTIVE" && (
                    <SharedButtonSub
                        className="margin_right_12"
                        text={t("page.start_a_free_14_day_trial")}
                        type="textMain"
                        size="large"
                        onClick={chooseTrialPlan}
                    />
                )}
                <SharedButtonSub
                    className="margin_right_12"
                    text={t("page.choose_plan")}
                    type="default"
                    size="large"
                    onClick={choosePlan}
                />
            </div>
        </StyledCartChoosePlan>
    );
};

const StyledCartChoosePlan = styled.div`
    padding: 38px 36px;
    width: 100%;
    border: 1px solid #989898;
    border-radius: 4px;
    max-width: 100%;
    min-height: 750px;
    margin-bottom: 24px;
    position: relative;
    @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
        min-height: 710px;
    }
    .title_children {
        text-align: initial;
        font-style: normal;
        font-weight: bold;
        font-size: 30px;
        line-height: 40px;
        color: #333333;
        margin-bottom: 8px;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            font-size: 20px;
        }
    }
    .month {
        font-weight: normal;
        font-size: 32px;
        line-height: 43px;
        color: #333333;
        margin-bottom: 8px;
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            font-size: 22px;
        }
        span {
            display: inline-block;
            margin-left: 18px;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 19px;
            color: #333333;
            opacity: 0.6;
            position: relative;
            top: -2px;
            @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
                font-size: 12px;
            }
        }
    }
    .desc {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 19px;
        color: #333333;
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            font-size: 12px;
        }
    }
    .ground_choose_plan {
        display: flex;
        margin-top: 40px;
        text-align: center;
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            margin-top: 36px;
        }
        span {
            display: inline-block;
            margin-left: 24px;
            position: relative;
            top: 5px;
            text-align: left;
        }
        .notCheck {
            color: #999999;
        }
    }
    .ground_btn {
        width: 100%;
        padding: 38px 36px 0 36px;
        position: absolute;
        left: 0;
        bottom: 12px;
    }
`;
