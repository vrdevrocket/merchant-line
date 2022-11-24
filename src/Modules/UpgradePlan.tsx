import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { NotAllowFeature, SharedButtonSub } from "@components";
import { selectAuth } from "@redux";
import { useSelector } from "react-redux";

interface IProps {
    visible: boolean;
    onClose: () => void;
    handleUpgrade: () => void;
}

export const ModuleUpgradePlan = (props: IProps) => {
    // props
    const { visible, onClose, handleUpgrade } = props;
    // hook
    const { t } = useTranslation();
    // redux state
    const planName = useSelector(selectAuth).plan?.name;

    return (
        <StyledCurrentPlan
            mask={true}
            onCancel={onClose}
            footer={false}
            okText={t("page.select_new_plan")}
            visible={visible}
            title={t("--")}
            centered={true}
            width="660px"
        >
            <NotAllowFeature />
            <div className="top-label">
                {t("page.feature_not_your_content", { name: planName })}
            </div>
            <div className="middle-label">{t("page.do_you_wish_use_feature")}</div>
            <div className="btn-field">
                <SharedButtonSub
                    onClick={handleUpgrade}
                    text={t("page.select_new_plan")}
                    type="default"
                />
            </div>
        </StyledCurrentPlan>
    );
};

const StyledCurrentPlan = styled(Modal)`
    .ant-modal-header {
        padding: 21px 24px !important;
        visibility: hidden;
    }
    .ant-modal-close {
        display: none;
    }
    .ant-modal-body {
        padding: 0 100px 64px 100px !important;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .top-label {
            font-size: 25px;
            font-weight: 700;
            text-align: center;
            margin-bottom: 10px;
            margin-top: 32px;
            color: black;
        }
        .middle-label {
            color: #646464;
            font-size: 20px;
            margin-bottom: 32px;
            text-align: center;
        }
        .btn-field {
            /* margin-bottom: 36px; */
        }
    }
`;
