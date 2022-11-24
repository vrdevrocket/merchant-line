import { memo, useCallback } from "react";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { unwrapResult } from "@reduxjs/toolkit";

import { ComponentGoogleButton } from "@components";
import { ggLogin, ggSignup, logout, setExternalLogin } from "@redux";
import { IExternalAuthState, IGGLogin, IGGSignup } from "@interfaces";
import {
    enumExternalAuthType,
    enumExternalMethod,
    PATH_ACCOUNTS,
    PATH_CREATE_BUSINESS,
} from "@configs";
import { useNotify } from "@utils";
import { useHistory } from "react-router";

interface IProps {
    errorHandler: (error: any) => void;
    state: IExternalAuthState;
}

export const ModuleGoogle = memo((props: IProps) => {
    //hooks
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { success, error } = useNotify();
    const history = useHistory();
    const handleGGSuccess = async (response: any) => {
        const accessToken = response?.accessToken;
        // if (!accessToken) {
        //     error(t("page.login_failed"));

        //     dispatch(logout());
        // }

        try {
            let response;
            if (props.state.type === enumExternalAuthType.LOGIN) {
                const ggLoginData: IGGLogin = {
                    token: accessToken,
                };
                response = await dispatch(ggLogin(ggLoginData));
                //WHAT: wrap function in create async thunk
                //@ts-ignore
                unwrapResult(response);
                success(t("page.login_successfully"));
                history.push(PATH_ACCOUNTS);

                if (response.data.x_token) {
                    success(t("page.login_successfully"));
                    history.push(PATH_ACCOUNTS);
                } else {
                    error(t("page.email_password_correct"));
                }
            } else if (props.state.type === enumExternalAuthType.SIGNUP) {
                const ggSignupData: IGGSignup = {
                    token: accessToken,
                    inviteId: props.state.inviteId,
                };
                response = await dispatch(ggSignup(ggSignupData));
                //WHAT: wrap function in create async thunk
                if (!response.payload.accessToken) {
                    error(t("page.email_password_correct"));
                } else {
                    success(t("page.login_successfully"));
                }

                //@ts-ignore
                unwrapResult(response);
                success(t("page.login_successfully"));
                history.push(PATH_CREATE_BUSINESS);
                if (response.payload.accessToken) {
                    success(t("page.login_successfully"));
                    history.push(PATH_CREATE_BUSINESS);
                } else {
                    error(t("page.email_password_correct"));
                }
            }
        } catch (error) {
            props.errorHandler(error);
        }
    };

    const handleGGFail = () => {
        // console.log("logout action google fail");
        dispatch(logout());
    };

    const handleOnClick = useCallback(() => {
        dispatch(setExternalLogin({ type: enumExternalMethod.GOOGLE }));
    }, []);

    return (
        <GoogleLogin
            clientId={
                process.env.REACT_APP_GOOGLE_ID ||
                "918086977464-i1t2r5gpv27chedpe4jv9raihno46qgt.apps.googleusercontent.com"
            }
            render={(renderProps) => <ComponentGoogleButton onClick={renderProps.onClick} />}
            onSuccess={handleGGSuccess}
            onFailure={handleGGFail}
            cookiePolicy={"single_host_origin"}
            onRequest={handleOnClick}
        />
    );
});
