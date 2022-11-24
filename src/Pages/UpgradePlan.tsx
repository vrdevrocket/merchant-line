import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import { IClose, SharedButtonSub } from "@components";
import { selectAuth } from "@redux";
import { enumRole, PATH_CHOOSE_PLAN } from "@configs";

export const PageUpgradePlan = () => {
    //page Hooks
    const { t } = useTranslation();
    const history = useHistory();
    //redux state
    const { userInfo } = useSelector(selectAuth);
    const showBtn =
        userInfo?.merchant.createdBy === userInfo?._id && userInfo?.role.name === enumRole.OWNER;

    const handleUpgrade = () => {
        history.push(PATH_CHOOSE_PLAN);
    };
    const handleClose = () => {
        history.goBack();
    };
    return (
        <StyledUpgradePlan>
            <div className="content">
                <div className="icon" onClick={handleClose}>
                    <IClose />
                </div>
                <div className="title">{t("page.this_function_is_for_XXX_plan_users_only")}</div>
                <div className="desc">{t("page.do_you_want_to_upgrade_your_plan_to_XXX")}</div>
                {showBtn && (
                    <SharedButtonSub
                        text={t("page.upgrade_now")}
                        type="default"
                        style={{ margin: "0 auto" }}
                        onClick={handleUpgrade}
                    />
                )}
            </div>
        </StyledUpgradePlan>
    );
};

const StyledUpgradePlan = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .content {
        background-color: #fff;
        padding: 60px 72px;
        text-align: center;
        position: relative;
        max-width: 80%;
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobilePhone}) {
            padding: 48px 56px;
        }
        .icon {
            position: absolute;
            top: 30px;
            right: 30px;
            cursor: pointer;
        }
        .title {
            font-weight: bold;
            font-size: 25px;
            line-height: 1.5rem;
            text-align: center;
            color: #000000;
            margin-bottom: 42px;
            @media (max-width: ${(p) => p.theme.breakPoints.breakMobilePhone}) {
                font-size: 22px;
                margin-bottom: 30px;
            }
        }
        .desc {
            font-weight: normal;
            font-size: 20px;
            line-height: 1.5rem;
            color: #646464;
            margin-bottom: 58px;
            @media (max-width: ${(p) => p.theme.breakPoints.breakMobilePhone}) {
                font-size: 16px;
                margin-bottom: 42px;
            }
        }
    }
`;
