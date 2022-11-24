import { Drawer, Avatar, Divider, Menu } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { MenuMode, MenuTheme } from "antd/lib/menu";

import {
    StyledSidebar,
    HomeOutline,
    SettingOutLine,
    GuideOutline,
    PricingFeature,
    LogoutOutline,
    StyledProfileSidebar,
} from "@components";

import {
    selectApp,
    setMobileDrawer,
    setProfileDrawer,
    useAppSelector,
    selectTheme,
    selectAuth,
    logout,
} from "@redux";
import { useHistory } from "react-router";
import { PATH_FEATURE_SETTING, PATH_LOGIN, PATH_EDIT_PROFILE } from "@configs";
import { useTranslation } from "react-i18next";
import { useNotify } from "@utils";

interface IProps {
    sidebarTheme: MenuTheme;
    sidebarMode: MenuMode;
    sidebarIcons: boolean;
    collapsed: boolean;
}
export const ProfileSidebar = ({ sidebarTheme, sidebarMode, sidebarIcons, collapsed }: IProps) => {
    const dispatch = useDispatch();

    const app = useAppSelector(selectApp);
    const Theme = useSelector(selectTheme);
    const { userInfo, auth } = useSelector(selectAuth);
    const history = useHistory();
    const urlImage = Theme.logo;
    const { t } = useTranslation();
    const { warning } = useNotify();
    const handleSignOut = () => {
        dispatch(logout());
        setTimeout(() => {
            history.push(PATH_LOGIN);
        }, 1000);
    };
    const handleChangeSelectAccount = () => {
        if (auth?.x_token) {
            history.push("/accounts");
        } else {
            warning(t("message.not_permission"));
        }
        dispatch(setProfileDrawer(false));
    };
    const handleEditProfile = () => {
        history.push(PATH_EDIT_PROFILE);
        dispatch(setProfileDrawer(false));
    };
    const handleSelectFeature = () => {
        history.push(PATH_FEATURE_SETTING);
        dispatch(setProfileDrawer(false));
    };
    return (
        <>
            <Drawer
                closable={false}
                width={275}
                placement={"right"}
                onClose={() => dispatch(setProfileDrawer(!app.profileDrawer))}
                visible={app.profileDrawer}
                // visible={true}
                className="sidebar-drawer"
            >
                <StyledProfileSidebar>
                    <div
                        style={{
                            overflow: "hidden",
                            flex: "1 1 auto",
                            flexDirection: "column",
                            display: "flex",
                            height: "100vh",
                        }}
                    >
                        <div className="profile-header">
                            <div className="profile-image">
                                <Avatar
                                    size={84}
                                    className="avatar"
                                    src={userInfo?.avatar || "/user-avatar.png"}
                                />
                            </div>
                            <div className="profile-info">
                                <p className="profile-name">{userInfo?.fullName}</p>
                                <p className="profile-role">{userInfo?.role?.name}</p>
                                <p className="profile-email">{userInfo?.email}</p>
                            </div>
                        </div>

                        <Divider className="profile-divider" type="horizontal" />
                        <div className="sidebar-layout">
                            <Avatar className="future-avatar" src={urlImage || ""} />
                            <div className="email-layout">
                                <h4>{userInfo?.merchant?.name}</h4>
                                {/* <p>{userInfo?.email || ""}</p> */}
                            </div>
                        </div>
                        <Divider className="profile-divider" type="horizontal" />
                        <Menu className="profile-layout">
                            <Menu.Item
                                onClick={handleChangeSelectAccount}
                                style={{
                                    fontWeight: 400,
                                    fontSize: "16px",
                                    cursor: "pointer",
                                    color: "#000000",
                                }}
                            >
                                <div className="item-text">
                                    <HomeOutline />
                                    <span>{t("page.select_account")}</span>
                                </div>
                            </Menu.Item>
                            <Menu.Item
                                onClick={handleEditProfile}
                                style={{
                                    fontWeight: 400,
                                    fontSize: "16px",
                                    cursor: "pointer",
                                    color: "#000000",
                                }}
                            >
                                <div className="item-text">
                                    <SettingOutLine />
                                    <span>{t("page.sidebar.edit_profile")}</span>
                                </div>
                            </Menu.Item>
                            <Menu.Item
                                style={{
                                    fontWeight: 400,
                                    fontSize: "16px",
                                    cursor: "pointer",
                                    color: "#000000",
                                }}
                            >
                                <div className="item-text">
                                    <GuideOutline />
                                    <span>{t("page.user_guide")}</span>
                                </div>
                            </Menu.Item>
                            <Menu.Item
                                onClick={handleSelectFeature}
                                style={{
                                    fontWeight: 400,
                                    fontSize: "16px",
                                    cursor: "pointer",
                                    color: "#000000",
                                }}
                            >
                                <div className="item-text">
                                    <PricingFeature />
                                    <span>{t("page.sidebar.pricing_features")}</span>
                                </div>
                            </Menu.Item>
                            <Menu.Item
                                style={{
                                    fontWeight: 400,
                                    fontSize: "16px",
                                    cursor: "pointer",
                                    color: "#F22F46",
                                }}
                                onClick={handleSignOut}
                            >
                                <div className="item-text">
                                    <LogoutOutline />
                                    <span>{t("page.manage_account.logout")}</span>
                                </div>
                            </Menu.Item>
                        </Menu>
                    </div>
                </StyledProfileSidebar>
            </Drawer>
        </>
    );
};
