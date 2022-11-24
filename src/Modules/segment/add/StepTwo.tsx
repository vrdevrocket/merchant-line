import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { SharedButtonDefault } from "@components";
import { enumSegmentCreateStep, enumSegmentDataType, SEGMENT_VALUES } from "@configs";
import { selectAuth } from "@redux";
import { ISignupMethod } from "@interfaces";

interface IItem {
    title: string;
    key: string;
    type: enumSegmentDataType;
}
interface IProps {
    gotoStep: (item: IItem) => void;
    backStep: (step: enumSegmentCreateStep) => void;
    handleCancel: () => void;
    initData: [];
    childIndex: number;
}

export const AddSegmentStepTwo = (props: IProps) => {
    //hook
    const { t } = useTranslation();
    //redux state
    const signUpSettings: ISignupMethod | undefined =
        useSelector(selectAuth).userInfo?.merchant?.signUpSettings || undefined;

    // console.log(signUpSettings?.fields);

    const formFieldArr = () => {
        if (signUpSettings?.fields) {
            const arr: { title: string; key: string; type: enumSegmentDataType }[] = [];

            signUpSettings.fields.map((item) => {
                const obj = {
                    key: "form." + item?._id,
                    title: item.fieldName,
                    type: enumSegmentDataType.textIncluded,
                };
                arr.push(obj);
            });

            return arr;
        } else return [];
    };
    // console.log(formFieldArr());
    //props
    const { gotoStep, backStep, handleCancel, initData, childIndex } = props;

    const checkDuplicate = () => {
        const arr: string[] = initData.map((item) => {
            const keys = Object.keys(item);
            const [data] = keys;
            return data;
        });
        return arr;
    };

    return (
        <>
            <div className="form-field">
                <div className="step-2">
                    <div className="item-field">
                        <h5>{t("page.basic_info")}</h5>
                        {SEGMENT_VALUES.basicInfo.map((item, index) => {
                            if (childIndex === -1) {
                                if (!checkDuplicate().some((e) => e === item.key))
                                    return (
                                        <div
                                            className="choose-item"
                                            key={index}
                                            onClick={() => gotoStep(item)}
                                        >
                                            {t("page." + item.title)}
                                        </div>
                                    );
                            } else {
                                return (
                                    <div
                                        className="choose-item"
                                        key={index}
                                        onClick={() => gotoStep(item)}
                                    >
                                        {t("page." + item.title)}
                                    </div>
                                );
                            }
                        })}
                    </div>
                    <div className="item-field">
                        <h5>{t("page.membership")}</h5>
                        {SEGMENT_VALUES.membership.map((item, index) => {
                            if (childIndex === -1) {
                                if (!checkDuplicate().some((e) => e === item.key))
                                    return (
                                        <div
                                            className="choose-item"
                                            key={index}
                                            onClick={() => gotoStep(item)}
                                        >
                                            {t("page." + item.title)}
                                        </div>
                                    );
                            } else {
                                return (
                                    <div
                                        className="choose-item"
                                        key={index}
                                        onClick={() => gotoStep(item)}
                                    >
                                        {t("page." + item.title)}
                                    </div>
                                );
                            }
                        })}
                    </div>
                    {/* <div className="item-field">
                        <h5>{t("page.LINE_properties")}</h5>
                        {SEGMENT_VALUES.LINEProperties.map((item, index) => {
                            if (childIndex === -1) {
                                if (!checkDuplicate().some((e) => e === item.key))
                                    return (
                                        <div
                                            className="choose-item"
                                            key={index}
                                            onClick={() => gotoStep(item)}
                                        >
                                            {t("page." + item.title)}
                                        </div>
                                    );
                            } else {
                                return (
                                    <div
                                        className="choose-item"
                                        key={index}
                                        onClick={() => gotoStep(item)}
                                    >
                                        {t("page." + item.title)}
                                    </div>
                                );
                            }
                        })}
                    </div> */}
                    <div className="item-field">
                        <h5>{t("page.points")}</h5>
                        {SEGMENT_VALUES.points.map((item, index) => {
                            if (childIndex === -1) {
                                if (!checkDuplicate().some((e) => e === item.key))
                                    return (
                                        <div
                                            className="choose-item"
                                            key={index}
                                            onClick={() => gotoStep(item)}
                                        >
                                            {t("page." + item.title)}
                                        </div>
                                    );
                            } else {
                                return (
                                    <div
                                        className="choose-item"
                                        key={index}
                                        onClick={() => gotoStep(item)}
                                    >
                                        {t("page." + item.title)}
                                    </div>
                                );
                            }
                        })}
                    </div>
                    <div className="item-field">
                        <h5>{t("page.coupons")}</h5>
                        {SEGMENT_VALUES.coupons.map((item, index) => {
                            if (childIndex === -1) {
                                if (!checkDuplicate().some((e) => e === item.key))
                                    return (
                                        <div
                                            className="choose-item"
                                            key={index}
                                            onClick={() => gotoStep(item)}
                                        >
                                            {t("page." + item.title)}
                                        </div>
                                    );
                            } else {
                                return (
                                    <div
                                        className="choose-item"
                                        key={index}
                                        onClick={() => gotoStep(item)}
                                    >
                                        {t("page." + item.title)}
                                    </div>
                                );
                            }
                        })}
                    </div>
                    <div className="item-field">
                        <h5>{t("page.sales")}</h5>
                        {SEGMENT_VALUES.sales.map((item, index) => {
                            if (childIndex === -1) {
                                if (!checkDuplicate().some((e) => e === item.key))
                                    return (
                                        <div
                                            className="choose-item"
                                            key={index}
                                            onClick={() => gotoStep(item)}
                                        >
                                            {t("page." + item.title)}
                                        </div>
                                    );
                            } else {
                                return (
                                    <div
                                        className="choose-item"
                                        key={index}
                                        onClick={() => gotoStep(item)}
                                    >
                                        {t("page." + item.title)}
                                    </div>
                                );
                            }
                        })}
                    </div>
                    {formFieldArr().length > 0 && (
                        <div className="item-field">
                            <h5>{t("page.form")}</h5>
                            {formFieldArr().map((item, index) => {
                                if (childIndex === -1) {
                                    if (!checkDuplicate().some((e) => e === item.key))
                                        return (
                                            <div
                                                className="choose-item"
                                                key={index}
                                                onClick={() => gotoStep(item)}
                                            >
                                                {item.title}
                                            </div>
                                        );
                                } else {
                                    return (
                                        <div
                                            className="choose-item"
                                            key={index}
                                            onClick={() => gotoStep(item)}
                                        >
                                            {t("page." + item.title)}
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    )}
                </div>
            </div>
            <div className="button-field">
                <SharedButtonDefault
                    text={t("page.back")}
                    type="default"
                    size="default"
                    className="btn-back btn-action"
                    onClick={() => backStep(enumSegmentCreateStep.step1)}
                />
                <SharedButtonDefault
                    text={t("page.cancel")}
                    type="default"
                    size="default"
                    className="btn-cancel btn-action"
                    onClick={handleCancel}
                />
            </div>
            <div className="button-field"></div>
        </>
    );
};
