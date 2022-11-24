import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {
    LineIconWhite,
    ManageReward,
    PlanPopup,
    PopupBtnArrow,
    StyledChoosePlan,
} from "@components";
import { useTranslation } from "react-i18next";
// import { store } from "@redux";
import styled from "styled-components";
import {
    enumLanuage,
    PATH_ACCOUNT_SETTINGS,
    PATH_HOME,
    ROCKET_LANDING_PAGE,
    ROCKET_LINE,
} from "@configs";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectAuth, setLoading, getInfo } from "@redux";
import { Swiper, SwiperSlide } from "swiper/react";

import { showErrorMessage, useNotify } from "@utils";
import { merchantAPI } from "@api";

// Import Swiper styles
import "swiper/swiper-bundle.css";

export const PageChoosePlan = () => {
    const [freePlanPopup, setFreePlanPopup] = useState(false);
    const handleCloseFreePlanPopup = () => setFreePlanPopup(false);
    const handleShowFreePlanPopup = () => setFreePlanPopup(true);
    const [paidPlanPopup, setPaidPlanPopup] = useState(false);
    const handleClosePaidPlanPopup = () => setPaidPlanPopup(false);
    const handleShowPaidPlanPopup = () => setPaidPlanPopup(true);
    const [isMobilePopup, setMobilePopup] = useState(false);
    const [isLinkWebPopup, setLinkWebPopup] = useState(false);
    const [chooseType, setChooseType] = useState(0);
    const history = useHistory();
    const { error, success } = useNotify();
    const dispatch = useDispatch();
    //Redux state
    const { userInfo } = useSelector(selectAuth);
    // page hook
    const { t, i18n } = useTranslation();

    const [MobileSupport, setMobileSupport] = useState({
        matches: window.innerWidth > 992 ? false : true,
    });
    useEffect(() => {
        getProfile();
        const mediaQuery = window.matchMedia("(max-width: 992px)");
        mediaQuery.addListener(setMobileSupport);
        // this is the cleanup function to remove the listener
        return () => mediaQuery.removeListener(setMobileSupport);
    }, []);
    const getProfile = async () => {
        await dispatch(getInfo());
    };
    const handleHideMobilePopup = () => {
        setMobilePopup(false);
    };
    const handleSubmitLoginLink = async () => {
        dispatch(setLoading(true));
        try {
            const res = await merchantAPI.sendSignupMobileEmail({
                success: true,
                email: userInfo?.email || "",
            });
            if (res) success(t("message.email_send"));
        } catch (err: any) {
            error(t("message.error"));
        } finally {
            dispatch(setLoading(false));
        }
        // setMobilePopup(false);
    };
    // const token = store.getState().auth.auth?.accessToken;

    // const headers = {
    //     "Content-Type": "application/json",
    //     "access-token": token,
    //     "client-id": "rewarding-merchant-site",
    // };
    // const planId = "6228a748f9e14ee230049f07";
    const freePlanId = "620c71edf7f7036759e99f51";
    const choosePlan = async () => {
        //TODO: Fake logic
        setLoading(true);

        if (userInfo && userInfo.merchantId) {
            try {
                const res = await merchantAPI.updateMerchantPlan(
                    userInfo.merchantId,
                    {
                        planExpires: 1,
                        isPaidPlan: true,
                    },
                    freePlanId
                );
                await dispatch(getInfo());
                if (res.data?.planId) {
                    success(t("message.update.success"));
                    if (
                        userInfo.merchant?.businessName === "" ||
                        userInfo.merchant?.businessName === null ||
                        userInfo.merchant?.businessName === undefined
                    ) {
                        history.push(PATH_ACCOUNT_SETTINGS);
                    } else {
                        history.push(PATH_HOME);
                    }
                }
            } catch (err: any) {
                if (err.response) {
                    error(showErrorMessage(err.response));
                } else error(t("message.error"));
            } finally {
                setLoading(false);
            }
        }
    };
    const chooseFreePlan = async () => {
        setLoading(true);

        if (userInfo && userInfo.merchantId) {
            try {
                const res = await merchantAPI.updateMerchantPlan(
                    userInfo.merchantId,
                    {
                        planExpires: 1,
                        isPaidPlan: false,
                    },
                    freePlanId
                );
                await dispatch(getInfo());
                if (res.data?.planId) {
                    success(t("message.update.success"));
                    if (
                        userInfo.merchant?.businessName === "" ||
                        userInfo.merchant?.businessName === null ||
                        userInfo.merchant?.businessName === undefined
                    ) {
                        history.push(PATH_ACCOUNT_SETTINGS);
                    } else {
                        history.push(PATH_HOME);
                    }
                }
            } catch (err: any) {
                if (err.response) {
                    error(showErrorMessage(err.response));
                } else error(t("message.error"));
            } finally {
                setLoading(false);
            }
        }
    };

    const handleChangeLang = (params: enumLanuage) => {
        i18n.changeLanguage(params);
    };
    const handleConfirmLogin = async () => {
        if (userInfo && userInfo.merchantId) {
            try {
                const res = await merchantAPI.updateMerchantPlan(
                    userInfo.merchantId,
                    {
                        planExpires: 1,
                        isPaidPlan: chooseType === 1 ? true : false, // padi plan true || fasle is free plan
                    },
                    freePlanId
                );
                success(t("message.update.success"));
                if (res) {
                    handleSubmitLoginLink();
                }
                setMobilePopup(false);
                setLinkWebPopup(true);
                await dispatch(getInfo());
            } catch (err: any) {
                if (err.response) {
                    error(showErrorMessage(err.response));
                } else error(t("message.error"));
            } finally {
                setLoading(false);
            }
        }
    };
    const handleHideLinkWebPopup = () => {
        setLinkWebPopup(false);
    };
    const handleMobileChoosePlan = (paid: number) => {
        setMobilePopup(true);
        setChooseType(paid);
    };
    const handleGobackMain = () => {
        setLinkWebPopup(false);
        window.open(ROCKET_LANDING_PAGE);
    };
    const i18nextLng = window.localStorage.i18nextLng;

    return (
        <StyledLayout>
            <StyledChoosePlan>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css"
                    integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn"
                    crossOrigin="anonymous"
                ></link>
                <div className="container-fluid backMenu" id="backMenu">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <a
                            href="https://rocket.in.th"
                            className="navbar-brand text-center w-auto m-auto"
                        >
                            <img
                                id="logo"
                                src="https://www.rocket.in.th/wp-content/uploads/2022/04/Logo-Rocket-Digital.svg"
                                className="logo"
                            />
                        </a>
                        {/* <button
                            className="navbar-toggler collapsed"
                            type="button"
                            data-toggle="collapse"
                            data-target="#item"
                            aria-controls="item"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="icon-bar top-bar"></span>
                            <span className="icon-bar middle-bar"></span>
                            <span className="icon-bar bottom-bar"></span>
                        </button> */}

                        {/* <div className="collapse navbar-collapse topWholeMenu" id="item"> */}
                        <div className="topRightMenu">
                            <button
                                className={
                                    i18nextLng === enumLanuage.TH
                                        ? "langBtn TH active"
                                        : "langBtn TH"
                                }
                                id="THLang"
                                onClick={() => handleChangeLang(enumLanuage.TH)}
                            >
                                {t("page.language.lang_th")}
                            </button>

                            <button
                                className={
                                    i18nextLng === enumLanuage.EN ||
                                    i18nextLng === enumLanuage.EN_GB
                                        ? "langBtn EN active"
                                        : "langBtn EN"
                                }
                                id="ENGLang"
                                onClick={() => handleChangeLang(enumLanuage.EN)}
                            >
                                {t("page.language.lang_en")}
                            </button>
                        </div>
                        {/* </div> */}
                    </nav>
                </div>
                <div className="container">
                    <div className="planSection">
                        <div className="topText">
                            <h1>{t("page.select_your_plan")}</h1>
                            <h2>{t("page.choose_the_plan_right_for_you")}</h2>
                        </div>
                        {/* sent email confimr modal */}
                        <Modal show={isLinkWebPopup} onHide={handleHideLinkWebPopup} centered>
                            <style type="text/css">
                                {`
                                .secondBody img {
                                    width: 620px;
                                }
                                .btn-customBtn {
                                    
                                    background: #0263e0;
                                    border-radius: 6px;
                                    padding: 15px 25px;
                                    display: flex;
                                    flex-direction: row;
                                    color: #fff;
                                    justify-content: center;
                                    align-items: center;
                                    border: none;
                                    font-size: 15px !important;
                                    width:100%;
                                    margin-top:20px;
                                    margin-bottom: 8px;
                                }
                                .btn-connectLine {
                                    background: #29AE00;
                                    border-radius: 6px;
                                    padding: 15px 25px;
                                    display: flex;
                                    flex-direction: row;
                                    color: #fff;
                                    justify-content: center;
                                    align-items: center;
                                    border: none;
                                    font-size: 15px !important;
                                    font-weight:bold;
                                    width:100%;
                                    justify-content:center;

                                }
                                .btn-connectLine span{
                                    margin-left: 10px;
                                }
                                .modal-content {
                                    background: #fff;
                                    -webkit-box-sizing: border-box;
                                    box-sizing: border-box;
                                    margin: 0 auto;
                                    padding: 30px;
                                    position: relative;
                                    width: 100%;
                                }
                                .modal-dialog {
                                    max-width: 900px;
                                    text-align: center;
                                }
                                .modal-body .btn-customBtn span {
                                    position: relative;
                                    transition: all 0.6s;
                                    left: 5px;
                                }
                                .modal-body .btn-customBtn:hover {
                                    background: #025acc;
                                    box-shadow: 0px 4px 12px rgba(2, 99, 224, 0.5);
                                    border-radius: 4px;
                                }
                                .modal-body .btn-customBtn:hover span {
                                    left: -5px;
                                    color: #fff;
                                }
                                .modal-body .btn-customBtn svg {
                                    position: relative;
                                    transition: all 0.6s;
                                    opacity: 0;
                                    right: 0;
                                }
                                .modal-body .btn-customBtn:hover svg {
                                    opacity: 1;
                                    right: -5px;
                                }
                                .secondBody img {
                                    width: 620px;
                                }
                                .modal-body img {
                                    margin-top: 2rem;
                                    width: 400px;
                                }
                                .modal-body h1 {
                                    font-weight: 700;
                                    font-size: 20px;
                                    line-height: 27px;
                                    text-align: center;
                                    color: #000000;
                                    padding: 0 10px;
                                    margin: 0;
                                }
                                .modal-body h2 {
                                    font-style: normal;
                                    font-weight: 400;
                                    font-size: 14px;
                                    line-height: 19px;
                                    text-align: center;
                                    color: #A5A5A5;
                                }
                                .modal-body h3 {
                                    font-weight: 700;
                                    font-size: 20px;
                                    line-height: 27px;
                                    text-align: center;
                                    color: #000000;
                                    padding: 0 10px;                                    
                                }
                                .modal-body .email{
                                    font-style: italic;
                                    font-weight: 700;
                                    font-size: 16px;
                                    line-height: 22px;
                                    text-align: center;
                                    color: #6C7084;
                                }
                                .modal-body p{
                                    font-weight: 400;
                                    font-size: 16px;
                                    line-height: 25px;
                                    text-align: center;
                                    color: #A5A5A5;
                                    padding: 0 10px;
                                }
                                .image-svg{
                                    margin: 20px 0;
                                }
                                .image-svg svg {
                                    
                                    width: 305.25px;
                                    height: 144.88px;
                                    
                                }
                                @media (max-width: 992px) {
                                    .modal-body img {
                                        width: 100%;
                                    }
                                    .modal-body h1 {
                                        font-size: 20px;
                                    }
                                    .modal-body h1 br {
                                        display: none;
                                    }
                                    .modal-body h2 {
                                        font-size: 16px;
                                    }
                                    .modal-body h2 br {
                                        line-height: 30px;
                                        display: none;
                                    }
                                }
                                .modal-body{
                                    padding: 0;
                                }
                            `}
                            </style>
                            <Modal.Body className="secondBody">
                                <h1>{t("page.login_link_has_been_sent")}</h1>
                                <span className="email">{userInfo?.email}</span>
                                <h3>{t("page.check_mail_box")}</h3>
                                <h2>{t("page.open_link_via_desktop")}</h2>
                                <div className="image-svg">
                                    <ManageReward />
                                </div>
                                <Button variant="customBtn" onClick={handleGobackMain}>
                                    <span>{t("page.back_to_main_page")}</span>
                                </Button>
                            </Modal.Body>
                        </Modal>
                        {/* especially mobile popup */}
                        <Modal show={isMobilePopup} onHide={handleHideMobilePopup} centered>
                            <style type="text/css">
                                {`
                                .secondBody img {
                                    width: 620px;
                                }
                                .btn-customBtn {
                                    
                                    background: #0263e0;
                                    border-radius: 6px;
                                    padding: 15px 25px;
                                    display: flex;
                                    flex-direction: row;
                                    color: #fff;
                                    justify-content: center;
                                    align-items: center;
                                    border: none;
                                    font-size: 15px !important;
                                    width:100%;
                                    margin-top:20px;
                                    margin-bottom: 8px;
                                }
                                .btn-connectLine {
                                    background: #29AE00;
                                    border-radius: 6px;
                                    padding: 15px 25px;
                                    display: flex;
                                    flex-direction: row;
                                    color: #fff;
                                    justify-content: center;
                                    align-items: center;
                                    border: none;
                                    font-size: 15px !important;
                                    font-weight:bold;
                                    width:100%;
                                    justify-content:center;

                                }
                                .btn-connectLine:hover{
                                    color: #fff;
                                    outline:0;
                                }
                                .btn-connectLine span{
                                    margin-left: 10px;
                                }
                                .modal-content {
                                    background: #fff;
                                    -webkit-box-sizing: border-box;
                                    box-sizing: border-box;
                                    margin: 0 auto;
                                    padding: 30px;
                                    position: relative;
                                    width: 100%;
                                }
                                .modal-dialog {
                                    max-width: 900px;
                                    text-align: center;
                                }
                                .modal-body .btn-customBtn span {
                                    position: relative;
                                    transition: all 0.6s;
                                    left: 5px;
                                }
                                .modal-body .btn-customBtn:hover {
                                    background: #025acc;
                                    box-shadow: 0px 4px 12px rgba(2, 99, 224, 0.5);
                                    border-radius: 4px;
                                }
                                .modal-body .btn-customBtn:hover span {
                                    left: -5px;
                                    color: #fff;
                                }
                                .modal-body .btn-customBtn svg {
                                    position: relative;
                                    transition: all 0.6s;
                                    opacity: 0;
                                    right: 0;
                                }
                                .modal-body .btn-customBtn:hover svg {
                                    opacity: 1;
                                    right: -5px;
                                }
                                .secondBody img {
                                    width: 620px;
                                }
                                .modal-body img {
                                    margin-top: 2rem;
                                    width: 400px;
                                }
                                .modal-body h1 {
                                    font-weight: 700;
                                    font-size: 20px;
                                    line-height: 27px;
                                    text-align: center;
                                    color: #000000;
                                    padding: 0 10px;
                                }
                                .modal-body h2 {
                                    font-style: normal;
                                    font-weight: 400;
                                    font-size: 14px;
                                    line-height: 19px;
                                    text-align: center;
                                    color: #A5A5A5;
                                }
                                .modal-body p{
                                    font-weight: 400;
                                    font-size: 16px;
                                    line-height: 25px;
                                    text-align: center;
                                    color: #A5A5A5;
                                    padding: 0 10px;
                                }
                                .modal-body a{
                                    text-decoration: none;
                                    color: #fff;
                                }
                                .image-svg{
                                    margin: 20px 0;
                                }
                                .image-svg svg {
                                    
                                    width: 305.25px;
                                    height: 144.88px;
                                    
                                }
                                @media (max-width: 992px) {
                                    .modal-body img {
                                        width: 100%;
                                    }
                                    .modal-body h1 {
                                        font-size: 20px;
                                    }
                                    .modal-body h1 br {
                                        display: none;
                                    }
                                    .modal-body h2 {
                                        font-size: 16px;
                                    }
                                    .modal-body h2 br {
                                        line-height: 30px;
                                        display: none;
                                    }
                                }
                                .modal-body{
                                    padding: 0;
                                }
                            `}
                            </style>
                            <Modal.Body className="secondBody">
                                <h1>
                                    {t("page.m_popup_title")}
                                    <br />
                                    {t("page.m_popup_concat")}
                                </h1>
                                <h2>{t("page.m_popup_des")}</h2>
                                <div className="image-svg">
                                    <PlanPopup />
                                </div>
                                <p>{t("page.m_popup_des_2")}</p>
                                <Button variant="customBtn" onClick={handleConfirmLogin}>
                                    <span>{t("page.back_m_desktop")}</span>
                                </Button>

                                <a href={ROCKET_LINE} target="_blank">
                                    <Button variant="connectLine">
                                        <LineIconWhite />
                                        <span>{t("page.add_rocket_line_account")}</span>
                                    </Button>
                                </a>
                            </Modal.Body>
                        </Modal>
                        <Modal show={paidPlanPopup} onHide={handleClosePaidPlanPopup} centered>
                            <style type="text/css">
                                {`
                                .secondBody img {
                                    width: 620px;
                                }
                                .btn-customBtn {
                                    margin: 2rem auto auto auto;
                                    background: #0263e0;
                                    border-radius: 6px;
                                    padding: 15px 25px;
                                    display: flex;
                                    flex-direction: row;
                                    color: #fff;
                                    justify-content: center;
                                    align-items: center;
                                    border: none;
                                    font-size: 15px !important;
                                }
                                .modal-content {
                                    background: #fff;
                                    -webkit-box-sizing: border-box;
                                    box-sizing: border-box;
                                    margin: 0 auto;
                                    padding: 30px;
                                    position: relative;
                                    width: 100%;
                                }
                                .modal-dialog {
                                    max-width: 900px;
                                    text-align: center;
                                }
                                .modal-body .btn-customBtn span {
                                    position: relative;
                                    transition: all 0.6s;
                                    left: 5px;
                                }
                                .modal-body .btn-customBtn:hover {
                                    background: #025acc;
                                    box-shadow: 0px 4px 12px rgba(2, 99, 224, 0.5);
                                    border-radius: 4px;
                                }
                                .modal-body .btn-customBtn:hover span {
                                    left: -5px;
                                    color: #fff;
                                }
                                .modal-body .btn-customBtn svg {
                                    position: relative;
                                    transition: all 0.6s;
                                    opacity: 0;
                                    right: 0;
                                }
                                .modal-body .btn-customBtn:hover svg {
                                    opacity: 1;
                                    right: -5px;
                                }
                                .secondBody img {
                                    width: 620px;
                                }
                                .modal-body img {
                                    margin-top: 2rem;
                                    width: 400px;
                                }
                                .modal-body h1 {
                                    font-size: 35px;
                                    font-weight: bold;
                                    color: #000;
                                    text-align: center;
                                }
                                .modal-body h2 {
                                    font-size: 25px;
                                    font-weight: 300;
                                    color: #a5a5a5;
                                    line-height: 39px;
                                    text-align: center;
                                    margin-top: 1rem;
                                }
                                .image-svg svg {
                                    
                                        width: 100%;
                                    
                                }
                                @media (max-width: 992px) {
                                    .modal-body img {
                                        width: 100%;
                                    }
                                    .modal-body h1 {
                                        font-size: 20px;
                                    }
                                    .modal-body h1 br {
                                        display: none;
                                    }
                                    .modal-body h2 {
                                        font-size: 16px;
                                    }
                                    .modal-body h2 br {
                                        line-height: 30px;
                                        display: none;
                                    }
                                }
                            `}
                            </style>
                            <Modal.Body className="secondBody">
                                <h1>
                                    {t("page.paid_plan_popup_title_first_row")}
                                    <br />
                                    {t("page.paid_plan_popup_title_second_row")}
                                </h1>
                                <h2>
                                    {t("page.paid_plan_popup_body_first_row")}
                                    <br />
                                    {t("page.paid_plan_popup_body_second_row")}
                                </h2>
                                <div className="image-svg">
                                    <PlanPopup />
                                </div>
                                {/* <a href="https://uat-admin.rocket-tech.app/create-account-settings"> */}
                                <Button variant="customBtn" onClick={choosePlan}>
                                    <span>{t("page.start_now")}</span>
                                    <PopupBtnArrow />
                                </Button>
                                {/* </a> */}
                            </Modal.Body>
                        </Modal>
                        <Modal show={freePlanPopup} onHide={handleCloseFreePlanPopup} centered>
                            <style type="text/css">
                                {`
                                .btn-customBtn {
                                    margin: 2rem auto auto auto;
                                    background: #0263e0;
                                    border-radius: 6px;
                                    padding: 15px 25px;
                                    display: flex;
                                    flex-direction: row;
                                    color: #fff;
                                    justify-content: center;
                                    align-items: center;
                                    border: none;
                                    font-size: 15px !important;
                                }
                                .modal-content {
                                    background: #fff;
                                    -webkit-box-sizing: border-box;
                                    box-sizing: border-box;
                                    margin: 0 auto;
                                    padding: 30px;
                                    position: relative;
                                    width: 100%;
                                }
                                .modal-dialog {
                                    max-width: 900px;
                                    text-align: center;
                                }
                                .modal-body .btn-customBtn span {
                                    position: relative;
                                    transition: all 0.6s;
                                    left: 5px;
                                }
                                .modal-body .btn-customBtn:hover {
                                    background: #025acc;
                                    box-shadow: 0px 4px 12px rgba(2, 99, 224, 0.5);
                                    border-radius: 4px;
                                }
                                .modal-body .btn-customBtn:hover span {
                                    left: -5px;
                                    color: #fff;
                                }
                                .modal-body .btn-customBtn svg {
                                    position: relative;
                                    transition: all 0.6s;
                                    opacity: 0;
                                    right: 0;
                                }
                                .modal-body .btn-customBtn:hover svg {
                                    opacity: 1;
                                    right: -5px;
                                }
                                .secondBody img {
                                    width: 620px;
                                }
                                .modal-body img {
                                    margin-top: 2rem;
                                    width: 400px;
                                }
                                .modal-body h1 {
                                    font-size: 35px;
                                    font-weight: bold;
                                    color: #000;
                                    text-align: center;
                                }
                                .modal-body h2 {
                                    font-size: 25px;
                                    font-weight: 300;
                                    color: #a5a5a5;
                                    line-height: 39px;
                                    text-align: center;
                                    margin-top: 1rem;
                                }
                                @media (max-width: 992px) {
                                    .modal-body img {
                                        width: 100%;
                                    }
                                    .modal-body h1 {
                                        font-size: 20px;
                                    }
                                    .modal-body h1 br {
                                        display: none;
                                    }
                                    .modal-body h2 {
                                        font-size: 16px;
                                    }
                                    .modal-body h2 br {
                                        line-height: 30px;
                                        display: none;
                                    }
                                }
                            `}
                            </style>
                            <Modal.Body>
                                <h1>{t("page.free_plan_popup_title")}</h1>
                                <h2>{t("page.free_plan_popup_body")}</h2>
                                <img src="https://www.rocket.in.th/wp-content/uploads/2022/05/FreePlan.svg" />
                                {/* <a href="https://uat-admin.rocket-tech.app/create-account-settings"> */}
                                <Button variant="customBtn" onClick={chooseFreePlan}>
                                    <span>{t("page.start_now")}</span>
                                    <PopupBtnArrow />
                                </Button>
                                {/* </a> */}
                            </Modal.Body>
                        </Modal>
                        {!MobileSupport.matches && (
                            <div className="plans text-center">
                                <div className="col-lg-3 plan plan-free">
                                    <div className="popular">
                                        <button>{t("page.popular_text")}</button>
                                    </div>
                                    <h1 className="planTitle">{t("page.top_free_column_title")}</h1>
                                    <hr />
                                    <div className="planMembers">
                                        <h3>{t("page.members_columns_title")}</h3>
                                        <h2>{t("page.top_free_column_members")}</h2>
                                    </div>
                                    <hr />
                                    <div className="planMembers">
                                        <h3>{t("page.admin_columns_title")}</h3>
                                        <h2>{t("page.top_free_column_admin")}</h2>
                                    </div>
                                    <hr />
                                    <div className="planMembers">
                                        <h3>{t("page.transaction_columns_title")}</h3>
                                        <h2>{t("page.top_free_column_transaction")}</h2>
                                    </div>
                                    <hr />
                                    <div className="planMembers">
                                        <h3>{t("page.memtires_columns_title")}</h3>
                                        <h2>{t("page.top_free_column_memtiers")}</h2>
                                    </div>
                                    <hr />
                                    <div className="planMembers">
                                        <h3>{t("page.rewards_columns_title")}</h3>
                                        <h2>{t("page.top_free_column_rewards")}</h2>
                                    </div>
                                    <div className="choosePlanBtn">
                                        <button
                                            className="customBorderBtn"
                                            onClick={handleShowFreePlanPopup}
                                        >
                                            {t("page.free_choose_plan_button_text")}
                                        </button>
                                    </div>
                                </div>
                                <div className="col-lg-3 plan premiumPlan">
                                    <h1 className="planTitle">
                                        {t("page.top_premium_column_title")}
                                    </h1>
                                    <h1 className="planMonth">
                                        {t("page.premium_plan_price")}
                                        <span>{t("page.months_columns_title")}</span>
                                    </h1>
                                    <hr />
                                    <div className="planMembers">
                                        <h3>{t("page.members_columns_title")}</h3>
                                        <h2>{t("page.top_premium_column_members")}</h2>
                                        <h4>{t("page.top_premium_column_members_sub")}</h4>
                                        <h4>
                                            {t("page.top_premium_column_members_sub_per_member")}
                                        </h4>
                                    </div>
                                    <hr />
                                    <div className="planMembers">
                                        <h3>{t("page.admin_columns_title")}</h3>
                                        <h2>{t("page.top_premium_column_admin")}</h2>
                                    </div>
                                    <hr />
                                    <div className="planMembers">
                                        <h3>{t("page.transaction_columns_title")}</h3>
                                        <h2>{t("page.top_premium_column_transaction")}</h2>
                                        <h4>{t("page.top_premium_column_transaction_sub")}</h4>
                                        <h4>{t("page.top_premium_column_transaction_sub_per")}</h4>
                                    </div>
                                    <hr />
                                    <div className="planMembers">
                                        <h3>{t("page.memtires_columns_title")}</h3>
                                        <h2>{t("page.top_premium_column_memtiers")}</h2>
                                    </div>
                                    <hr />
                                    <div className="planMembers">
                                        <h3>{t("page.rewards_columns_title")}</h3>
                                        <h2>{t("page.top_premium_column_rewards")}</h2>
                                    </div>
                                    <div className="choosePlanBtn">
                                        <button
                                            className="customBorderBtn"
                                            onClick={handleShowPaidPlanPopup}
                                        >
                                            {t("page.get_a_demo_button_text")}
                                        </button>
                                    </div>
                                </div>
                                <div className="col-lg-3 plan deluxePlan">
                                    <div className="recommend">
                                        <button>{t("page.recommened_text")}</button>
                                    </div>
                                    <h1 className="planTitle">
                                        {t("page.top_deluxe_column_title")}
                                    </h1>
                                    <h1 className="planMonth">
                                        {t("page.deluxe_plan_price")}
                                        <span>{t("page.months_columns_title")}</span>
                                    </h1>
                                    <hr />
                                    <div className="planMembers">
                                        <h3>{t("page.members_columns_title")}</h3>
                                        <h2>{t("page.top_deluxe_column_members")}</h2>
                                        <h4>&nbsp;</h4>
                                    </div>
                                    <hr />
                                    <div className="planMembers">
                                        <h3>{t("page.admin_columns_title")}</h3>
                                        <h2>{t("page.top_deluxe_column_admin")}</h2>
                                    </div>
                                    <hr />
                                    <div className="planMembers">
                                        <h3>{t("page.transaction_columns_title")}</h3>
                                        <h2>{t("page.top_deluxe_column_transaction")}</h2>
                                        <h4>{t("page.top_deluxe_column_transaction_sub")}</h4>
                                        <h4>{t("page.top_deluxe_column_transaction_sub_per")}</h4>
                                    </div>
                                    <hr />
                                    <div className="planMembers">
                                        <h3>{t("page.memtires_columns_title")}</h3>
                                        <h2>{t("page.top_deluxe_column_memtires")}</h2>
                                    </div>
                                    <hr />
                                    <div className="planMembers">
                                        <h3>{t("page.rewards_columns_title")}</h3>
                                        <h2>{t("page.top_deluxe_column_rewards")}</h2>
                                    </div>
                                    <div className="choosePlanBtn">
                                        <button
                                            className="customBtn"
                                            onClick={handleShowPaidPlanPopup}
                                        >
                                            {t("page.get_a_demo_button_text")}
                                        </button>
                                    </div>
                                </div>
                                <div className="col-lg-3 plan coporatePlan">
                                    <h1 className="planTitle">
                                        {t("page.top_coporate_column_title")}
                                    </h1>
                                    <h1 className="planMonth">{t("page.ask_for_quote")}</h1>
                                    <hr />
                                    <div className="planMembers">
                                        <h3>{t("page.members_columns_title")}</h3>
                                        <h2>{t("page.top_coporate_column_members")}</h2>
                                        <h4>
                                            &nbsp;
                                            <br className="fixTHVersionPaddingColumn" />
                                            &nbsp;
                                        </h4>
                                    </div>
                                    <hr />
                                    <div className="planMembers">
                                        <h3>{t("page.admin_columns_title")}</h3>
                                        <h2>{t("page.top_coporate_column_admin")}</h2>
                                    </div>
                                    <hr />
                                    <div className="planMembers">
                                        <h3>{t("page.transaction_columns_title")}</h3>
                                        <h2>{t("page.top_coporate_column_transaction")}</h2>
                                        <h4>&nbsp;</h4>
                                    </div>
                                    <hr />
                                    <div className="planMembers">
                                        <h3>{t("page.memtires_columns_title")}</h3>
                                        <h2>{t("page.top_coporate_column_memtires")}</h2>
                                    </div>
                                    <hr />
                                    <div className="planMembers">
                                        <h3>{t("page.rewards_columns_title")}</h3>
                                        <h2>{t("page.top_coporate_column_rewards")}</h2>
                                    </div>
                                    <div className="choosePlanBtn">
                                        <button
                                            className="customBorderBtn"
                                            onClick={handleShowPaidPlanPopup}
                                        >
                                            {t("page.get_a_demo_button_text")}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {!MobileSupport.matches && (
                        <div className="container">
                            <div className="compareSection">
                                <div className="topText">
                                    <h1>{t("page.compare_features")}</h1>
                                </div>
                                <div className="innerCompareSection">
                                    <div className="supportCol col-4">
                                        <div className="tableTitle">
                                            <h2>{t("page.features_title")}</h2>
                                        </div>
                                        <div className="supportColItems">
                                            <h2 className="innerColTitle">
                                                {t("page.members_columns_title")}
                                            </h2>
                                            <h2 className="innerColTitle">
                                                {t("page.memtires_columns_title")}
                                            </h2>
                                            <h2 className="innerColTitle">
                                                {t("page.rewards_columns_title")}
                                            </h2>
                                            <h2 className="innerColTitle">
                                                {t("page.bot_column_benefits_title")}
                                            </h2>
                                            <h2 className="innerColTitle">
                                                {t("page.bot_column_coupons_title")}
                                            </h2>
                                            <h2 className="innerColTitle">
                                                {t("page.bot_column_freepoints_title")}
                                            </h2>
                                            <h2 className="innerColTitle">
                                                {t("page.bot_column_multiUser_title")}
                                            </h2>
                                            <h2 className="innerColTitle">
                                                {t("page.bot_column_signupCustom_title")}
                                            </h2>
                                            <h2 className="innerColTitle">
                                                {t("page.bot_column_pAssistance_title")}
                                            </h2>
                                            <h2 className="innerColTitle">
                                                {t("page.bot_column_graphicMP_title")}
                                            </h2>
                                            <h2 className="innerColTitle">
                                                {t("page.bot_column_ePlanS_title")}
                                            </h2>
                                            <h2 className="innerColTitle">
                                                {t("page.bot_column_customFeatures_title")}
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="freeCol col freePlanCol">
                                        <div className="freePlanColTop">
                                            <div className="recommend">
                                                <button>{t("page.popular_text")}</button>
                                            </div>
                                        </div>
                                        <div className="tableTitle">
                                            <h2>{t("page.top_free_column_title")}</h2>
                                            <h3>0 ฿{t("page.months_columns_title")}</h3>
                                            <div className="choosePlanBtn">
                                                <button
                                                    className="customBorderBtn"
                                                    onClick={handleShowFreePlanPopup}
                                                >
                                                    {t("page.free_choose_plan_button_text")}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="supportColItems">
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </h2>
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </h2>
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </h2>
                                            <h2 className="innerColTitle">&nbsp;</h2>
                                            <h2 className="innerColTitle">&nbsp;</h2>
                                            <h2 className="innerColTitle">&nbsp;</h2>
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                                <br />
                                                &nbsp;
                                            </h2>
                                            <h2 className="innerColTitle">&nbsp;</h2>
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </h2>
                                            <h2 className="innerColTitle">&nbsp;</h2>
                                            <h2 className="innerColTitle">&nbsp;</h2>
                                            <h2 className="innerColTitle">&nbsp;</h2>
                                        </div>
                                    </div>
                                    <div className="freeCol col premiumCol">
                                        <div className="tableTitle">
                                            <h2>{t("page.top_premium_column_title")}</h2>
                                            <h3 className="premiumPrice">
                                                {t("page.premium_plan_price")}
                                                {t("page.months_columns_title")}
                                            </h3>
                                            <div className="choosePlanBtn">
                                                <button
                                                    className="customBorderBtn"
                                                    onClick={handleShowPaidPlanPopup}
                                                >
                                                    {t("page.get_a_demo_button_text")}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="supportColItems">
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </h2>
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </h2>
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </h2>
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </h2>
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </h2>
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </h2>
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                                <br />
                                                &nbsp;
                                            </h2>
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </h2>
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </h2>
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </h2>
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </h2>
                                            <h2 className="innerColTitle">&nbsp;</h2>
                                        </div>
                                    </div>
                                    <div className="freeCol col deluxeCol">
                                        <div className="recommendCol">
                                            <div className="recommend">
                                                <button>{t("page.recommened_text")}</button>
                                            </div>
                                        </div>
                                        <div className="tableTitle">
                                            <h2>{t("page.top_deluxe_column_title")}</h2>
                                            <h3 className="premiumPrice">
                                                {t("page.deluxe_plan_price")}
                                                {t("page.months_columns_title")}
                                            </h3>
                                            <div className="choosePlanBtn">
                                                <button
                                                    className="customBtn"
                                                    onClick={handleShowPaidPlanPopup}
                                                >
                                                    {t("page.get_a_demo_button_text")}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="supportColItems">
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </h2>
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </h2>
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </h2>
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </h2>
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </h2>
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </h2>
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                                <br />
                                                &nbsp;
                                            </h2>
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </h2>
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </h2>
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </h2>
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </h2>
                                            <h2 className="innerColTitle">&nbsp;</h2>
                                        </div>
                                    </div>
                                    <div className="freeCol col premiumCol lastCol">
                                        <div className="tableTitle">
                                            <h2>{t("page.top_coporate_column_title")}</h2>
                                            <h3 className="premiumPrice">
                                                {t("page.bot_column_coporate_custom_pricing")}
                                            </h3>
                                            <div className="choosePlanBtn">
                                                <button
                                                    className="customBorderBtn"
                                                    onClick={handleShowPaidPlanPopup}
                                                >
                                                    {t("page.get_a_demo_button_text")}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="supportColItems">
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </h2>
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </h2>
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </h2>
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </h2>
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </h2>
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </h2>
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                                <br />
                                                &nbsp;
                                            </h2>
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </h2>
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </h2>
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </h2>
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </h2>
                                            <h2 className="innerColTitle">
                                                <svg
                                                    width="24"
                                                    height="20"
                                                    viewBox="0 0 24 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.5625 10.625L8.03125 18.1719L21.6875 2"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="container-fluid mobileSection">
                    {MobileSupport.matches && (
                        <Swiper
                            spaceBetween={50}
                            slidesPerView={2}
                            // onSlideChange={() => console.log("slide change")}
                            // onSwiper={(swiper) => console.log(swiper)}
                            className="swiperSection text-center"
                            loop={true}
                            breakpoints={{
                                200: {
                                    width: 600,
                                    slidesPerView: 2,
                                },
                                768: {
                                    width: 650,
                                    slidesPerView: 2,
                                },
                            }}
                            // loop={true}
                        >
                            <SwiperSlide
                                style={{ marginRight: "16px" }}
                                className="plan plan-free freePlan"
                            >
                                <div className="mobile-popular">
                                    <button>{t("page.popular_text")}</button>
                                </div>
                                <div className="item-body">
                                    <h1 className="planTitle">{t("page.top_free_column_title")}</h1>
                                    <hr />
                                    <div className="planMembers">
                                        <h3>{t("page.members_columns_title")}</h3>
                                        <h2>{t("page.top_free_column_members")}</h2>
                                    </div>
                                    <hr />
                                    <div className="planMembers">
                                        <h3>{t("page.admin_columns_title")}</h3>
                                        <h2>{t("page.top_free_column_admin")}</h2>
                                    </div>
                                    <hr />
                                    <div className="planMembers">
                                        <h3>{t("page.transaction_columns_title")}</h3>
                                        <h2>{t("page.top_free_column_transaction")}</h2>
                                    </div>
                                    <hr />
                                    <div className="planMembers">
                                        <h3>{t("page.memtires_columns_title")}</h3>
                                        <h2>{t("page.top_free_column_memtiers")}</h2>
                                    </div>
                                    <hr />
                                    <div className="planMembers">
                                        <h3>{t("page.rewards_columns_title")}</h3>
                                        <h2>{t("page.top_free_column_rewards")}</h2>
                                    </div>
                                    <div className="choosePlanBtn">
                                        <button
                                            className="customBorderBtn"
                                            onClick={() => handleMobileChoosePlan(0)}
                                        >
                                            {t("page.free_choose_plan_button_text")}
                                        </button>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="plan premiumPlan">
                                <h1 className="planTitle">{t("page.top_premium_column_title")}</h1>
                                <h1 className="planMonth">
                                    {t("page.premium_plan_price")}
                                    <span>{t("page.months_columns_title")}</span>
                                </h1>
                                <hr />
                                <div className="planMembers">
                                    <h3>{t("page.members_columns_title")}</h3>
                                    <h2>{t("page.top_premium_column_members")}</h2>
                                    <h4>{t("page.top_premium_column_members_sub")}</h4>
                                </div>
                                <hr />
                                <div className="planMembers">
                                    <h3>{t("page.admin_columns_title")}</h3>
                                    <h2>{t("page.top_premium_column_admin")}</h2>
                                </div>
                                <hr />
                                <div className="planMembers">
                                    <h3>{t("page.transaction_columns_title")}</h3>
                                    <h2>{t("page.top_premium_column_transaction")}</h2>
                                    <h4>{t("page.top_premium_column_transaction_sub")}</h4>
                                </div>
                                <hr />
                                <div className="planMembers">
                                    <h3>{t("page.memtires_columns_title")}</h3>
                                    <h2>{t("page.top_premium_column_memtiers")}</h2>
                                </div>
                                <hr />
                                <div className="planMembers">
                                    <h3>{t("page.rewards_columns_title")}</h3>
                                    <h2>{t("page.top_premium_column_rewards")}</h2>
                                </div>
                                <div className="choosePlanBtn">
                                    <button
                                        className="customBorderBtn"
                                        onClick={() => handleMobileChoosePlan(1)}
                                    >
                                        {t("page.get_a_demo_button_text")}
                                    </button>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="plan deluxePlan">
                                <div className="mobile-recommend">
                                    <button>{t("page.recommened_text")}</button>
                                </div>
                                <div className="item-body">
                                    <h1 className="planTitle">
                                        {t("page.top_deluxe_column_title")}
                                    </h1>
                                    <h1 className="planMonth">
                                        {t("page.deluxe_plan_price")}
                                        <span>{t("page.months_columns_title")}</span>
                                    </h1>
                                    <hr />
                                    <div className="planMembers">
                                        <h3>{t("page.members_columns_title")}</h3>
                                        <h2>{t("page.top_deluxe_column_members")}</h2>
                                        <h4>&nbsp;</h4>
                                    </div>
                                    <hr />
                                    <div className="planMembers">
                                        <h3>{t("page.admin_columns_title")}</h3>
                                        <h2>{t("page.top_deluxe_column_admin")}</h2>
                                    </div>
                                    <hr />
                                    <div className="planMembers">
                                        <h3>{t("page.transaction_columns_title")}</h3>
                                        <h2>{t("page.top_deluxe_column_transaction")}</h2>
                                        <h4>{t("page.top_deluxe_column_transaction_sub")}</h4>
                                    </div>
                                    <hr />
                                    <div className="planMembers">
                                        <h3>{t("page.memtires_columns_title")}</h3>
                                        <h2>{t("page.top_deluxe_column_memtires")}</h2>
                                    </div>
                                    <hr />
                                    <div className="planMembers">
                                        <h3>{t("page.rewards_columns_title")}</h3>
                                        <h2>{t("page.top_deluxe_column_rewards")}</h2>
                                    </div>
                                    <div className="choosePlanBtn">
                                        <button
                                            className="customBtn"
                                            onClick={() => handleMobileChoosePlan(1)}
                                        >
                                            {t("page.get_a_demo_button_text")}
                                        </button>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="plan coporatePlan">
                                <h1 className="planTitle">{t("page.top_coporate_column_title")}</h1>
                                <h1 className="planMonth">{t("page.ask_for_quote")}</h1>
                                <hr />
                                <div className="planMembers">
                                    <h3>{t("page.members_columns_title")}</h3>
                                    <h2>{t("page.top_coporate_column_members")}</h2>
                                    <h4>
                                        &nbsp;
                                        <br className="fixTHVersionPaddingColumn" />
                                        &nbsp;
                                    </h4>
                                </div>
                                <hr />
                                <div className="planMembers">
                                    <h3>{t("page.admin_columns_title")}</h3>
                                    <h2>{t("page.top_coporate_column_admin")}</h2>
                                </div>
                                <hr />
                                <div className="planMembers">
                                    <h3>{t("page.transaction_columns_title")}</h3>
                                    <h2>{t("page.top_coporate_column_transaction")}</h2>
                                    <h4>&nbsp;</h4>
                                </div>
                                <hr />
                                <div className="planMembers">
                                    <h3>{t("page.memtires_columns_title")}</h3>
                                    <h2>{t("page.top_coporate_column_memtires")}</h2>
                                </div>
                                <hr />
                                <div className="planMembers">
                                    <h3>{t("page.rewards_columns_title")}</h3>
                                    <h2>{t("page.top_coporate_column_rewards")}</h2>
                                </div>
                                <div className="choosePlanBtn">
                                    <button
                                        className="customBorderBtn"
                                        onClick={() => handleMobileChoosePlan(1)}
                                    >
                                        {t("page.get_a_demo_button_text")}
                                    </button>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    )}
                </div>
                <div className="container-fluid companies">
                    <div className="container text-center">
                        <h2>{t("page.empowering_innovative_brands")}</h2>
                        <div className="wholeLogos">
                            <div className="leftLogos">
                                <div className="companyLogo">
                                    <img src="https://www.rocket.in.th/wp-content/uploads/2022/04/Group-427321100-1.png" />
                                </div>
                                <div className="companyLogo">
                                    <img src="https://www.rocket.in.th/wp-content/uploads/2022/04/Group-427321101-1.png" />
                                </div>
                                <div className="companyLogo">
                                    <img src="https://www.rocket.in.th/wp-content/uploads/2022/04/Group-427321096-1.png" />
                                </div>
                                <div className="companyLogo">
                                    <img src="https://www.rocket.in.th/wp-content/uploads/2022/04/Group-427321097-1.png" />
                                </div>
                            </div>
                            <div className="rightLogos">
                                <div className="companyLogo">
                                    <img src="https://www.rocket.in.th/wp-content/uploads/2022/04/Group-427321098-1.png" />
                                </div>
                                <div className="companyLogo">
                                    <img src="https://www.rocket.in.th/wp-content/uploads/2022/04/Group-427321099-1.png" />
                                </div>
                                <div className="companyLogo">
                                    <img src="https://www.rocket.in.th/wp-content/uploads/2022/04/Group-427321103-1.png" />
                                </div>
                                <div className="companyLogo">
                                    <img src="https://www.rocket.in.th/wp-content/uploads/2022/04/Group-427321102-1.png" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <script
                    src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"
                    integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
                    crossOrigin="anonymous"
                ></script>
                <script
                    src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-fQybjgWLrvvRgtW6bFlB7jaZrFsaBXjsOMm/tB9LTS58ONXgqbR9W8oWht/amnpF"
                    crossOrigin="anonymous"
                ></script>
            </StyledChoosePlan>
        </StyledLayout>
    );
};

const StyledLayout = styled.div`
    height: 100vh;
    overflow-y: scroll;
`;
