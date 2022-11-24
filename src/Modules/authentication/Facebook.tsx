import { memo, useCallback } from "react";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { unwrapResult } from "@reduxjs/toolkit";

import { enumExternalAuthType, enumExternalMethod, FACEBOOK_GRAPH_URL } from "@configs";
import { IFBLogin, IExternalAuthState, IFBSignup } from "@interfaces";
import { fbLogin, fbSignup, logout, setExternalLogin } from "@redux";
import { useNotify } from "@utils";

interface IProps {
    errorHandler: (error: any) => void;
    state: IExternalAuthState;
}

export const ModuleFaceBook = memo((props: IProps) => {
    //hooks
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { success, error } = useNotify();
    //page variable
    const scope = "name,email,picture";

    const handleFBLogin = useCallback(() => {
        dispatch(setExternalLogin({ type: enumExternalMethod.FACEBOOK }));
    }, []);

    const responseFacebook = async (response: any) => {
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
        <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_ID || "390828912583297"}
            autoLoad={false}
            cssClass="fb-button"
            fields={scope}
            textButton={""}
            onClick={handleFBLogin}
            callback={responseFacebook}
            icon="fa-facebook"
            isMobile={true}
            disableMobileRedirect={true}
        />
    );
});
