import { memo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Switch } from "antd";
import styled from "styled-components";

import { IMembershipTier, IBenefitData } from "@interfaces";
import {
    SharedCKEditor,
    ComponentBenefitForm,
    ComponentBenefitPreview,
    StyledSubmitButton,
    StyledCancelButton,
    StyledCard,
} from "@components";
import { useYup } from "@validations";
import { selectAuth, setLoading } from "@redux";
import { ModuleUploadImage } from "@modules";
import { showErrorMessage, useNotify } from "@utils";
import { ALL_SELECT, BIRTH_MONTH, enumStatus, PATH_BENEFITS, PATH_BENEFITS_CREATE } from "@configs";
import { benefitAPI } from "@api";

interface IProps {
    benefit: IBenefitData;
}

export const ModuleBenefitForm = memo((props: IProps) => {
    //hook
    const { YupBenefit } = useYup();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const { error, success } = useNotify();
    //page props
    const { benefit } = props;
    // page state

    //redux states
    const membershipTiers: IMembershipTier[] =
        useSelector(selectAuth).userInfo?.merchant?.membershipTiers || [];
    // const themeColor: string = useSelector(selectAuth).userInfo?.merchant?.themeColor || "";
    //page variable
    const pathName = window.location.pathname;
    const createCouponSchema = Yup.object().shape(YupBenefit);
    const membershipTierSelect: IMembershipTier[] = membershipTiers.filter((membershipTier) => {
        if (!membershipTier.isDefault) return membershipTier;
    });

    const handleRewardSubmit = async (values: IBenefitData) => {
        dispatch(setLoading(true));
        if (values.birthMonths?.includes(ALL_SELECT)) values.birthMonths = [];
        if (values.levelIds?.includes(ALL_SELECT)) values.levelIds = [];
        values.quantity = values.quantity || undefined;
        values.quantityUnit = values.quantityUnit || "";
        values.limit = values.limit || undefined;
        values.limitUnit = values.limitUnit || "";
        try {
            if (pathName === PATH_BENEFITS_CREATE) {
                await benefitAPI.create(values);
                success(t("message.create.success"));
                history.push(PATH_BENEFITS);
            } else {
                await benefitAPI.update(id, values);
                success(t("message.update.success"));
                history.push(PATH_BENEFITS);
            }
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.error"));
            dispatch(setLoading(false));
        }
    };

    const handleCancel = () => {
        history.push(PATH_BENEFITS);
    };

    const { values, handleChange, handleBlur, handleSubmit, errors, touched, setFieldValue } =
        useFormik({
            initialValues: benefit,
            validationSchema: createCouponSchema,
            enableReinitialize: true,
            onSubmit: handleRewardSubmit,
        });

    const handleChangeStatus = (e: boolean) => {
        setFieldValue("status", e ? enumStatus.ACTIVE : enumStatus.INACTIVE);
    };

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
    const changeSelectQuantityUnit = (value: string) => {
        setFieldValue("quantityUnit", value);
    };
    const changeSelectLimitUnit = (value: string) => {
        setFieldValue("limitUnit", value);
    };
    const handleChangeBirthMonth = (value: string[]) => {
        const isCheckAll = value.some((item) => item === ALL_SELECT);
        const birthMonths = isCheckAll ? [ALL_SELECT] : [...value];
        setFieldValue("birthMonths", birthMonths);
    };

    const handleUploadImage = (images: string[]) => {
        setFieldValue("imageUrl", [...images]);
    };

    //WHY: CK EDITOR SUCK
    const handleChangeGuideLine = (event: any, editors: any) => {
        const data = editors.getData();
        setFieldValue("description", data);
    };

    return (
        <div className="form-wrap">
            <form onSubmit={handleSubmit}>
                <div className="page-header">
                    <h3>
                        {pathName.includes(PATH_BENEFITS_CREATE)
                            ? t("page.create_benefit")
                            : t("page.edit_benefit")}
                    </h3>
                </div>
                {/* form basic setting */}
                <div className="page-body">
                    <div className="card-wrap">
                        <ComponentBenefitForm
                            benefit={values}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            errors={errors}
                            touched={touched}
                            dataMemberShip={membershipTierSelect}
                            dataBirthMonth={BIRTH_MONTH}
                            changeSelectMembership={handleChangeMembership}
                            changeSelectQuantityUnit={changeSelectQuantityUnit}
                            changeSelectLimitUnit={changeSelectLimitUnit}
                            changeSelectBirthMonth={handleChangeBirthMonth}
                            handleChangeDateFrom={handleChangeDateFrom}
                            handleChangeDateTo={handleChangeDateTo}
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
                                editor={values.description || ""}
                                handleChangeEditor={handleChangeGuideLine}
                                name="description"
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
                    {/* button submit */}
                    <div className="btn-layout">
                        <StyledSubmitButton
                            type="default"
                            text={t("page.save")}
                            htmlType="submit"
                            // disable={isSubmitting}
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
            <ComponentBenefitPreview
                name={values.name}
                images={values.imageUrl}
                desc={values.description}
                memberships={values.levelIds}
                memberShipTiers={membershipTiers}
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
