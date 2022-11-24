import { memo, useCallback, useState } from "react";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Skeleton } from "@mui/material";

import { IFreePoint, IMembershipTier } from "@interfaces";
import {
    ComponentFreePointForm,
    SharedInput,
    IconCopy,
    ComponentQRCode,
    StyledSubmitButton,
    StyledCancelButton,
    StyledCard,
    StyledSwitch,
} from "@components";
import { useYup } from "@validations";
import { selectAuth, setLoading } from "@redux";
import { ModuleUploadImage } from "../";
import { freePointAPI } from "@api";
import { ALL_SELECT, enumStatus, PATH_FREE_POINT, PATH_FREE_POINT_CREATE } from "@configs";
import { Switch, Tooltip } from "antd";
import { ComponentFreePointPreview } from "src/Components/freePoint/Preview";
import { copyText, showErrorMessage, useNotify } from "@utils";

interface IProps {
    freePoint: IFreePoint;
}

export const ModuleFreePointFrom = memo((props: IProps) => {
    //hook
    const { YupFreePoint } = useYup();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const { success, error } = useNotify();
    //page props
    const { freePoint } = props;
    //redux states
    const membershipTiers: IMembershipTier[] =
        useSelector(selectAuth).userInfo?.merchant?.membershipTiers || [];
    //page state
    const [isCopy, setIsCopy] = useState<{ status: boolean; value: number }>({
        status: false,
        value: 0,
    });
    //page variable
    const createFreePointSchema = Yup.object().shape(YupFreePoint);
    const membershipTierSelect: IMembershipTier[] = membershipTiers.filter((membershipTier) => {
        if (!membershipTier.isDefault) return membershipTier;
    });
    const pathName = window.location.pathname;
    const freePointLink = `${process.env.REACT_APP_CLIENT_URL}/free-point/${freePoint.qrToken}`;

    const handleFreePointSubmit = async (
        values: IFreePoint,
        { setSubmitting }: FormikHelpers<IFreePoint>
    ) => {
        try {
            setSubmitting(true);
            dispatch(setLoading(true));
            const levelIds = values.levelIds?.includes(ALL_SELECT) ? [] : values.levelIds;
            if (freePoint._id) {
                const res = await freePointAPI.updateFreePointById(freePoint._id, {
                    ...values,
                    quantity: values.quantity ? +values.quantity : undefined,
                    limit: values.limit ? +values.limit : undefined,
                    point: values.point ? +values.point : undefined,
                    levelIds,
                });
                if (res) {
                    success(t("message.update.success"));
                }
            } else {
                const res = await freePointAPI.createFreePoint({
                    ...values,
                    quantity: values.quantity ? +values.quantity : undefined,
                    limit: values.limit ? +values.limit : undefined,
                    point: values.point ? +values.point : undefined,
                    levelIds,
                });
                if (res.data.message) {
                    success(res.data.message);
                }
            }
            history.push(PATH_FREE_POINT);
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
        history.push(PATH_FREE_POINT);
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
        initialValues: freePoint,
        validationSchema: createFreePointSchema,
        onSubmit: handleFreePointSubmit,
        enableReinitialize: true,
    });

    const handleChangeDateFrom = (date: Date | string | null) => {
        setFieldValue("startDate", date);
    };

    const handleChangeDateTo = (date: Date | string | null) => {
        setFieldValue("endDate", date);
    };

    const handleChangeMembership = (leverIdValues: string[]) => {
        const isCheckAll = leverIdValues.some((value) => value === ALL_SELECT);
        const leverIds = isCheckAll ? [ALL_SELECT] : [...leverIdValues];
        setFieldValue("levelIds", [...leverIds]);
    };

    const handleUploadImage = (images: string[]) => {
        setFieldValue("imageUrl", [...images]);
    };

    const handleChangeActive = (checked: boolean) => {
        setFieldValue("status", checked ? enumStatus.ACTIVE : enumStatus.INACTIVE);
    };

    const handleCopyText = useCallback(() => {
        copyText(freePointLink, () => showTooltipCopy(1));
    }, [freePointLink]);

    const showTooltipCopy = (value: number) => {
        setIsCopy({ value: value, status: true });
        setTimeout(() => setIsCopy({ value: 0, status: false }), 5000);
    };

    return (
        <div className="form-wrap">
            <form onSubmit={handleSubmit}>
                <div className="page-header">
                    <h3>
                        {pathName.includes(PATH_FREE_POINT_CREATE)
                            ? t("page.create_free_points")
                            : t("page.edit_free_points")}
                    </h3>
                </div>
                {/* form basic setting */}
                <div className="page-body">
                    <div className="card-wrap">
                        <ComponentFreePointForm
                            freePoint={values}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            errors={errors}
                            touched={touched}
                            dataMemberShip={membershipTierSelect}
                            handleChangeSelect={handleChangeMembership}
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

                    {/* link */}
                    <div className="card-wrap">
                        <StyledCard>
                            <div className="title">{t("page.link")}</div>
                            <div className="group_link">
                                <SharedInput
                                    styleParent={{ flex: 1 }}
                                    value={freePointLink}
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

                    {/* QR code */}
                    <div className="card-wrap">
                        {values.qrImageLink ? (
                            <ComponentQRCode
                                isCopy={isCopy}
                                reUpdateState={showTooltipCopy}
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

                    {/* button submit */}

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
            <ComponentFreePointPreview freePoint={values} />
        </div>
    );
});
