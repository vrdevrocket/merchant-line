import { useLocation } from "react-router";

import { StyledContentAuth, StyledAuth } from "@components";

interface IAppModuleLayout {
    children?: string | JSX.Element | JSX.Element[];
}

export const LayoutAuth = (props: IAppModuleLayout) => {
    //hook
    const { pathname } = useLocation();
    //page variable
    //WHY:Lỗi Import lên tạo 1 biPATH_VERIFY_EMAILến dù ở route đã có.
    const PATH_VERIFY_EMAIL = "/verify-email";
    const notImageAuthContent = pathname.includes(PATH_VERIFY_EMAIL);

    return (
        <>
            <StyledAuth>
                <StyledContentAuth notImage={notImageAuthContent}>
                    {/* {!notImageAuthContent && (
                        <img className="bg-image__logo" src="/images/auth/logo.png" />
                    )} */}
                    {props.children}
                </StyledContentAuth>
            </StyledAuth>
        </>
    );
};
