import { FormikErrors, useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import IntlTelInput, { CountryData } from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import parsePhoneNumber from "libphonenumber-js";
import { useEffect, useState } from "react";

import { ComponentDrawer, SharedInput, SharedDate } from "@components";
import { contactAPI } from "@api";
import { enumContactEditType, enumValidation } from "@configs";
import { ILimitDate, IUpdateContact } from "@interfaces";
import moment from "moment";
import { showErrorMessage, useNotify } from "@utils";

interface IProps {
    visible: boolean;
    handleClose: () => void;
    callbackGetDetail: () => void;
    editType?: enumContactEditType;
    editValues: IUpdateContact;
}

const limitDate: ILimitDate = {
    maxDate: new Date(),
};

interface IPhoneFormat {
    code?: string;
    number?: string;
    country?: string;
}

export const ModuleEdit = (props: IProps) => {
    //page hook
    const { t } = useTranslation();
    const { success, error } = useNotify();
    const { id } = useParams<{ id: string }>();
    //states
    const [phoneNumber, setPhoneNumber] = useState<IPhoneFormat>();
    const [phoneErr, setPhoneErr] = useState<string>("");
    const [spinning, setSpinning] = useState<boolean>(false);
    // page variable
    const { visible, handleClose, editType, editValues, callbackGetDetail } = props;
    // console.log(parsePhoneNumber("+8434343434"));

    useEffect(() => {
        const editPhone = () => {
            if (editValues.phoneNumber) {
                const formatTel = parsePhoneNumber(editValues.phoneNumber);
                if (formatTel)
                    return {
                        code: formatTel.countryCallingCode,
                        number: formatTel.nationalNumber,
                        country: formatTel.country?.toLocaleLowerCase(),
                    };
                else return { code: undefined, number: undefined, country: undefined };
            }
        };
        editPhone();
        setPhoneNumber({ ...(editPhone() as IPhoneFormat) });
    }, []);
    let validationSchema = Yup.object();
    let title = "";
    switch (editType) {
        case enumContactEditType.NAME:
            validationSchema = Yup.object().shape({
                fullName: Yup.string()
                    .trim()
                    .required(
                        t("validation.required", { returnObjects: true, name: t("object.name") })
                    )
                    .max(
                        enumValidation.MAX_LENGTH_INPUT,
                        t("validation.max", {
                            returnObjects: true,
                            name: t("object.name"),
                            number: enumValidation.MAX_LENGTH_INPUT,
                        })
                    ),
            });
            title = "name";
            break;
        case enumContactEditType.TEL:
            title = "phone_number";
            break;
        case enumContactEditType.EMAIL:
            validationSchema = Yup.object().shape({
                email: Yup.string()
                    .required(
                        t("validation.required", { returnObjects: true, name: t("object.email") })
                    )
                    .email(t("validation.email_invalid")),
            });
            title = "email";
            break;
        case enumContactEditType.DOB:
            title = "date_of_birth";
            break;
    }

    const handleChangFlag = (number: string, code: CountryData, test: any, isValid: boolean) => {
        if (!isValid) setPhoneErr(t("message.phone_number_invalid"));
        else setPhoneErr("");
        setPhoneNumber({ ...phoneNumber, code: code.dialCode, country: code.iso2 });
    };

    const handleChangeNumber = (isValid: boolean, number: string) => {
        if (number.length) {
            if (!isValid) {
                setPhoneErr(t("message.phone_number_invalid"));
            } else setPhoneErr("");
        } else setPhoneErr(t("validation.required", { name: t("object.phone_number") }));
        setPhoneNumber({ ...phoneNumber, number: number });
    };

    const onSubmit = async (values: IUpdateContact) => {
        setSpinning(true);
        if (editType === enumContactEditType.TEL) {
            if (phoneErr) return;
            if (!phoneNumber?.number) {
                setPhoneErr(t("validation.required", { name: t("object.phone_number") }));
                return;
            }
        } else setPhoneErr("");
        try {
            const error: FormikErrors<IUpdateContact> = {};
            if (editType === enumContactEditType.DOB) {
                if (!values.dateOfBirth) {
                    error.dateOfBirth = t("validation.required", {
                        returnObjects: true,
                        name: t("object.date_of_birth"),
                    });

                    setErrors(error);
                    return;
                }
                if (moment(values.dateOfBirth).isAfter(moment())) {
                    error.dateOfBirth = t("validation.date_before_now", {
                        returnObjects: true,
                        name: t("object.date_of_birth"),
                    });

                    setErrors(error);
                    return;
                }
            }
            // const payloadData = {
            //     fullName: values.fullName || "",
            //     dateOfBirth: values.dateOfBirth || undefined,
            //     phoneNumber: phoneNumber?.number
            //         ? "+" + (phoneNumber.code || 66) + phoneNumber.number.replace(/^0+/, "")
            //         : undefined,
            //     email: values.email || undefined,
            // };

            const payloadData = () => {
                switch (editType) {
                    case enumContactEditType.DOB:
                        return { dateOfBirth: values.dateOfBirth };
                    case enumContactEditType.EMAIL:
                        return { email: values.email };
                    case enumContactEditType.TEL:
                        return {
                            phoneNumber: phoneNumber?.number
                                ? "+" +
                                  (phoneNumber.code || 66) +
                                  phoneNumber.number.replace(/^0+/, "")
                                : undefined,
                        };
                    case enumContactEditType.NAME:
                        return { fullName: values.fullName };
                }
            };
            await contactAPI.updateName(id, payloadData());
            success(t("message.update.success"));
            callbackGetDetail();
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.update.fail"));
        } finally {
            setSpinning(false);
        }
    };

    const {
        values,
        errors,
        touched,
        handleSubmit,
        handleBlur,
        handleChange,
        setValues,
        setErrors,
    } = useFormik<IUpdateContact>({
        initialValues: editValues,
        validationSchema,
        validateOnChange: true,
        onSubmit,
    });

    const handleChangeDate = (date: moment.Moment) => {
        setValues({ ...values, dateOfBirth: date?.toDate() });
    };

    const closeDrawer = () => {
        if (phoneErr) setPhoneErr("");
        handleClose();
    };

    let input = <></>;
    switch (editType) {
        case enumContactEditType.NAME:
            input = (
                <SharedInput
                    name="fullName"
                    type="text"
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors.fullName}
                    touched={touched.fullName}
                />
            );
            break;
        case enumContactEditType.TEL:
            input = (
                <div className={phoneErr ? "form-input err-input-phone" : "form-input"}>
                    <IntlTelInput
                        defaultCountry={phoneNumber?.country || "th"}
                        preferredCountries={["th", "vn"]}
                        fieldId="phoneNumber"
                        fieldName="input-phone-number"
                        onPhoneNumberChange={handleChangeNumber}
                        onSelectFlag={handleChangFlag}
                        value={phoneNumber?.number}
                        // disabled={disabled}
                        autoFocus={true}
                        formatOnInit={false}
                    />
                    <div className={phoneErr ? " text-err" : "text-err text-err__hide"}>
                        {phoneErr || t("page.empty_text")}
                    </div>
                </div>
            );
            break;
        case enumContactEditType.EMAIL:
            input = (
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
            );
            break;
        case enumContactEditType.DOB:
            input = (
                <SharedDate
                    onChange={handleChangeDate}
                    value={values.dateOfBirth}
                    error={errors.dateOfBirth}
                    limitDate={limitDate}
                />
            );
            break;
    }

    return (
        <ComponentDrawer
            title={t("page.edit_type", {
                name: t(`object.${title}`),
            })}
            visible={visible}
            handleClose={closeDrawer}
            handleSubmit={handleSubmit}
            spinning={spinning}
        >
            <div className="form-input">
                <p>{t(`object.${title}`)}</p>
                {input}
            </div>
        </ComponentDrawer>
    );
};
