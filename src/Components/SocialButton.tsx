import { StyleSocialButton, LineLoginIcon, GoogleLoginIcon } from "@components";

interface ISocialButton {
    onClick: () => void;
}

export const ComponentLineButton = (props: ISocialButton) => {
    // const LINE_COLOR = "#06C755";
    // const LINE_ICON = "/images/icon/line-login-icon.png";

    return (
        <StyleSocialButton {...props}>
            <LineLoginIcon />
            {/* <img src={LINE_ICON} className="social-icon" /> */}
        </StyleSocialButton>
    );
};

export const ComponentFaceBookButton = (props: ISocialButton) => {
    // const FACEBOOK_COLOR = "#3B589E";
    // const FACEBOOK_ICON = "/images/icon/fb-login-icon.png";

    return (
        <StyleSocialButton {...props}>
            {/* <img src={FACEBOOK_ICON} className="social-icon" /> */}
        </StyleSocialButton>
    );
};

export const ComponentGoogleButton = (props: ISocialButton) => {
    // const GOOGLE_COLOR = "#E94132";
    // const GOOGLE_ICON = "/images/icon/gg-login-icon.png";

    return (
        <StyleSocialButton {...props}>
            <GoogleLoginIcon />
            {/* <img src={GOOGLE_ICON} className="social-icon" /> */}
        </StyleSocialButton>
    );
};
