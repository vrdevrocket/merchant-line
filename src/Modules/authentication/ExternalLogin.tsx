import { memo } from "react";
// import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { ModuleLine, ModuleGoogle, ModuleFaceBookMobile } from "@modules";
// import { logout } from "@redux";
import { LogoRocket, StyledExternalAuth } from "@components";
import { IExternalAuthState } from "@interfaces";
import { enumExternalAuthType } from "@configs";
import { showErrorMessage, useNotify } from "@utils";
// import { useHistory } from "react-router";

const state: IExternalAuthState = {
    type: enumExternalAuthType.LOGIN,
};

export const ModuleExternalLogin = memo(() => {
    //hooks
    // const dispatch = useDispatch();
    const { t } = useTranslation();
    const { error, success } = useNotify();
    // const history = useHistory();
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
            <LogoRocket />
            <h3 className="login-title">{t("page.log_in")}</h3>
            <p className="welcome-text">{t("page.welcome_to_loyalty")}</p>
            <div className="login main-color">{t("page.log_with")}</div>
            <StyledExternalAuth>
                <ModuleLine state={state} />
                <ModuleFaceBookMobile errorHandler={errorHandler} state={state} />
                {/* <ModuleFaceBook errorHandler={errorHandler} state={state} /> */}
                <ModuleGoogle errorHandler={errorHandler} state={state} />
            </StyledExternalAuth>
        </>
    );
});
