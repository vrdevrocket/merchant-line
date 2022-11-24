import { memo, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Switch } from "antd";

import { IMembershipTier, IRewardData, IVariant } from "@interfaces";
import {
    SharedCKEditor,
    ComponentRewardForm,
    ComponentRewardPreview,
    StyledCard,
    StyledCancelButton,
    StyledSubmitButton,
} from "@components";
import { useYup } from "@validations";
import { selectAuth, setLoading } from "@redux";
import { ModuleUploadImage, ModuleRewardAddVariant } from "@modules";

import { BIRTH_MONTH, PATH_REWARDS, PATH_REWARDS_CREATE, ALL_SELECT, enumStatus } from "@configs";
import { rewardAPI } from "@api";
import { showErrorMessage, useNotify } from "@utils";

interface IProps {
    reward: IRewardData;
}

export const ModuleRewardForm = memo((props: IProps) => {
    //hook
    const { YupReward } = useYup();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const { error, success } = useNotify();
    //page props
    const { reward } = props;
    // page state
    const [showAddVariant, setShowAddVariant] = useState<boolean>(false);
    //redux states
    const membershipTiers: IMembershipTier[] =
        useSelector(selectAuth).userInfo?.merchant?.membershipTiers || [];
    //page variable
    const pathName = window.location.pathname;
    const createCouponSchema = Yup.object().shape(YupReward);
    const membershipTierSelect: IMembershipTier[] = membershipTiers.filter((membershipTier) => {
        if (!membershipTier.isDefault) return membershipTier;
    });

    const handleRewardSubmit = async (values: IRewardData) => {
        dispatch(setLoading(true));
        try {
            if (values.birthMonths?.includes(ALL_SELECT)) values.birthMonths = [];
            if (values.levelIds?.includes(ALL_SELECT)) values.levelIds = [];
            values.quantity = values.quantity || undefined;
            values.limit = values.limit || undefined;
            if (pathName === PATH_REWARDS_CREATE) {
                await rewardAPI.create(values);
                success(t("message.create.success"));
                history.push(PATH_REWARDS);
            } else {
                await rewardAPI.update(id, values);
                success(t("message.update.success"));
                history.push(PATH_REWARDS);
            }
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.update.fail"));
            dispatch(setLoading(false));
        }
    };

    const handleCancel = () => {
        history.push(PATH_REWARDS);
    };

    // add-variants
    const closeDrawer = () => {
        setShowAddVariant(false);
    };
    const handleRemoveVariant = (value: IVariant) => {
        const arr = values.variants.filter((item) => item._id !== value._id);
        setFieldValue("variants", arr);
    };
    const handleAddVariant = () => {
        setShowAddVariant(true);
    };

    const callbackAddVariant = (value: IVariant[]) => {
        // setFieldValue("variants", [...value.map((item) => JSON.parse(item))]);

        setFieldValue("variants", [
            ...value.map((item) => {
                //@ts-ignore
                return { _id: item._id, name: item.name };
            }),
        ]);
    };

    const createNewVariant = (value: IVariant) => {
        setFieldValue("variants", [...values.variants, value]);
    };

    const { values, handleChange, handleBlur, handleSubmit, errors, touched, setFieldValue } =
        useFormik({
            initialValues: reward,
            validationSchema: createCouponSchema,
            enableReinitialize: true,
            onSubmit: handleRewardSubmit,
        });

    const handleChangeDateFrom = (date: Date | string) => {
        setFieldValue("startDate", date);
    };

    const handleChangeDateTo = (date: Date | string) => {
        setFieldValue("endDate", date);
    };

    const handleChangeMembership = (leverIdValues: string[]) => {
        const isCheckAll = leverIdValues.some((value) => value === ALL_SELECT);
        const leverIds = isCheckAll ? [ALL_SELECT] : [...leverIdValues];
        setFieldValue("levelIds", leverIds);
    };

    const handleChangeBirthMonth = (value: string[]) => {
        const isCheckAll = value.some((item) => item === ALL_SELECT);
        const birthMonths = isCheckAll ? [ALL_SELECT] : [...value];
        setFieldValue("birthMonths", birthMonths);
    };

    const handleUploadImage = (images: string[]) => {
        setFieldValue("imageUrl", [...images]);
    };

    const handleChangeStatus = (e: boolean) => {
        setFieldValue("status", e ? enumStatus.ACTIVE : enumStatus.INACTIVE);
    };

    //WHY: CK EDITOR SUCK
    const handleChangeGuideLine = (event: any, editors: any) => {
        const data = editors.getData();
        setFieldValue("description", data);
    };

    return (
        <div className="form-wrap">
            <ModuleRewardAddVariant
                visible={showAddVariant}
                handleClose={closeDrawer}
                initVariants={values.variants}
                callbackData={callbackAddVariant}
                createData={createNewVariant}
            />
            <form onSubmit={handleSubmit}>
                <div className="page-header">
                    <h3>
                        {pathName.includes(PATH_REWARDS_CREATE)
                            ? t("page.create_reward")
                            : t("page.edit_rewards")}
                    </h3>
                </div>
                {/* form basic setting */}
                <div className="page-body">
                    <div className="card-wrap">
                        <ComponentRewardForm
                            reward={values}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            errors={errors}
                            touched={touched}
                            dataMemberShip={membershipTierSelect}
                            dataBirthMonth={BIRTH_MONTH}
                            changeSelectMembership={handleChangeMembership}
                            changeSelectBirthMonth={handleChangeBirthMonth}
                            handleChangeDateFrom={handleChangeDateFrom}
                            handleChangeDateTo={handleChangeDateTo}
                            handleAddVariant={handleAddVariant}
                            handleRemoveVariant={handleRemoveVariant}
                        />
                    </div>

                    {/* Image */}
                    <div className="card-wrap">
                        <StyledCard>
                            <ModuleUploadImage
                                images={values.imageUrl}
                                handleGetImage={handleUploadImage}
                            />
                        </StyledCard>
                    </div>

                    {/* editor */}
                    <div className="card-wrap">
                        <StyledCard>
                            <div className="title">
                                {t("page.descriptions")}
                                <span>{t("page._2_2000_characters")}</span>
                            </div>
                            <SharedCKEditor
                                name="description"
                                editor={values.description || ""}
                                handleChangeEditor={handleChangeGuideLine}
                                errors={errors.description}
                                touched={touched.description}
                            />
                        </StyledCard>
                    </div>
                    <StyledSwitch className="switch-field">
                        <p>{t("page.activate")}</p>
                        <Switch
                            checked={values.status === enumStatus.ACTIVE ? true : false}
                            onChange={handleChangeStatus}
                        />
                    </StyledSwitch>
                    <div className="btn-layout">
                        <StyledSubmitButton
                            type="default"
                            text={t("page.save")}
                            htmlType="submit"
                        />
                        <StyledCancelButton
                            type="sub"
                            text={t("page.cancel")}
                            htmlType="button"
                            onClick={handleCancel}
                        />
                    </div>
                </div>
            </form>
            {/* preview */}
            <ComponentRewardPreview
                name={values.name}
                variants={values.variants}
                limit={values.limit}
                images={values.imageUrl}
                desc={values.description || ""}
                quantity={values.quantity}
                points={values.point}
            />
        </div>
    );
});

const StyledSwitch = styled.div`
    display: flex;
    align-items: center;
    p {
        margin-bottom: 0;
    }
`;
