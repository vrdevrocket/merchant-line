import { memo } from "react";
// import FacebookLogin from "react-facebook-login";
import { FacebookLogin } from "react-facebook-login-component";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { unwrapResult } from "@reduxjs/toolkit";

import {
    enumExternalAuthType,
    enumExternalMethod,
    FACEBOOK_GRAPH_URL,
    PATH_ACCOUNTS,
    PATH_CREATE_BUSINESS,
} from "@configs";
import { IFBLogin, IExternalAuthState, IFBSignup } from "@interfaces";
import { fbLogin, fbSignup, logout, setExternalLogin } from "@redux";
import { useNotify } from "@utils";
import { FBNew } from "@components";
import styled from "styled-components";
import { useHistory } from "react-router";
interface IProps {
    errorHandler: (error: any) => void;
    state: IExternalAuthState;
}

export const ModuleFaceBookMobile = memo((props: IProps) => {
    //hooks
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { success, error } = useNotify();
    const history = useHistory();
    //page variable
    // const scope = "name,email,picture";

    // const handleFBLogin = useCallback(() => {
    //     dispatch(setExternalLogin({ type: enumExternalMethod.FACEBOOK }));
    // }, []);

    const responseFacebook = async (response: any) => {
        dispatch(setExternalLogin({ type: enumExternalMethod.FACEBOOK }));
        if (response?.accessToken) {
            const longLiveTokenUrl = `${FACEBOOK_GRAPH_URL}/access_token?grant_type=fb_exchange_token&client_id=${process.env.REACT_APP_FACEBOOK_ID}&client_secret=${process.env.REACT_APP_FACEBOOK_SECRET}&fb_exchange_token=${response?.accessToken}`;
            const userId = response.id;
            try {
                const res = await axios.get(longLiveTokenUrl);
                if (res?.data?.access_token) {
                    let response;
                    if (props.state.type === enumExternalAuthType.LOGIN) {
                        const fbLoginData: IFBLogin = {
                            userId,
                            token: res?.data?.access_token,
                        };

                        response = await dispatch(fbLogin(fbLoginData));
                        //WHAT: wrap function in create async thunk
                        //@ts-ignore
                        unwrapResult(response);
                        success(t("page.login_successfully"));
                        history.push(PATH_ACCOUNTS);
                        //@ts-ignore
                        if (response.data.x_token) {
                            success(t("page.login_successfully"));
                            history.push(PATH_ACCOUNTS);
                        } else {
                            error(t("page.email_password_correct"));
                        }
                    } else if (props.state.type === enumExternalAuthType.SIGNUP) {
                        const fbSignupData: IFBSignup = {
                            userId,
                            token: res?.data?.access_token,
                            inviteId: props.state.inviteId,
                        };

                        response = await dispatch(fbSignup(fbSignupData));
                        //WHAT: wrap function in create async thunk
                        //@ts-ignore
                        unwrapResult(response);
                        success(t("page.login_successfully"));
                        history.push(PATH_CREATE_BUSINESS);
                        //@ts-ignore
                        if (response.payload.accessToken) {
                            success(t("page.login_successfully"));
                            history.push(PATH_CREATE_BUSINESS);
                        } else {
                            error(t("page.email_password_correct"));
                        }
                    }

                    //@ts-ignore
                    if (!response?.payload.accessToken) {
                        error(t("page.email_password_correct"));
                    } else {
                        success(t("page.login_successfully"));
                    }
                } else {
                    dispatch(logout());
                }
            } catch (error) {
                props.errorHandler(error);
            }
        } else {
            dispatch(logout());
        }
    };

    return (
        <StyledLayout>
            <FacebookLogin
                socialId={process.env.REACT_APP_FACEBOOK_ID || "390828912583297"}
                language="en_US"
                scope="public_profile,email"
                responseHandler={responseFacebook}
                xfbml={true}
                // fields={scope}
                fields="id,name,email"
                version="v2.5"
                className="fb-button"
                buttonText={<FBNew />}
            />
        </StyledLayout>
    );
});
const StyledLayout = styled.div`
    button {
        cursor: pointer;
        padding: 6px 0;
        width: 100%;
        box-sizing: border-box;
        border-radius: 5px;
        display: flex;
        -webkit-transition: all 0.5;
        transition: all 0.5;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #f7f7f8;
        border: 1px solid #e1e1e1;
    }
`;
