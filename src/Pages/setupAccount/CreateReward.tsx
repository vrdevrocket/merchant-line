import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Row, Col, Input } from "antd";
import { showErrorMessage, theme } from "@utils";
import { IRewardData } from "@interfaces";
import {
    StyledCancelButton,
    StyledSubmitButton,
    FormHeader,
    SharedInput,
    NewComponentRewardPreview,
    ModuleNewUploadImage,
} from "@components";
import { useYup } from "@validations";
import { setLoading } from "@redux";

import {
    ALL_SELECT,
    enumStatus,
    enumLength,
    PATH_REWARD_LIST,
    PATH_CREATE_REWARD,
    new_account_step,
    enumValidation,
} from "@configs";
import { rewardAPI } from "@api";
import { useRandomCode, useNotify } from "@utils";

const newDate = new Date();
const initData: IRewardData = {
    name: "",
    limit: undefined,
    code: useRandomCode(enumLength.CODE),
    point: undefined,
    levelIds: [ALL_SELECT],
    birthMonths: [ALL_SELECT],
    startDate: new Date(),
    // endDate: new Date(newDate.setMonth(newDate.getMonth() + 1)),
    endDate: new Date(newDate.setFullYear(newDate.getFullYear() + 1)),
    description: "",
    status: enumStatus.INACTIVE,
    imageUrl: [],
    variants: [],
};
const { TextArea } = Input;
export const CreateReward = () => {
    //hook
    const { YupReward } = useYup();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const { error, success } = useNotify();
    //page variable
    const pathName = window.location.pathname;
    const createCouponSchema = Yup.object().shape(YupReward);

    const handleRewardSubmit = async (values: IRewardData) => {
        dispatch(setLoading(true));
        try {
            if (values.birthMonths?.includes(ALL_SELECT)) values.birthMonths = [];
            if (values.levelIds?.includes(ALL_SELECT)) values.levelIds = [];
            values.quantity = values.quantity || undefined;
            values.limit = values.limit || undefined;
            if (pathName === PATH_CREATE_REWARD) {
                await rewardAPI.create(values);
                success(t("message.create.success"));
                history.push(PATH_REWARD_LIST);
            }
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.update.fail"));
            dispatch(setLoading(false));
            // history.push(PATH_REWARD_LIST);
        }
    };
    const gotoFullMode = () => {
        history.push(PATH_REWARD_LIST);
    };

    const { values, handleChange, handleBlur, handleSubmit, errors, touched, setFieldValue } =
        useFormik({
            initialValues: initData,
            validationSchema: createCouponSchema,
            enableReinitialize: true,
            onSubmit: handleRewardSubmit,
        });

    const handleUploadImage = (images: string[]) => {
        setFieldValue("imageUrl", [...images]);
    };

    const handleChangeDesc = (e) => {
        setFieldValue("description", e.target.value);
    };

    return (
        <StyledLayout>
            <div className="form-wrap">
                <div className="flex-layout">
                    <div className="left">
                        <FormHeader current={1} stepLen={new_account_step} />
                        <div className="page-header">
                            <h3>{t("page.create_reward")}</h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            {/* form basic setting */}
                            <div className="page-body">
                                <div className="card-wrap">
                                    <div className="input-name-field">
                                        <SharedInput
                                            label={t("page.reward_name")}
                                            // descLabel={t("page._2_100_characters")}
                                            name="name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.name}
                                            errors={errors.name}
                                            touched={touched.name}
                                            parentClassName="mb-6"
                                            placeholder=""
                                        />
                                        {!!values.name && (
                                            <span className="text-length">
                                                {values.name?.length}
                                                <span className="limit-text">
                                                    /{enumValidation.MAX_50}
                                                </span>
                                            </span>
                                        )}
                                    </div>
                                    <Row gutter={16}>
                                        <Col sm={24} md={12}>
                                            <SharedInput
                                                label={t("page.points")}
                                                name="point"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.point}
                                                errors={errors.point}
                                                touched={touched.point}
                                                type="number"
                                                parentClassName="mb-6 eng"
                                                placeholder="10"
                                            />
                                        </Col>
                                        <Col sm={24} md={12}>
                                            <SharedInput
                                                label={t("page.quantity_limit_user")}
                                                name="limit"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.limit}
                                                errors={errors.limit}
                                                touched={touched.limit}
                                                type="number"
                                                parentClassName="mb-6 eng"
                                                placeholder="10"
                                            />
                                        </Col>
                                    </Row>
                                </div>

                                {/* Image */}
                                <div className="card-wrap">
                                    <StyledNewCard>
                                        <ModuleNewUploadImage
                                            images={values.imageUrl}
                                            handleGetImage={handleUploadImage}
                                        />
                                    </StyledNewCard>
                                </div>

                                {/* editor */}
                                <div className="card-wrap">
                                    <StyledNewCard>
                                        <div className="title">
                                            {t("page.descriptions")}
                                            <span>{t("page._2_2000_characters")}</span>
                                        </div>
                                        <StyledTextArea>
                                            <TextArea
                                                name="description"
                                                onChange={handleChangeDesc}
                                                rows={4}
                                                placeholder="your reward description"
                                                maxLength={2000}
                                            />
                                            {!!values.description && (
                                                <span className="text-count">
                                                    {values.description?.length}
                                                    <span className="limit-text">/2000</span>
                                                </span>
                                            )}
                                        </StyledTextArea>
                                    </StyledNewCard>
                                </div>
                                {/* button submit */}
                                <div className="btn-layout">
                                    <StyledCancelButton
                                        type="sub"
                                        text={t("page.new_account.do_later")}
                                        htmlType="button"
                                        className="btn-later"
                                        onClick={gotoFullMode}
                                    />
                                    <StyledSubmitButton
                                        type="default"
                                        text={t("page.continue")}
                                        htmlType="submit"
                                        className="btn-continue"
                                        // disable={isSubmitting}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* preview */}
                    <div className="right">
                        <NewComponentRewardPreview
                            name={values.name}
                            variants={values.variants}
                            limit={values.limit}
                            images={values.imageUrl}
                            desc={values.description || ""}
                            quantity={values.quantity}
                            points={values.point}
                        />
                    </div>
                </div>
            </div>
        </StyledLayout>
    );
};
const StyledTextArea = styled.div`
    position: relative;
    textarea {
        border-radius: 6px;
        padding: 12px;
    }
    .text-count {
        position: absolute;
        bottom: 10px;
        right: 10px;
        .limit-text {
            padding-left: 2px;
            color: #d9d9d9;
        }
    }
`;
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
        @media (max-width: ${theme.breakPoints.breakOnlyMobile}) {
            flex-direction: column;
            align-items: unset;
        }
        .left {
            flex: 3;
        }
        .right {
            background-color: #fff;
            flex: 2;
        }
    }
    .card-wrap {
        margin-bottom: 20px;
        .title {
            margin: 10px 0;
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
    .input-name-field {
        position: relative;
        .text-length {
            position: absolute;
            right: 8px;
            bottom: 28px;
            .limit-text {
                color: #d9d9d9;
                padding-left: 2px;
            }
        }
    }
`;

const StyledNewCard = styled.div<{ maxWidth?: string }>`
    /* padding: 3.5rem; */
    border-radius: 4px;
    background-color: white;
    max-width: 707px;
    max-width: ${(p) => p.maxWidth};
    .devider {
        padding-top: 48px;
        /* @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
            display: none;
        } */
    }
    .title {
        font-weight: 700;
        font-size: 16px;
        line-height: 1.5em;
        color: #000000;
        margin-bottom: 32px;
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobile}) {
            font-size: 20px;
        }
        span {
            font-weight: normal;
            font-size: 12px;
            line-height: 16px;
            color: #6c7084;
            display: inline-block;
            margin-left: 12px;
        }
    }
    h3 {
        font-weight: 600;
        font-size: 25px;
        line-height: 1.5em;
        color: #000000;
        margin-bottom: 32px;
    }
    .fit-content {
        width: 320px;
        min-width: fit-content;
        &:hover .line {
            visibility: visible;
        }
    }
    .label {
        margin-bottom: 20px;
        p {
            font-weight: 600;
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .line {
            height: 1px;
            width: calc(100% - 30px);
            background-color: ${(p) => p.theme.colors.fadedText};
            visibility: hidden;
        }
        .title {
            font-size: 12px;
            color: ${(p) => p.theme.colors.fadedText};
            margin-bottom: 5px;
            font-weight: 900;
            text-transform: uppercase;
        }
        .content {
            font-size: 16px;
            color: black;
        }
        .input-change-name {
            &:hover .icon-edit-name {
                visibility: visible;
            }
            .icon-edit-name {
                visibility: hidden;
                cursor: pointer;
                padding: 8px;
            }
            width: 100%;
            input {
                font-weight: 600;
                padding-left: 0;
                border: none;
                font-size: 16px;
                color: black;
                /* color: ${(p) => p.theme.colors.fadedText}; */
                &:focus,
                :active,
                :focus-visible {
                    border: none !important;
                    border-width: 0 !important;
                }
            }
        }
    }
    .button-field {
        display: flex;
    }
    .current-tags {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
`;
