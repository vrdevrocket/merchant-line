import { memo, useCallback, useState } from "react";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Skeleton } from "@mui/material";
import { Switch, Tooltip } from "antd";

import { ICoupon, IMembershipTier, ISelect } from "@interfaces";
import { selectAuth, setLoading } from "@redux";
import {
    ComponentCouponsForm,
    SharedCKEditor,
    SharedInput,
    IconCopy,
    ComponentQRCode,
    ComponentCouponPreview,
    StyledSubmitButton,
    StyledCancelButton,
    StyledCard,
    StyledSwitch,
} from "@components";
import { useYup } from "@validations";
import { ModuleUploadImage } from "@modules";
import {
    ALL_SELECT,
    enumStatus,
    FIXED,
    PATH_COUPON,
    PATH_COUPON_CREATE,
    PERCENTAGE,
} from "@configs";
import { couponAPI } from "@api";

import { copyText, showErrorMessage, useNotify } from "@utils";

interface IProps {
    coupon: ICoupon;
}

export const ModuleCouponsFrom = memo((props: IProps) => {
    //hook
    const { YupCoupon } = useYup();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const { success, error } = useNotify();
    //page props
    const { coupon } = props;
    //redux states
    const membershipTiers: IMembershipTier[] =
        useSelector(selectAuth).userInfo?.merchant?.membershipTiers || [];
    //page state
    const [isCopy, setIsCopy] = useState<{ status: boolean; value: number }>({
        status: false,
        value: 0,
    });
    //page variable
    const createCouponSchema = Yup.object().shape(YupCoupon);
    const membershipTierSelect: IMembershipTier[] = membershipTiers.filter((membershipTier) => {
        if (!membershipTier.isDefault) return membershipTier;
    });
    const pathName = window.location.pathname;
    const couponLink = `${process.env.REACT_APP_CLIENT_URL}/coupon/${coupon.qrToken}`;
    const couponUnit: ISelect[] = [
        {
            id: FIXED,
            label: FIXED,
        },
        {
            id: PERCENTAGE,
            label: PERCENTAGE,
        },
    ];

    const handleCouponSubmit = async (
        values: ICoupon,
        { setSubmitting }: FormikHelpers<ICoupon>
    ) => {
        try {
            setSubmitting(true);
            dispatch(setLoading(true));
            const levelIds = values.levelIds?.includes(ALL_SELECT) ? [] : values.levelIds;

            if (coupon._id) {
                const res = await couponAPI.updateCouponById(coupon._id, {
                    ...values,
                    levelIds,
                    quantity: values.quantity ? +values.quantity : undefined,
                    limit: values.limit ? +values.limit : undefined,
                    benefit: values.benefit ? +values.benefit : undefined,
                    unit: values.unit?.toString(),
                });
                if (res) {
                    success(t("message.update.success"));
                }
            } else {
                const res = await couponAPI.createCoupon({
                    ...values,
                    levelIds,
                    quantity: values.quantity ? +values.quantity : undefined,
                    limit: values.limit ? +values.limit : undefined,
                    benefit: values.benefit ? +values.benefit : undefined,
                    unit: values.unit?.toString(),
                });
                if (res.data.message) {
                    success(res.data.message);
                }
            }
            history.push(PATH_COUPON);
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.update.fail"));
            dispatch(setLoading(false));
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = () => {
        history.push(PATH_COUPON);
    };

    const {
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        errors,
        touched,
        setFieldValue,
    } = useFormik({
        initialValues: coupon,
        validationSchema: createCouponSchema,
        onSubmit: handleCouponSubmit,
        enableReinitialize: true,
    });

    const handleChangeDateFrom = (date: Date | string | null) => {
        setFieldValue("startDate", date);
    };

    const handleChangeDateTo = (date: Date | string | null) => {
        setFieldValue("endDate", date);
    };

    const handleChangeCouponUnit = (unit: string) => {
        setFieldValue("unit", unit);
    };

    // useEffect(() => console.log(errors), [errors]);

    const handleChangeMembership = (leverIdValues: string[]) => {
        const isCheckAll = leverIdValues.some((value) => value === ALL_SELECT);
        const leverIds = isCheckAll ? [ALL_SELECT] : [...leverIdValues];

        setFieldValue("levelIds", [...leverIds]);
    };

    const handleUploadImage = (images: string[]) => {
        setFieldValue("imageUrl", [...images]);
    };

    //WHY: CK EDITOR SUCK
    const handleChangeGuideLine = (event: any, editors: any) => {
        const data = editors.getData();
        setFieldValue("guideline", data);
    };
    const handleChangeActive = (checked: boolean) => {
        setFieldValue("status", checked ? enumStatus.ACTIVE : enumStatus.INACTIVE);
    };

    const showTooltipCopy = (value: number) => {
        setIsCopy({ status: true, value: value });
        setTimeout(() => setIsCopy({ status: false, value: 0 }), 5000);
    };

    const handleCopyText = useCallback(() => {
        copyText(couponLink, () => showTooltipCopy(1));
    }, [couponLink]);

    const handleChangeDisplayStatus = (status: boolean) => {
        setFieldValue("isDisplayed", status ? enumStatus.ACTIVE : enumStatus.INACTIVE);
    };

    return (
        <div className="form-wrap">
            <form onSubmit={handleSubmit}>
                <div className="page-header">
                    <h3>
                        {pathName.includes(PATH_COUPON_CREATE)
                            ? t("page.create_coupons")
                            : t("page.edit_coupons")}
                    </h3>
                </div>
                {/* form basic setting */}
                <div className="page-body">
                    <div className="card-wrap">
                        <ComponentCouponsForm
                            coupon={values}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            errors={errors}
                            touched={touched}
                            dataMemberShip={membershipTierSelect}
                            couponUnit={couponUnit}
                            handleChangeSelect={handleChangeMembership}
                            handleChangeDateFrom={handleChangeDateFrom}
                            handleChangeDateTo={handleChangeDateTo}
                            handleChangeCouponUnit={handleChangeCouponUnit}
                            handleChangeIsDisplay={handleChangeDisplayStatus}
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
                                {t("page.coupon_guideline")}{" "}
                                <span>{t("page._2_2000_characters")}</span>
                            </div>
                            <SharedCKEditor
                                editor={values.guideline || ""}
                                handleChangeEditor={handleChangeGuideLine}
                                name="guideline"
                                errors={errors.guideline}
                                touched={touched.guideline}
                            />
                        </StyledCard>
                    </div>

                    {/* link */}
                    <div className="card-wrap">
                        <StyledCard>
                            <div className="title">{t("page.link")}</div>
                            <div className="group_link">
                                <SharedInput
                                    styleParent={{ flex: 1 }}
                                    value={couponLink}
                                    disable={true}
                                />
                                <Tooltip
                                    title={
                                        isCopy.status && isCopy.value === 1
                                            ? t("message.copied")
                                            : t("message.copy")
                                    }
                                >
                                    <div className="copy" onClick={handleCopyText}>
                                        <IconCopy />
                                    </div>
                                </Tooltip>
                            </div>
                            <div className="desc_link">{t("page.desc_link")}</div>
                        </StyledCard>
                    </div>

                    <div className="card-wrap">
                        {values.qrImageLink ? (
                            <ComponentQRCode
                                reUpdateState={showTooltipCopy}
                                isCopy={isCopy}
                                qrCodeLink={values.qrImageLink}
                            />
                        ) : (
                            <StyledCard>
                                <Skeleton variant="rectangular" width={210} height={210} />
                                <Skeleton
                                    style={{ marginTop: 20 }}
                                    width={"100%"}
                                    height={"48px"}
                                />
                            </StyledCard>
                        )}
                    </div>

                    <StyledSwitch className="switch-field">
                        <p>{t("page.activate")}</p>
                        <Switch
                            checked={values.status === enumStatus.ACTIVE ? true : false}
                            onChange={handleChangeActive}
                        />
                    </StyledSwitch>
                    {/* button submit */}
                    <div className="btn-layout">
                        <StyledSubmitButton
                            type="default"
                            text={t("page.save")}
                            htmlType="submit"
                            disable={isSubmitting}
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
            <ComponentCouponPreview coupon={values} />
        </div>
    );
});
