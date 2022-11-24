import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useState } from "react";
import IntlTelInput, { CountryData } from "react-intl-tel-input";

import { ComponentDrawer, SharedInput } from "@components";
import { contactAPI } from "@api";
import { selectAuth, selectApp, useAppSelector } from "@redux";
import { useYup } from "@validations";
import { showErrorMessage, useNotify } from "@utils";
import { IContactBase } from "@interfaces";
import { enumDrawerPlacement, enumTypeFetchList } from "@configs";

interface IProps {
    visible: boolean;
    handleClose: () => void;
    callbackGetList: (type: enumTypeFetchList) => void;
}

export const ModuleAddContact = (props: IProps) => {
    //page hook
    const { t } = useTranslation();
    const app = useAppSelector(selectApp);
    const { YupContact } = useYup();
    const { success, error } = useNotify();
    // state
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [phoneErr, setPhoneErr] = useState<string>("");
    // state redux
    const merchantId = useSelector(selectAuth).userInfo?.merchantId || "";
    // page variable
    const { visible, handleClose, callbackGetList } = props;

    // formik
    const initFormikVal: IContactBase = {
        fullName: "",
        phoneNumberFormat: { number: "", code: "" },
        email: "",
        merchantId: merchantId,
        phoneNumber: undefined,
    };

    const contactSchema = Yup.object().shape(YupContact);

    const closeForm = () => {
        handleClose();
        resetForm();
        setFieldValue("phoneNumberFormat", { ...values.phoneNumberFormat, number: "" });
    };

    const handleChangeNumber = (isValid: boolean, number: string) => {
        if (number.length) {
            if (isValid) {
                setPhoneErr("");
                setFieldValue("phoneNumberFormat", { ...values.phoneNumberFormat, number: number });
            } else {
                setFieldValue("phoneNumberFormat", { ...values.phoneNumberFormat, number: number });
                setPhoneErr(t("message.phone_number_invalid"));
            }
        } else {
            setPhoneErr("");
            setFieldValue("phoneNumberFormat", { ...values.phoneNumberFormat, number: number });
        }
    };

    const handleChangFlag = (number: string, code: CountryData, test: any, isValid: boolean) => {
        if (isValid) setPhoneErr("");
        else setPhoneErr(t("message.phone_number_invalid"));
        setFieldValue("phoneNumberFormat", { ...values.phoneNumberFormat, code: code.dialCode });
    };

    const sendSubmit = async (value: IContactBase) => {
        if (phoneErr) return;

        setIsSubmitting(true);

        try {
            if (value.email === "") {
                delete value.email;
            }
            if (value.phoneNumberFormat?.number) {
                const number = value.phoneNumberFormat.number.replace(/^0+/, "");
                value.phoneNumber = "+" + (value.phoneNumberFormat?.code || 66) + number;
            } else value.phoneNumber = undefined;
            await contactAPI.create(value);
            success(t("message.create.success"));
            callbackGetList(enumTypeFetchList.duplicate);
            resetForm();
            setFieldValue("phoneNumberFormat", { ...values.phoneNumberFormat, number: "" });
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.create.fail"));
        } finally {
            handleClose();
            setTimeout(() => setIsSubmitting(false), 500);
        }
    };

    const {
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        resetForm,
        setFieldValue,
    } = useFormik({
        initialValues: initFormikVal,
        validationSchema: contactSchema,
        onSubmit: sendSubmit,
    });

    return (
        <ComponentDrawer
            title={t("page.add_contact")}
            visible={visible}
            handleClose={closeForm}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            spinning={isSubmitting}
            placement={app.mobile ? enumDrawerPlacement.BOTTOM : enumDrawerPlacement.RIGHT}
        >
            <div className="form-input">
                <p>{t("page.name")}</p>
                <SharedInput
                    name="fullName"
                    placeholder={t("object.name")}
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors.fullName}
                    touched={touched.fullName}
                />
            </div>
            <div className={phoneErr ? "form-input err-input-phone" : "form-input"}>
                <p>{t("page.tel")}</p>
                <IntlTelInput
                    defaultCountry={"th"}
                    preferredCountries={["th", "vn"]}
                    fieldId="phoneNumberFormat"
                    fieldName="phoneNumberFormat"
                    onPhoneNumberChange={handleChangeNumber}
                    onSelectFlag={handleChangFlag}
                    value={values?.phoneNumberFormat?.number}
                    formatOnInit={false}
                />
                <div className={phoneErr ? " text-err" : "text-err text-err__hide"}>
                    {phoneErr || t("page.empty_text")}
                </div>
            </div>
            <div className="form-input">
                <p>{t("page.email")}</p>
                <SharedInput
                    name="email"
                    type="text"
                    value={values.email}
                    placeholder={t("object.email")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors.email}
                    touched={touched.email}
                />
            </div>
        </ComponentDrawer>
    );
};
