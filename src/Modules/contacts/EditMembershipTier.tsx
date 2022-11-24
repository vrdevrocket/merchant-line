import { useFormik } from "formik";
import { Radio } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RadioChangeEvent } from "antd/lib/radio/interface";

import { ComponentDrawer, SharedButtonDefault } from "@components";
import { selectAuth } from "@redux";
import { IMembershipTier } from "@interfaces";
import { showErrorMessage, useNotify } from "@utils";
import { contactAPI } from "@api";

interface IProps {
    visible: boolean;
    handleClose: () => void;
    handleCallbackData: () => void;
    userId: string;
    currentMemberTier: IMembershipTier;
}
const radioStyle = {
    display: "block",
    lineHeight: "30px",
    margin: "10px 0",
};

const initMemberShiptTier: IMembershipTier[] = [];

export const ModuleEditMembershipTier = (props: IProps) => {
    //page hook
    const { t } = useTranslation();
    const { success, error } = useNotify();
    //page redux
    const membershipTiers: IMembershipTier[] =
        useSelector(selectAuth).userInfo?.merchant?.membershipTiers || initMemberShiptTier;
    // props
    const { visible, handleClose, userId, currentMemberTier, handleCallbackData } = props;
    // formik

    const sendSubmit = async () => {
        if (userId && values.membershipTierId) {
            try {
                values.userId = userId;
                await contactAPI.updateMembership({
                    userId: values.userId,
                    membershipTierId: values.membershipTierId,
                });
                success(t("message.update.success"));
            } catch (err: any) {
                if (err.response) {
                    error(showErrorMessage(err.response));
                } else error(t("message.update.fail"));
            } finally {
                handleCallbackData();
            }
        }
    };
    const handleChange = (e: RadioChangeEvent) => {
        setFieldValue("membershipTierId", e.target.value);
    };
    const { handleSubmit, values, setFieldValue, isSubmitting } = useFormik({
        initialValues: {
            userId: "",
            membershipTierId: "",
        },

        onSubmit: sendSubmit,
    });

    return (
        <ComponentDrawer
            title={t("page.edit_membership_tier")}
            visible={visible}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            spinning={isSubmitting}
        >
            <div className="form-input">
                <p>{t("page.customer_is_on")}</p>
                <SharedButtonDefault
                    text={currentMemberTier.tierName || t("page.empty_text")}
                    type="default"
                    size="default"
                    disable={true}
                    style={{
                        borderColor: "#A5A5A5",
                        background: "#F7F7F8",
                        color: "#646464",
                        padding: 12,
                        height: "auto",
                    }}
                />
            </div>
            <div className="form-input">
                <p>{t("page.change_membership_tier")}</p>
                <Radio.Group onChange={handleChange}>
                    {membershipTiers.length &&
                        membershipTiers?.map((item) => {
                            if (item._id !== currentMemberTier.tierId)
                                return (
                                    <Radio key={item._id} style={radioStyle} value={item._id}>
                                        {item.membershipName}
                                    </Radio>
                                );
                        })}
                </Radio.Group>
            </div>
        </ComponentDrawer>
    );
};
