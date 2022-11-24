import { memo, useState } from "react";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Switch } from "antd";
import { useHistory } from "react-router";
import { Skeleton } from "@mui/material";

import { ITrafficSource } from "@interfaces";
import { setLoading } from "@redux";
import {
    ComponentQRCode,
    StyledSubmitButton,
    StyledCancelButton,
    ComponentTrafficSourceForm,
    StyledSwitch,
    StyledCard,
} from "@components";
import { useYup } from "@validations";
import { enumStatus, PATH_TRAFFIC_SOURCE } from "@configs";
import { trafficSourceAPI } from "@api";
import { showErrorMessage, useNotify } from "@utils";

interface IProps {
    trafficSource: ITrafficSource;
}

export const ModuleTrafficSourceForm = memo((props: IProps) => {
    //hook
    const { YupTrafficSource } = useYup();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const { success, error } = useNotify();
    //page props
    const { trafficSource } = props;
    //page state
    const [isCopy, setIsCopy] = useState<{ status: boolean; value: number }>({
        status: false,
        value: 0,
    });
    //page variable
    const createTrafficSourceSchema = Yup.object().shape(YupTrafficSource);
    const trafficSourceLink = `${process.env.REACT_APP_CLIENT_URL}/traffic-source/${trafficSource.qrToken}`;

    const handleTrafficSourceSubmit = async (
        values: ITrafficSource,
        { setSubmitting }: FormikHelpers<ITrafficSource>
    ) => {
        try {
            setSubmitting(true);
            dispatch(setLoading(true));
            if (trafficSource._id) {
                const res = await trafficSourceAPI.updateTrafficSourceById(
                    trafficSource._id,
                    values
                );
                if (res) {
                    success(t("message.update.success"));
                }
            } else {
                const res = await trafficSourceAPI.createTrafficSource(values);
                if (res.data.message) {
                    success(res.data.message);
                }
            }
            history.push(PATH_TRAFFIC_SOURCE);
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.update.fail"));
            dispatch(setLoading(false));
        } finally {
            setSubmitting(false);
        }
    };

    const showTooltipCopy = (value: number) => {
        setIsCopy({ status: true, value: value });
        setTimeout(() => setIsCopy({ status: false, value: 0 }), 5000);
    };

    const handleCancel = () => {
        history.push(PATH_TRAFFIC_SOURCE);
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
        initialValues: trafficSource,
        validationSchema: createTrafficSourceSchema,
        onSubmit: handleTrafficSourceSubmit,
        enableReinitialize: true,
    });

    const handleChangeActive = (checked: boolean) => {
        setFieldValue("status", checked ? enumStatus.ACTIVE : enumStatus.INACTIVE);
    };

    return (
        <div className="form-wrap">
            <form onSubmit={handleSubmit}>
                <div className="page-body">
                    <div className="page-header">
                        <h3>{t("page.share_traffic_source")}</h3>
                    </div>

                    {/* form basic setting */}
                    <div className="card-wrap">
                        <ComponentTrafficSourceForm
                            trafficSource={values}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            errors={errors}
                            touched={touched}
                            trafficSourceLink={trafficSourceLink}
                            isCopy={isCopy}
                            reUpdateState={showTooltipCopy}
                        />
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

                    <StyledSwitch className="switch-field">
                        <p>{t("page.activate")}</p>
                        <Switch
                            checked={values.status === enumStatus.ACTIVE ? true : false}
                            onChange={handleChangeActive}
                        />
                    </StyledSwitch>
                    {/* button submit */}
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
            </form>
        </div>
    );
});
