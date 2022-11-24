import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Skeleton, Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { merchantAPI } from "@api";
import { selectAuth, setLoading } from "@redux";
import { IMergeSettings } from "@interfaces";
import { enumMergeSetting, enumMergeSettingMatch } from "@configs";
import {
    SharedButtonDefault,
    StyledCancelButton,
    StyledCard,
    StyledSubmitButton,
} from "@components";
import { showErrorMessage, useNotify } from "@utils";

const initData: IMergeSettings = {
    isAutoMerge: false,
    match: enumMergeSettingMatch.and,
    isEmail: false,
    isLineId: false,
    isTel: false,
};

export const PageMergeSetting = () => {
    // page hook
    const { t } = useTranslation();
    const history = useHistory();
    const { success, error } = useNotify();
    const dispatch = useDispatch();
    // redux state
    const merchantId = useSelector(selectAuth).userInfo?.merchantId;
    // const initMergeSetting = useSelector(selectAuth).userInfo?.merchant.mergeSettings;

    // page state
    const [data, setData] = useState<IMergeSettings>(initData);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        getInitMerchant();
    }, []);

    const getInitMerchant = async () => {
        setIsLoading(true);
        await getMerchant();
        setIsLoading(false);
    };

    const getMerchant = async () => {
        if (merchantId) {
            const response = await merchantAPI.getMerchant(merchantId);
            if (response.data) setData(response.data.mergeSettings || initData);
        }
    };

    const submitMergeSetting = async () => {
        if (data) {
            dispatch(setLoading(true));
            try {
                await merchantAPI.mergeSetting(data);
                // dispatch(getInfo());
                await getMerchant();
                success(t("message.update.success"));
            } catch (err: any) {
                if (err.response) {
                    error(showErrorMessage(err.response));
                } else error(t("message.update.fail"));
            } finally {
                dispatch(setLoading(false));
            }
        } else error(t("message.update.fail"));
    };
    const handleBack = () => {
        history.goBack();
    };
    // change value of mergeSetting
    const handleSwitch = (value: boolean, key: enumMergeSetting) => {
        setData((prev) => ({ ...prev, [key]: value }));
    };
    const handleButton = (string: enumMergeSettingMatch) => {
        setData((prev) => ({ ...prev, match: string }));
    };

    return (
        <StyledContainer>
            <div className="page">
                <h3> {t("page.merge_settings")}</h3>

                <div className="body">
                    <div className="card-wrap">
                        <Skeleton
                            className="skeleton"
                            loading={isLoading}
                            active
                            paragraph={{ rows: 6 }}
                        >
                            <StyledCard>
                                <h4>{t("page.select_merge_metrics")}</h4>
                                <div className="label">
                                    <p className="title">{t("page.merge_method")}</p>
                                    <p className="faded-text">
                                        {t(
                                            "page.the_contact_will_be_merged_automatically_if_any_of_the_following_values_match_with_other_contacts"
                                        )}
                                    </p>
                                </div>
                                <div className="switch-field label">
                                    <Switch
                                        checked={data.isLineId}
                                        onChange={(e) => handleSwitch(e, enumMergeSetting.isLineId)}
                                    />
                                    <span>{t("page.LINE_User_ID")}</span>
                                </div>
                                <div className="switch-field label">
                                    <Switch
                                        checked={data.isTel}
                                        onChange={(e) => handleSwitch(e, enumMergeSetting.isTel)}
                                    />
                                    <span>{t("page.tel")}</span>
                                </div>
                                <div className="switch-field label">
                                    <Switch
                                        checked={data.isEmail}
                                        onChange={(e) => handleSwitch(e, enumMergeSetting.isEmail)}
                                    />
                                    <span>{t("page.email_address")}</span>
                                </div>
                                <div className="btn-field">
                                    <SharedButtonDefault
                                        text={t("page.and")}
                                        type="default"
                                        className={
                                            data.match === enumMergeSettingMatch.and
                                                ? "btn btn-choose"
                                                : "btn"
                                        }
                                        onClick={() => handleButton(enumMergeSettingMatch.and)}
                                    />
                                    <SharedButtonDefault
                                        text={t("page.or")}
                                        type="default"
                                        className={
                                            data.match === enumMergeSettingMatch.or
                                                ? "btn btn-or btn-choose"
                                                : "btn btn-or"
                                        }
                                        onClick={() => handleButton(enumMergeSettingMatch.or)}
                                    />
                                </div>
                                <div className="label">
                                    <p className="title">{t("page.activate")}</p>
                                    <div className="switch-field label ">
                                        <Switch
                                            checked={data.isAutoMerge}
                                            onChange={(e) =>
                                                handleSwitch(e, enumMergeSetting.isAutoMerge)
                                            }
                                        />
                                        <span>{t("page.auto_merge")}</span>
                                    </div>
                                </div>
                            </StyledCard>
                        </Skeleton>
                    </div>
                    <div className="btn-action-field">
                        <StyledSubmitButton
                            type="default"
                            text={t("page.save")}
                            onClick={submitMergeSetting}
                            // disable={isSubmitting}
                        />
                        <StyledCancelButton
                            type="sub"
                            text={t("page.cancel")}
                            htmlType="button"
                            onClick={handleBack}
                        />
                    </div>
                </div>
            </div>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    /* height: calc(100vh - ${(p) => p.theme.header.height}); */
    height: 84vh;
    padding: 3.5rem;
    overflow: auto;
    margin-bottom: 40px;
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

    .card-wrap {
        flex: 1;
        height: 500px;
    }
    h3 {
        font-weight: 700;
        font-size: 35px;
        margin-bottom: ${(p) => p.theme.margins.pageHeader};
        @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
            font-size: 28px;
        }
    }
    h4 {
        font-weight: 700;
        font-size: 25px;
        color: black;
        margin-bottom: 22px;
        @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
            font-size: 20px;
            margin-bottom: 18px;
        }
    }
    .label {
        .title {
            font-size: 16px;
        }
        .faded-text {
            color: #a5a5a5;
            font-size: 12px;
            font-weight: 400;
        }
    }
    .switch-field {
        display: flex;
        align-items: center;
        button {
            margin-right: 24px;
        }
        span {
            font-size: 16px;
        }
    }
    .btn-field {
        display: flex;
        margin-bottom: 32px;
        .btn {
            height: 33px;
            font-size: 16px;
            min-width: 62px;
            color: #646464;
            background-color: white;
            text-transform: uppercase;
        }
        .btn-choose {
            background-color: #646464;
            color: white;
        }
        .btn-or {
            margin-left: 8px;
        }
    }
    .btn-action-field {
        margin-top: 38px;
        display: flex;
        .btn {
            min-width: 118px;
            height: 49px;
            font-size: 16px;
        }
        .btn-save {
            color: white;
            background-color: #0263e0;
            border-color: #0263e0 !important;
        }
        .btn-cancel {
            margin-left: 9px;
            color: black;
            border-color: black !important;
        }
    }
    .body {
        flex: 1;
        overflow: auto;
        max-width: ${(p) => p.theme.maxWidths.cardWrap};
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
            @media (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
                display: none;
            }
        }

        ::-webkit-scrollbar-track {
            display: none;
        }

        ::-webkit-scrollbar-thumb {
            background: ${(p) => p.theme.colors.fadedText};
            border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
            cursor: grab;
        }
    }
    /* responsive */
    @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
        padding: 1.5rem;
    }
    /* skeleton */
    .skeleton {
        background-color: white;
        height: 100%;
        padding: 3.5rem;
    }
`;
