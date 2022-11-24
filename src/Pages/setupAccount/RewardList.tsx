import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
    FormHeader,
    NewRewardItem,
    AddPlus,
    StyledCancelButton,
    StyledSubmitButton,
    ManageReward,
} from "@components";
import { theme } from "@utils";
import { useHistory } from "react-router";

import { setLoading } from "@redux";
import {
    INITIAL_LIST_PARAMS,
    new_account_step,
    PATH_CREATE_REWARD,
    PATH_LOYALTY_RULES,
} from "@configs";
import { useDispatch } from "react-redux";
import { IDefaultListParam, IRewardData } from "@interfaces";
import { rewardAPI } from "@api";

export const RewardList = () => {
    const [listData, setListData] = useState<IRewardData[]>([]);
    const { t } = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        getRewards();
    }, []);
    // FETCH LIST API
    const getRewards = async () => {
        dispatch(setLoading(true));
        await fetchRewards(INITIAL_LIST_PARAMS);
        dispatch(setLoading(false));
    };
    const fetchRewards = async (fParams: IDefaultListParam) => {
        const response = await rewardAPI.getList(fParams);
        if (response?.data?.docs) {
            setListData(response.data.docs);
        } else {
            setListData([]);
        }
    };

    const handleGoNext = () => {
        history.push(PATH_LOYALTY_RULES);
    };
    const gotoAddReward = () => {
        history.push(PATH_CREATE_REWARD);
    };
    return (
        <StyledLayout>
            <div className="form-wrap">
                <div className="flex-layout">
                    <div className="left">
                        <FormHeader current={1} stepLen={new_account_step} />
                        <div className="page-header">
                            <h3>{t("page.new_account.reward_list")}</h3>
                        </div>
                        {listData.map((item, index) => (
                            <NewRewardItem data={item} key={index} />
                        ))}
                        <div className="add-reward">
                            <p onClick={gotoAddReward}>
                                <AddPlus />
                                {t("page.new_account.add_more")}
                            </p>
                        </div>

                        <div className="btn-layout">
                            <StyledCancelButton
                                type="sub"
                                text={t("page.new_account.do_later")}
                                htmlType="button"
                                className="btn-later"
                                onClick={handleGoNext}
                            />
                            <StyledSubmitButton
                                type="default"
                                text={t("page.continue")}
                                className="btn-continue"
                                onClick={handleGoNext}
                            />
                        </div>
                    </div>
                    <div className="right">
                        <div>
                            <ManageReward />
                        </div>
                        <div className="des-layout">
                            <h4>{t("page.new_account.manage_reward")}</h4>
                            <p>{t("page.new_account.manage_reward_des")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </StyledLayout>
    );
};

const StyledLayout = styled.div`
    .page-header {
        h3 {
            font-style: normal;
            font-weight: 700;
            font-size: 35px;
            line-height: 48px;
            color: #000000;
            margin-top: 48px;
            margin-bottom: 30px;
        }
    }
    .flex-layout {
        display: flex;
        align-items: flex-start;
        @media (max-width: ${theme.breakPoints.breakOnlyMobile}) {
            flex-direction: column;
            align-items: unset;
        }
        .left {
            flex: 3;
            margin-right: 40px;
            .add-reward {
                display: flex;
                align-items: center;
                p {
                    cursor: pointer;
                    text-decoration: none;
                    color: ${theme.colors.main};
                    align-items: center;
                    font-weight: bold;
                    margin-bottom: 0;
                    svg {
                        margin-right: 4px;
                    }
                }
            }
        }
        .right {
            flex: 2;
            display: flex;
            align-items: center;
            margin-left: 40px;
            margin-top: 10rem;
            flex-direction: column;
            text-align: center;
            @media (max-width: ${theme.breakPoints.breakOnlyMobile}) {
                flex-direction: column;
                align-items: unset;
            }
            .des-layout {
                padding: 0 50px;
            }
            h4 {
                font-style: normal;
                font-weight: 700;
                font-size: 35px;
                line-height: 48px;

                color: #23262f;
            }
            p {
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 19px;
                color: #777e91;
            }
            img {
                width: 335px;
                height: 356px;
            }
        }
    }
    .card-wrap {
        margin-bottom: 20px;
        .title {
            margin: 10px;
        }
    }
    .btn-layout {
        display: flex;
        justify-content: end;
        .btn-later {
            margin-right: 16px;
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            color: black;
            border: 0;
            @media (max-width: ${theme.breakPoints.breakOnlyMobile}) {
                font-size: inherit;
            }
        }
        .btn-continue {
            font-weight: bold;
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            border: 1px solid #0263e0;
            margin-right: 0;
        }
    }
`;
