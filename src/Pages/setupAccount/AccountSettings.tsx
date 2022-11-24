import { Avatar, Button, Form, Tooltip } from "antd";
import { FormikHelpers, useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import * as Yup from "yup";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
    ComponentTheme,
    InfoIcon,
    SharedInput,
    StyledCancelButton,
    // StyledNewMerchantSetting,
    StyledSubmitButton,
    FormHeader,
    NewComponentMerchantPreview,
    PlusImageIcon,
} from "@components";
import { getInfo, selectTheme, setFullName, setImage, setLoading } from "@redux";
import { IAccountName, IInfo } from "@interfaces";
import { merchantAPI } from "@api";
import {
    enumValidation,
    IMAGE_TYPE,
    new_account_step,
    PATH_CREATE_REWARD,
    enumLanuage,
} from "@configs";
import { useNotify, theme, showErrorMessage } from "@utils";
import { DeleteOutlined } from "@ant-design/icons";

const textLogoString = "200px × 200px Maximum 10MB";
const avatarStyle = {
    background: "#FFFFFF",
    border: "0.5px dashed #6C7084",
    borderRadius: "6px",
};
export const AccountSettings = () => {
    //page Hooks
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const Theme = useSelector(selectTheme);
    const { success, error } = useNotify();
    //page state
    const [profile, setProfile] = useState<IInfo>();
    //page variable

    const mainColor = Theme.mainColor;
    const urlImage = Theme.image;
    // const urlLogo = Theme.logo;
    // const qrImageUrl = Theme.qrInviteLinkImgUrl;
    const data: IAccountName = {
        accountName: profile?.name,
        enableAccess: profile?.enableAccess || false,
    };

    const merchantSettingSchema = Yup.object().shape({
        accountName: Yup.string()
            .required(
                t("validation.required", {
                    returnObjects: true,
                    name: t("page.account_name"),
                })
            )
            .max(
                255,
                t("validation.max_length", {
                    returnObjects: true,
                    name: t("page.account_name"),
                })
            ),
    });

    const handleChangeLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            //@ts-ignore
            const image = e.target.files[0];
            if (!image) {
                //WHAT: image empty
                error(t("validation.image.empty"));
                return;
            }
            if (!IMAGE_TYPE.some((imageType) => imageType === image.type)) {
                error(t("validation.image.wrong_type"));
                return;
            }
            if (image.size >= enumValidation.MAX_FILE_SIZE) {
                error(t("validation.image.max_size"));
                return;
            }
            const formData = new FormData();
            formData.append("file", image);
            const res = await merchantAPI.uploadImage(formData);
            dispatch(setImage(res.data.publicUrl));
        } catch (error: any) {
            //
            // const data = error.response.data;
            if (error.response) {
                error(showErrorMessage(error.response));
            } else {
                error(t("page.image_error"));
            }
        }
    };

    const handleSave = async (
        values: IAccountName,
        { setSubmitting }: FormikHelpers<IAccountName>
    ) => {
        dispatch(setLoading(true));
        try {
            setSubmitting(true);
            const res = await merchantAPI.updateMerchantAdmin({
                businessName: values.accountName || "",
                themeColor: mainColor,
                logoUrl: urlImage,
                // logoSmallUrl: urlLogo,
                // qrInviteLinkImgUrl: qrImageUrl,
                // enableAccess: values.enableAccess,
            });
            if (res.data) {
                await dispatch(getInfo());
                setProfile(res.data);
                success(t("page.update_profile_successfully"));
                history.push(PATH_CREATE_REWARD);
            }
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.update_profile_fail"));
        } finally {
            setSubmitting(false);
            dispatch(setLoading(false));
            // history.push(PATH_CREATE_REWARD);
        }
    };

    const gotoNext = () => {
        // dispatch(setFirstTimeUser(true));
        history.push(PATH_CREATE_REWARD);
    };

    const handleRemoveImageLogo = () => {
        dispatch(setImage(""));
    };

    //formik
    const { values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, touched } =
        useFormik({
            initialValues: data,
            validationSchema: merchantSettingSchema,
            enableReinitialize: true,
            onSubmit: handleSave,
        });
    const i18nextLng = window.localStorage.i18nextLng;
    return (
        <StyledNewLayout>
            <div className="form-layout">
                <FormHeader current={0} stepLen={new_account_step} />
                <div className="form-item-group">
                    <div className="form-wrap">
                        <form onSubmit={handleSubmit}>
                            <div className="merchant_setting">
                                {t("page.sidebar.account_settings")}
                            </div>
                            <div className="card-wrap">
                                {/* <StyledCard> */}
                                <Form.Item
                                    colon={false}
                                    label={
                                        <span>
                                            <span
                                                className={
                                                    i18nextLng === enumLanuage.TH
                                                        ? "main-color"
                                                        : ""
                                                }
                                            >
                                                {t("page.new_account.loyalty_program")}
                                            </span>
                                            <span
                                                className={
                                                    i18nextLng === enumLanuage.EN ||
                                                    i18nextLng === enumLanuage.EN_GB
                                                        ? "main-color"
                                                        : ""
                                                }
                                            >
                                                {t("page.new_account.loyalty_program_setting")}
                                            </span>
                                            {t("page.new_account.additional_q_mark")}
                                        </span>
                                    }
                                    className="label_input"
                                >
                                    <SharedInput
                                        name="accountName"
                                        style={{ width: "100%", borderRadius: "4px" }}
                                        onChange={(e: React.ChangeEvent<any>) => {
                                            const value = e.target.value;
                                            dispatch(setFullName(value));
                                            handleChange(e);
                                        }}
                                        value={values.accountName}
                                        onBlur={handleBlur}
                                        errors={errors.accountName}
                                        touched={touched.accountName}
                                        className="new-merchant"
                                    />
                                </Form.Item>
                                <ComponentTheme
                                    style={{
                                        fontWeight: 600,
                                        fontSize: "16px",
                                        lineHeight: "21px",
                                        marginBottom: "14px",
                                    }}
                                />
                                <div className="avatar">
                                    <div className="box_title">
                                        <p>{t("page.cover_image")}</p>
                                        <Tooltip placement="topLeft" title={`${textLogoString}`}>
                                            <Button>
                                                <InfoIcon />
                                            </Button>
                                        </Tooltip>
                                    </div>
                                    <div className="avatar-layout">
                                        <Avatar
                                            style={avatarStyle}
                                            size={110}
                                            src={urlImage}
                                            shape="square"
                                        />
                                        {urlImage ? (
                                            <div className="remove-icon-layout">
                                                <DeleteOutlined
                                                    style={{ color: "white", fontSize: 20 }}
                                                    onClick={handleRemoveImageLogo}
                                                />
                                            </div>
                                        ) : (
                                            <label className="camera" htmlFor="file_update_logo">
                                                <PlusImageIcon />
                                            </label>
                                        )}
                                    </div>
                                    <input
                                        id="file_update_logo"
                                        type="file"
                                        hidden
                                        onChange={handleChangeLogo}
                                    />
                                </div>
                                {/* <div className="avatar">
                                    <div className="box_title">
                                        <p>{t("page.cover_image")}</p>
                                        <Tooltip placement="topLeft" title={`${textString}`}>
                                            <Button>
                                                <InfoIcon />
                                            </Button>
                                        </Tooltip>
                                    </div>
                                    <div className="avatar-layout">
                                        <Avatar size={110} src={urlImage} shape="square" />
                                        {urlImage && (
                                            <div className="remove-icon-layout">
                                                <DeleteOutlined
                                                    style={{ color: "white", fontSize: 20 }}
                                                    onClick={handleRemoveImage}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        id="file_update_img"
                                        type="file"
                                        hidden
                                        onChange={handleChangeImage}
                                    />
                                    <label className="camera" htmlFor="file_update_img">
                                        <IconCamera />
                                    </label>
                                </div> */}
                                {/* </StyledCard> */}
                            </div>
                            <div className="btn-layout">
                                <StyledCancelButton
                                    type="sub"
                                    text={t("page.new_account.do_later")}
                                    htmlType="button"
                                    onClick={gotoNext}
                                    className="btn-later"
                                />
                                <StyledSubmitButton
                                    type="default"
                                    text={t("page.continue")}
                                    htmlType="submit"
                                    className="btn-continue"
                                    disable={isSubmitting}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="preview-layout">
                <NewComponentMerchantPreview />
            </div>
        </StyledNewLayout>
    );
};
const StyledNewLayout = styled.div`
    display: flex;
    @media (max-width: ${theme.breakPoints.breakOnlyMobile}) {
        flex-direction: column;
    }
    .form-layout {
        flex: 2;
    }
    .preview-layout {
        flex: 1;
        background-color: #fff;
    }
    .form-item-group {
        position: relative;
        display: flex;
        flex-direction: column;

        color: #000000;
        position: relative;
    }
    .main-color {
        color: ${theme.colors.main};
    }
    .form-wrap {
        flex: 1;
        position: relative;
        height: 10vh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        .label_input {
            input {
                background: #ffffff;
                border: 0.5px solid #a5a5a5;
                box-sizing: border-box;
                border-radius: 5px;
            }
        }
    }
    /*  */
    .merchant_setting {
        font-style: normal;
        font-weight: bold;
        font-size: 35px;
        line-height: 1.5em;
        margin-bottom: ${(p) => p.theme.margins.pageHeader};
        margin-top: ${(p) => p.theme.margins.pageHeader};
        @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
            font-size: 28px;
            margin-bottom: 12px;
        }
    }
    .label_input,
    .you_are_on {
        font-weight: 600;
        font-size: 16px;
        line-height: 21px;
    }
    .you_are_on {
        margin-bottom: 10px;
    }
    .change_password {
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        color: #f22f46;
        cursor: pointer;
    }
    .switch_group {
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        color: #646464;
        margin-top: 18px;
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobile}) {
            margin-top: 12px;
        }
    }
    .ant-switch {
        margin-right: 24px;
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobile}) {
            margin-right: 12px;
        }
    }
    .avatar-logo {
    }
    .avatar {
        margin-bottom: 42px;
        position: relative;
        .box_title {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            p {
                margin: 0 4px 0 0;
            }
            button {
                padding: 0 4px;
                border: 0;
                background: transparent;
                height: auto;
            }
        }
    }
    .avatar .box_title {
        margin: 27px 0 20px 0px;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5em;
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobile}) {
            font-size: 14px;
        }
    }
    .avatar-layout {
        position: relative;
        width: 110px;
        &:hover {
            .remove-icon-layout {
                visibility: visible;
            }
        }
    }
    form {
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
            padding: 1.5rem;
        }
        /* flex: 1;
        overflow: auto; */
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
        .card-wrap {
            margin-bottom: 28px;
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
    }
    .remove-icon-layout {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        visibility: hidden;
        display: flex;
        justify-content: end;
        padding: 8px;
    }
    .avatar .box_title span {
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 1.5em;
        position: relative;
        top: -1px;
        display: inline-block;
        margin-left: 4px;
    }
    .avatar .camera {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        opacity: 0.29;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 55px;
        bottom: 54px;
        -webkit-transform: translate(-50%, 50%);
        -ms-transform: translate(-50%, 50%);
        transform: translate(-50%, 50%);
        cursor: pointer;
    }
    .flex-field {
        display: flex;
        align-items: center;
        .input-link {
            flex: 1;
        }
        .icon-copy {
            margin-left: 1rem;
            cursor: pointer;
            :active {
                transform: scale(0.9);
            }
        }
    }

    .status-field {
        margin-top: 30px;
        display: flex;
        align-items: center;

        .title {
            font-weight: 600;
            font-size: 16px;
            color: black;
            margin-bottom: 0px;
            padding-right: 22px;
        }
    }
`;
