import { useTranslation } from "react-i18next";
import { StyledCancelButton, UnionVector } from "@components";
import { PATH_HOME, PATH_LINE_MESSAGE } from "@configs";
import { useHistory } from "react-router";
import styled from "styled-components";
import { Button } from "antd";
import { useEffect } from "react";
import { merchantAPI } from "@api";
import { useDispatch } from "react-redux";
import { setFirstTimeUser, setLoading } from "@redux";
import { showErrorMessage, useNotify } from "@utils";
export const AccountSuccess = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();
    const { success, error } = useNotify();
    useEffect(() => {
        getMerchantSuccess();
    }, []);
    const getMerchantSuccess = async () => {
        dispatch(setLoading(true));
        try {
            const res = await merchantAPI.getMerchantCongratulation();
            if (res.data) {
                success(t("message.congrat_loyalty_program"));
            }
            dispatch(setLoading(false));
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.fail_loyalty_program"));
        } finally {
            dispatch(setLoading(false));
        }
    };
    const gotoFullMode = () => {
        dispatch(setFirstTimeUser(true));
        history.push(PATH_HOME);
    };
    const gotoNextPage = () => {
        history.push(PATH_LINE_MESSAGE);
    };
    return (
        <StyledLayout>
            <div className="image-layout">
                <StyledImage />
                {/* <LoytalProgramSuccess /> */}
                {/* <img src="/images/newUser/program-success.png" /> */}
                {/* <img className="inner-img" src="/images/newUser/plan.png" /> */}
            </div>
            <div className="des-layout">
                <div className="title">
                    <h5>{t("page.new_account.congratulations")}</h5>
                    <h5>{t("page.new_account.create_program")}</h5>
                </div>
                <div className="btn-layout">
                    <StyledButton onClick={gotoNextPage}>
                        {t("page.new_account.go_to_online")}
                        <UnionVector />
                    </StyledButton>
                    <StyledCancelButton
                        type="sub"
                        text={t("page.new_account.full_mode")}
                        htmlType="button"
                        className="btn-later"
                        onClick={gotoFullMode}
                    />
                </div>
            </div>
        </StyledLayout>
    );
};
const StyledImage = styled.div`
    background-image: url("/images/newUser/program-success.png");
    min-height: 600px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-width: 67vh;
`;
const StyledButton = styled(Button)`
    padding: 16px 32px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    background-color: #0263e0;
    color: #ffffff;
    border: none;
    height: 48px;
    display: flex;
    align-items: center;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    span {
        margin-right: 8px;
    }
    &:hover {
        background-color: #0263e0;
        color: #ffffff;
    }
`;

const StyledLayout = styled.div`
    padding-top: 72px;
    height: 100vh;
    overflow-y: scroll;
    .image-layout {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .inner-img {
            position: absolute;
            top: 0;
            /* left: 30%; */
            max-height: 480px;
        }
    }
    .des-layout {
        display: flex;
        flex-direction: column;
        align-items: center;
        /* margin-top: 100px; */
        .title {
            margin-bottom: 36px;
            h5 {
                font-weight: 700;
                font-size: 35px;
                line-height: 48px;
                text-align: center;
                color: #000000;
            }
        }
        .btn-layout {
            display: flex;
            flex-direction: column;
            align-items: center;
            .btn-later {
                height: 48px;
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                width: 100%;
                margin-top: 16px;
            }
        }
    }
`;
