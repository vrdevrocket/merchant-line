import { memo } from "react";
import { useTranslation } from "react-i18next";
// import { useDispatch } from "react-redux";

import { LogoRocket, StyledExternalAuth } from "@components";
// import { logout } from "@redux";
import { ModuleLine, ModuleFaceBookMobile, ModuleGoogle } from "@modules";
import { IExternalAuthState } from "@interfaces";
import { enumExternalAuthType } from "@configs";
import { showErrorMessage, useNotify } from "@utils";

interface IProps {
    inviteId?: string;
}

export const ModuleExternalSignUp = memo((props: IProps) => {
    //hooks
    // const dispatch = useDispatch();
    const { t } = useTranslation();
    const { error, success } = useNotify();
    //props
    const { inviteId } = props;
    //page variable
    const state: IExternalAuthState = {
        type: enumExternalAuthType.SIGNUP,
        inviteId,
    };

    const errorHandler = (err: any) => {
        //handle Error
        if (err.response) {
            const { status } = err.response;
            if (status === 200 || status === 201) {
                success(t("page.login_successfully"));
            } else {
                error(showErrorMessage(err.response)); // 500 400
            }
        }
    };
    return (
        <>
            <div className="web-logo">
                <LogoRocket />
            </div>
            <h3 className="signup-title">{t("page.register_free")}</h3>
            {/* <p className="welcome-text">{t("page.welcome_to_loyalty")}</p> */}
            <div className="sign_up main-color">{t("page.sign_up_with")}</div>
            <StyledExternalAuth>
                <ModuleLine state={state} />
                {/* <ModuleFaceBook errorHandler={errorHandler} state={state} /> */}
                <ModuleFaceBookMobile errorHandler={errorHandler} state={state} />
                <ModuleGoogle errorHandler={errorHandler} state={state} />
            </StyledExternalAuth>
        </>
    );
});
