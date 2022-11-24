import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { PlusCircle } from "react-feather";
import { useState } from "react";
import styled from "styled-components";

import {
    ComponentDrawer,
    SharedInputDefault,
    IconTrash,
    IconCategory,
    SharedInput,
    ComponentTheme,
    TierDemoButton,
    TierRightArrow,
    ComponentTierBadgeIcons,
    ComponentInfoBox,
    // IconCamera,
} from "@components";
import { IMembershipTier } from "@interfaces";
import { COLOR_BENEFITS, enumDrawerPlacement, enumPlacement, enumValidation } from "@configs";
// import { useNotify } from "@utils";
// import { merchantAPI } from "@api";
import { useYup } from "@validations";

interface IProps {
    visible: boolean;
    handleClose: () => void;
    callbackData?: (value: IMembershipTier, index: number) => void;
    initMembershipTier?: IMembershipTier;
    index: number;
    mainColor?: string;
}
interface IEditableBenefit {
    status: boolean;
    index: number;
    err?: string;
}

const initFormikVal: IMembershipTier = {
    membershipName: "",
    bahtSpent: 0,
    points: 0,
    _id: undefined,
    benefits: [],
    status: false,
    color: "#000000",
    icon: "star",
    iconUrl: undefined,
    pointThreshold: 0,
    isDefault: false,
};
export const ModuleMembershipTier = (props: IProps) => {
    //page hook
    const { t } = useTranslation();
    // const { error } = useNotify();
    const { YupMembershipTier } = useYup();
    //page state
    const [benefit, setBenefit] = useState("");
    const [showInput, setShowInput] = useState<boolean>(false);
    const [isErr, setIsErr] = useState<boolean>(false);
    const [textErr, setTextErr] = useState("");
    const [isEditableBenefit, setIsEditableBenefit] = useState<IEditableBenefit>({
        status: false,
        index: -1,
        err: undefined,
    });
    // page variable
    const { visible, handleClose, callbackData, initMembershipTier, index, mainColor } = props;
    // formik
    const membershipTierSchema = Yup.object().shape(YupMembershipTier);
    // concat theme color & already arranged colors
    const tireColor = mainColor ? [mainColor, ...COLOR_BENEFITS] : COLOR_BENEFITS;
    const resetBenefitForm = () => {
        setTimeout(() => {
            setBenefit("");
            setShowInput(false);
        }, 300);
    };

    const sendSubmit = (value: IMembershipTier) => {
        if (!isErr && !isEditableBenefit.err) {
            setIsEditableBenefit({ status: false, index: -1, err: undefined });
            handleClose();
            resetBenefitForm();
            //@ts-ignore
            callbackData(value, index);
            setTimeout(() => resetForm(), 500);
        }
    };

    const {
        errors,
        values,
        touched,
        handleSubmit,
        handleBlur,
        handleChange,
        resetForm,
        setFieldValue,
    } = useFormik({
        initialValues: initMembershipTier || initFormikVal,
        enableReinitialize: true,
        validationSchema: membershipTierSchema,
        onSubmit: sendSubmit,
    });

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addBenefit(benefit);
        }
    };

    const inputBenefit = (
        <div className="flex-field" style={{ marginBottom: 22 }}>
            <div className="flex-1">
                <SharedInputDefault
                    className="input-add-contact"
                    name="benefit"
                    type="text"
                    value={benefit}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChangeBenefit(e.target.value)
                    }
                    onBlur={handleBlur}
                    onKeyDown={handleEnter}
                    placeholder={t("page.benefit_name")}
                    err={isErr ? textErr : ""}
                    prefixIcon={<IconCategory color="#A5A5A5" size={0} width={12} height={21} />}
                />
            </div>
            <div style={{ visibility: "hidden" }} className="right-icon">
                <IconTrash size={22} color={"#646464"} />
            </div>
        </div>
    );

    const closeModule = () => {
        resetForm();
        resetBenefitForm();
        handleClose();
    };

    const handleChangeColor = (color: string) => {
        setFieldValue("color", color);
    };

    const handleChangeBenefit = (value: string) => {
        setBenefit(value);
        if (!value) {
            setTextErr(
                t("validation.required", { returnObjects: true, name: t("object.benefit") })
            );
            setIsErr(true);
        } else if (value.length > enumValidation.MAX_LENGTH_INPUT) {
            setTextErr(
                t("validation.max", {
                    returnObjects: true,
                    name: t("object.benefits"),
                    number: enumValidation.MAX_LENGTH_INPUT,
                })
            );
            setIsErr(true);
        } else {
            setIsErr(false);
        }
    };

    const addBenefit = (value: string) => {
        if (!value.replace(/\s/g, "").length) {
            setTextErr(
                t("validation.required", { returnObjects: true, name: t("object.benefit") })
            );
            setBenefit("");
            setIsErr(true);
        } else if (!value) {
            setTextErr(
                t("validation.required", { returnObjects: true, name: t("object.benefit") })
            );
            setIsErr(true);
        } else if (value.length > enumValidation.MAX_LENGTH_INPUT) {
            setTextErr(
                t("validation.max", {
                    returnObjects: true,
                    name: t("object.membership"),
                    number: enumValidation.MAX_LENGTH_INPUT,
                })
            );
            setIsErr(true);
        } else {
            if (values.benefits) setFieldValue("benefits", [...values.benefits, value]);
            else setFieldValue("benefits", [value]);
            setBenefit("");
            setShowInput(false);
        }
    };
    const addInputBenefit = () => {
        if (!isEditableBenefit.err) {
            setIsEditableBenefit((prev) => ({ ...prev, index: -1, status: false }));
            setShowInput(true);
        }
    };

    const handleEditBenefit = (index: number) => {
        if (!isEditableBenefit.err) setIsEditableBenefit({ status: true, index: index });
    };

    const handleKeyDownEditBenefit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (!isEditableBenefit.err) {
                setIsEditableBenefit((prev) => ({ ...prev, index: -1, status: false }));
            }
        }
    };

    const handleChangeEditBenefit = (index: number, value: string) => {
        if (!value.length || !value.replace(/\s/g, "").length)
            setIsEditableBenefit((prev) => ({
                ...prev,
                err: t("validation.required", { name: t("object.benefit") }),
            }));
        else if (value.length > enumValidation.MAX_LENGTH_INPUT)
            setIsEditableBenefit((prev) => ({
                ...prev,
                err: t("validation.max", {
                    name: t("object.benefit"),
                    number: enumValidation.MAX_LENGTH_INPUT,
                }),
            }));
        else
            setIsEditableBenefit((prev) => ({
                ...prev,
                err: undefined,
            }));
        if (values.benefits) {
            setFieldValue("benefits", [
                ...values.benefits?.map((item, i) => {
                    if (index === i) return value;
                    else return item;
                }),
            ]);
        }
    };

    const removeBenefit = (index: number) => {
        if (values.benefits) {
            const reducedArr = [...values.benefits];
            reducedArr.splice(index, 1);
            setFieldValue("benefits", reducedArr);
        }
    };
    const handleChangeIcon = (value: string) => {
        setFieldValue("icon", value);
    };
    // const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //     try {
    //         //@ts-ignore
    //         const image = e.target.files[0];

    //         if (!image) {
    //             //WHAT: image empty
    //             error(t("validation.image.empty"));
    //             return;
    //         }
    //         if (!["image/svg+xml", "image/png"].some((imageType) => imageType === image.type)) {
    //             error(t("validation.image.not_svg"));
    //             return;
    //         }
    //         if (image.size >= enumValidation.MAX_FILE_SIZE) {
    //             error(t("validation.image.max_size"));
    //             return;
    //         }
    //         const formData = new FormData();
    //         formData.append("file", image);
    //         const res = await merchantAPI.uploadImage(formData);
    //         setFieldValue("iconUrl", res.data.publicUrl);
    //     } catch (error: any) {
    //         //
    //         const data = error.response.data;
    //         if (data) {
    //             error(data.message);
    //         } else {
    //             error(t("page.image_error"));
    //         }
    //     }
    // };

    return (
        <ComponentDrawer
            title={
                index !== -1 ? t("page.update_membership_tier") : t("page.create_membership_tier")
            }
            visible={visible}
            handleClose={() => closeModule()}
            handleSubmit={handleSubmit}
            placement={enumDrawerPlacement.RIGHT}
        >
            <StyledContainer>
                <div>
                    <div className="form-input" style={{ marginBottom: 0 }}>
                        <p>{t("page.membership_name")}</p>
                        <SharedInput
                            className="input-add-contact"
                            name="membershipName"
                            type="text"
                            value={values.membershipName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched.membershipName}
                            errors={errors.membershipName}
                        />
                    </div>
                    <div className="flex-field" style={{ alignItems: "flex-start" }}>
                        <div className="form-input input-flex-1">
                            <p>{t("page.baht_spent")}</p>
                            <SharedInput
                                className="input-add-contact eng"
                                name="bahtSpent"
                                type="number"
                                value={values.bahtSpent}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                touched={touched.bahtSpent}
                                errors={errors.bahtSpent}
                            />
                        </div>
                        <div className="equal-icon">=</div>
                        <div className="form-input input-flex-1">
                            <p>
                                {t("page.points")}
                                <ComponentInfoBox
                                    title={t("page.box_info.threshold")}
                                    body={[t("page.box_info.threshold_body")]}
                                    placement={enumPlacement.RIGHT}
                                />
                            </p>
                            <SharedInput
                                className="input-add-contact eng"
                                name="points"
                                type="number"
                                value={values.points}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                touched={touched.points}
                                errors={errors.points}
                            />
                        </div>
                    </div>
                    <div className="form-input point-threshold">
                        <p>{t("page.point_threshold")}</p>
                        <SharedInput
                            className="input-add-contact"
                            name="pointThreshold"
                            type="number"
                            value={values.pointThreshold}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched.pointThreshold}
                            errors={errors.pointThreshold}
                            disable={initMembershipTier?.isDefault}
                        />
                    </div>
                    <div className={"theme-field"}>
                        <div className="tier-color">
                            <ComponentTheme
                                style={{
                                    fontWeight: 600,
                                    fontSize: "16px",
                                    lineHeight: "21px",
                                    marginBottom: "14px",
                                }}
                                title={t("page.tier_color")}
                                themeConfig={tireColor}
                                callbackColor={handleChangeColor}
                                initColor={values.color}
                            />
                            <div className="avatar">
                                <ComponentTierBadgeIcons
                                    initIcon={values.icon || ""}
                                    callbackIcon={handleChangeIcon}
                                />
                            </div>
                        </div>
                        <div className="budge-display">
                            <TierRightArrow />
                            <TierDemoButton color={values.color || ""} icon={values.icon} />
                        </div>
                    </div>
                    <p className={"label-benefit"}>{t("page.benefits")}</p>
                    <div className={"add-benefit-field"}>
                        <div className="form-input" style={{ flex: 1, marginBottom: 0 }}>
                            <div className="add-benefit-field">
                                {values.benefits?.map((item, index) => (
                                    <div className="flex-field" key={index}>
                                        <div
                                            onClick={() => handleEditBenefit(index)}
                                            className="flex-1"
                                        >
                                            <SharedInput
                                                errors={
                                                    isEditableBenefit.index === index &&
                                                    isEditableBenefit.err
                                                        ? isEditableBenefit.err
                                                        : undefined
                                                }
                                                touched={isEditableBenefit.err ? true : false}
                                                onKeyDown={handleKeyDownEditBenefit}
                                                className="input-add-contact"
                                                type="text"
                                                value={item}
                                                onChange={(e: React.ChangeEvent<any>) =>
                                                    handleChangeEditBenefit(index, e.target.value)
                                                }
                                                disable={
                                                    isEditableBenefit.index === index &&
                                                    isEditableBenefit.status
                                                        ? false
                                                        : true
                                                }
                                                prefixIcon={
                                                    <IconCategory
                                                        color="#A5A5A5"
                                                        size={0}
                                                        width={12}
                                                        height={21}
                                                    />
                                                }
                                            />
                                        </div>
                                        <div
                                            className="right-icon"
                                            onClick={() => removeBenefit(index)}
                                        >
                                            <IconTrash size={22} color={"#646464"} />
                                        </div>
                                    </div>
                                ))}
                                {showInput && inputBenefit}
                            </div>
                        </div>
                        <div className="center-icon" style={{ cursor: "pointer" }}>
                            {!showInput && (
                                <PlusCircle
                                    onClick={addInputBenefit}
                                    size={23}
                                    color="#6C7084"
                                    strokeWidth={1}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className="space"></div>
            </StyledContainer>
        </ComponentDrawer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    .display-none {
        display: none;
    }
    .space {
        height: 100%;
        width: 5px;
    }
    .right-icon {
        margin-bottom: 16px;
    }
    .label-benefit {
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: 600;
        color: black;
    }

    .form-input {
        .ant-input[disabled] {
            cursor: pointer;
        }
    }
    .input-flex-1 {
        margin-bottom: 0px !important;
        flex: 1;
    }
    .equal-icon {
        margin: 10px 8px 0 8px;
        color: #707070;
        font-weight: 600;
        align-self: center;
    }
    .point-threshold {
        margin-bottom: 20px;
    }
    .add-benefit-field {
        /* overflow-y: auto; */
        /* flex: 1; */
        /* height: 100%; */
        /* overflow: auto;
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }

        ::-webkit-scrollbar-track {
            box-shadow: inset 0 0 5px grey;
            border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
            background: ${(p) => p.theme.colors.fadedText};
            border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
            cursor: grab;
        } */
        .flex-field {
            padding-right: 10px;
            margin-bottom: 10px;
        }
    }
    .center-icon {
        margin: 0 auto 16px auto;
        width: fit-content;
    }
    .theme-field {
        display: flex;
        align-items: center;
        .tier-color {
            flex: 1;
        }
        .budge-display {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-around;
        }
        .avatar {
            margin-bottom: 42px;
            position: relative;
        }
        .avatar .box_title {
            margin: 12px 0 10px 0px;
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 1.5em;
            @media (max-width: ${(p) => p.theme.breakPoints.breakMobile}) {
                font-size: 14px;
            }
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
            width: 33px;
            height: 33px;
            background-color: #000000;
            border-radius: 50%;
            opacity: 0.29;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            left: 110px;
            bottom: 0;
            transform: translate(-50%, 50%);
            cursor: pointer;
        }
    }
`;
