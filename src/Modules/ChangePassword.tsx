import { Drawer, Form, Spin } from "antd";
import { FormikHelpers, useFormik } from "formik";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import * as Yup from "yup";

import { IconLoadingDrawer, SharedButtonSub, SharedInput } from "@components";
import { IChangePassword } from "@interfaces";
import { authApi } from "@api";
import { showErrorMessage, useNotify } from "@utils";
import { useYup } from "@validations";

interface IProps {
    placement: "top" | "right" | "bottom" | "left" | undefined;
    width: number | string;
    drawer: boolean;
    onClose: () => void;
    // setDrawer: Dispatch<SetStateAction<boolean>>;
}
export const ModuleChangePassword = (props: IProps) => {
    //page props
    const { placement, width, drawer, onClose } = props;
    //page hooks
    const { t } = useTranslation();
    const { YupChangePassword } = useYup();
    const { success, error } = useNotify();

    const data: IChangePassword = {
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    };

    const handleChangePassword = async (
        values: IChangePassword,
        { setSubmitting }: FormikHelpers<IChangePassword>
    ) => {
        //
        try {
            setSubmitting(true);
            const res = await authApi.changePassword(values);
            if (res.data) {
                success(t("page.auth.change_password_successfully"));
                onClose();

                resetForm();
            }
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.change_password_fail"));
        } finally {
            setSubmitting(false);
        }
    };

    // formik
    const {
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        errors,
        touched,
        resetForm,
    } = useFormik({
        initialValues: data,
        validationSchema: Yup.object().shape(YupChangePassword),
        onSubmit: handleChangePassword,
    });
    return (
        <Drawer
            style={{ overflow: "hidden" }}
            bodyStyle={{ height: "calc(100% - 64px" }}
            title={t("page.reset_password")}
            placement={placement}
            closable={true}
            width={width}
            onClose={onClose}
            visible={drawer}
        >
            <StyledDrawer>
                <Spin
                    style={{ display: "flex", justifyContent: "center ", alignItems: "center" }}
                    spinning={isSubmitting}
                    indicator={<IconLoadingDrawer />}
                >
                    <form onSubmit={handleSubmit}>
                        <Form.Item
                            colon={false}
                            label={t("page.current_password")}
                            className="label_input"
                            style={{ marginBottom: 0 }}
                        >
                            <SharedInput
                                name="currentPassword"
                                style={{ width: "100%", borderRadius: "4px" }}
                                onChange={handleChange}
                                value={values.currentPassword}
                                onBlur={handleBlur}
                                type="password"
                                errors={errors.currentPassword}
                                touched={touched.currentPassword}
                            />
                        </Form.Item>
                        <Form.Item
                            colon={false}
                            label={t("page.new_password")}
                            className="label_input"
                        >
                            <SharedInput
                                name="newPassword"
                                style={{ width: "100%", borderRadius: "4px" }}
                                onChange={handleChange}
                                value={values.newPassword}
                                onBlur={handleBlur}
                                type="password"
                                errors={errors.newPassword}
                                touched={touched.newPassword}
                            />
                        </Form.Item>
                        <Form.Item
                            colon={false}
                            label={t("page.confirm_new_password")}
                            className="label_input"
                        >
                            <SharedInput
                                name="confirmNewPassword"
                                style={{ width: "100%", borderRadius: "4px" }}
                                onChange={handleChange}
                                value={values.confirmNewPassword}
                                onBlur={handleBlur}
                                type="password"
                                errors={errors.confirmNewPassword}
                                touched={touched.confirmNewPassword}
                            />
                        </Form.Item>

                        <div className="ground_btn">
                            <SharedButtonSub
                                type="default"
                                style={{ fontSize: "16px", marginRight: "12px" }}
                                text={t("page.save")}
                                htmlType="submit"
                                disable={isSubmitting}
                            />
                            <SharedButtonSub
                                type="sub"
                                style={{ fontSize: "16px" }}
                                text={t("page.cancel")}
                                onClick={onClose}
                            />
                        </div>
                    </form>
                </Spin>
            </StyledDrawer>
        </Drawer>
    );
};

const StyledDrawer = styled.div`
    padding: 16px;
    height: 100%;
    .label_input {
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 19px;
        color: #000000;
    }
`;
