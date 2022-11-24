import React, { useEffect } from "react";
import { FooterImg, FooterImgUpper } from "@components";
import { PATH_ACCOUNT_SUCCESS } from "@configs";
import { Layout } from "antd";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setLoading } from "@redux";
const { Footer } = Layout;
export const PreparingAccount = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading(true));
        setTimeout(() => {
            history.push(PATH_ACCOUNT_SUCCESS);
            dispatch(setLoading(false));
        }, 1000);
    });

    return (
        <StyledLayout>
            <StyledContainer>
                <img src={"/images/newUser/loading-image.png"} sizes="auto" />
                <p>{t("page.new_account.preparing")}</p>
            </StyledContainer>
            <Footer className="footer">
                <div className="outer">
                    <FooterImg />
                </div>
                <FooterImgUpper />
            </Footer>
        </StyledLayout>
    );
};

const StyledLayout = styled.div`
    height: 100%;
    min-height: 100vh;
    background-color: #fff;
    .footer {
        background: #fff;
        position: fixed;
        bottom: 0;
        width: 100%;
        padding: 0;
        .outer {
            position: absolute;
            bottom: 0;
        }
    }
`;

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10%;
    p {
        font-weight: 700;
        font-size: 25px;
        line-height: 34px;
        color: #000000;
        margin-top: 10px;
    }
`;
