import {
    Avatar,
    // Dropdown,
    Layout,
    Menu,
    // Icon,
    Badge,
    Tooltip,
    Divider,
} from "antd";
import { Link, useHistory } from "react-router-dom";
// import { BarChart2, ChevronsDown } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import {
    StyledHeader,
    EngIcon,
    ThaiIcon,
    UpArrow,
    Heart,
    Users,
    DownArrow,
    IconBuger,
    HomeOutline,
    SettingOutLine,
    GuideOutline,
    PricingFeature,
    LogoutOutline,
} from "@components";
// import notifications from "src/demos/mock/notifications";
import {
    logout,
    selectApp,
    selectAuth,
    setMobileDrawer,
    useAppSelector,
    selectTheme,
    setProfileDrawer,
} from "@redux";
import { IconBell, IconSetting } from "@components";
import {
    enumLanuage,
    PATH_EDIT_PROFILE,
    // enumTheme,
    PATH_LOGIN,
    PATH_NOTIFICATION_SETTING,
    // PATH_NOT_COMPLETED,
    PATH_USER_PROFILE,
    PATH_FEATURE_SETTING,
    enumDrawerPlacement,
    PATH_EDIT_POINT,
} from "@configs";
import { useNotify } from "@utils";
const verticalStyle = { height: "26px", margin: 0, width: 2, color: "#e1e1e1" };
const { Header } = Layout;

export const ComponentHeader = () => {
    //page hook
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const history = useHistory();
    const { warning } = useNotify();
    //redux state
    const app = useAppSelector(selectApp);
    const { userInfo } = useSelector(selectAuth);
    const Theme = useSelector(selectTheme);
    const adminPane = userInfo?.notifSetting?.channels?.adminPanel;
    const urlImage = Theme.logo;
    const handleSignOut = () => {
        dispatch(logout());
        setTimeout(() => {
            history.push(PATH_LOGIN);
        }, 1000);
    };

    const routeNotifiSetting = () => {
        if (adminPane) history.push(PATH_NOTIFICATION_SETTING);
        else warning(t("message.admin_panel_notification_setting_is_turn_off"), 3000);
    };

    const routeUserSetting = () => {
        history.push(PATH_USER_PROFILE);
    };
    const handleChangeLang = (params: enumLanuage) => {
        i18n.changeLanguage(params);
    };
    const getTransication = () => {
        if (userInfo?.merchant?.plan?.limitTransaction.status) {
            return userInfo?.merchant?.plan?.limitTransaction.limit;
        } else {
            return "-";
        }
    };
    const getUserCountLimit = () => {
        if (userInfo?.merchant?.plan?.membership?.status) {
            return userInfo?.merchant?.plan?.membership?.limit;
        } else {
            return "-";
        }
    };
    const handleClickProfile = async () => {
        if (app.mobile) {
            await dispatch(setProfileDrawer(!app.profileDrawer));
        }
    };
    const handleClickBuger = async () => {
        await dispatch(setMobileDrawer(!app.mobileDrawer));
    };
    return (
        <StyledHeader>
            <Header>
                <div className="flex-layout header-logo">
                    {app.mobile ? (
                        <div onClick={handleClickBuger} className="trigger">
                            <IconBuger />
                        </div>
                    ) : (
                        <Link to="/">
                            <div className="brand">
                                <img src={"/rocket-logo.png"} alt="logo" />
                            </div>
                        </Link>
                    )}
                    <div className="future-layout">
                        {urlImage ? (
                            <Avatar className="future-avatar" src={urlImage} />
                        ) : (
                            <Avatar
                                className="default-avatar"
                                src={"/images/newUser/shop-default.svg"}
                            />
                        )}

                        <h4>{userInfo?.merchant?.name}</h4>
                    </div>
                </div>
                {app.mobile && (
                    <Link to="/" className="small-logo">
                        <div className="brand">
                            <img src={"/small-logo.svg"} alt="logo" />
                        </div>
                    </Link>
                )}
                <Menu mode="horizontal" className="mobile-right-menu">
                    <Menu.Item className="user-count">
                        <Users />
                        <span className="count">
                            {userInfo?.merchant?.clientCount}
                            <span className="total-count">/{getUserCountLimit()}</span>
                        </span>
                    </Menu.Item>
                    <Menu.Item className="transaction-count">
                        <Heart />
                        <span className="menu-title">{t("page.sidebar.transaction")}</span>
                        <span className="count">
                            {userInfo?.merchant?.allTransactionCurrentMonth}
                            <span className="total-count">/{getTransication()}</span>
                        </span>
                    </Menu.Item>
                    <Divider className="count-divider" type="vertical" style={verticalStyle} />
                    {!app.mobile && (
                        <Menu.SubMenu
                            className="noti-menu"
                            key={"notification"}
                            title={
                                <Badge count={0}>
                                    <Tooltip placement="bottom" title={t("page.notifications")}>
                                        <span
                                            className="submenu-title-wrapper notification-menu"
                                            onClick={routeNotifiSetting}
                                        >
                                            <IconBell color="#6C7084" size={28} />
                                        </span>
                                    </Tooltip>
                                </Badge>
                            }
                        ></Menu.SubMenu>
                    )}
                    {/* {app.mobile && (
                        <Menu.SubMenu
                            key={"setting"}
                            title={
                                <Tooltip placement="bottom" title={t("page.settings")}>
                                    <span
                                        className="submenu-title-wrapper setting-icon"
                                        onClick={routeUserSetting}
                                    >
                                        <IconSetting color="#6C7084" size={32} />
                                    </span>
                                </Tooltip>
                            }
                        />
                    )} */}
                    <Menu.SubMenu
                        key={"language"}
                        className="lang-menu"
                        title={
                            window.localStorage.i18nextLng === enumLanuage.TH ? (
                                <span className="lang-title">
                                    <ThaiIcon />
                                    <span className="text">{t("page.language.lang_th")}</span>
                                </span>
                            ) : (
                                <span className="lang-title">
                                    <EngIcon />
                                    <span className="text">{t("page.language.lang_en")}</span>
                                </span>
                            )
                        }
                    >
                        <Menu style={{ padding: "10px 0", borderRadius: "5px" }}>
                            <StyledUpArrow>
                                <UpArrow />
                            </StyledUpArrow>
                            <Menu.Item
                                style={{
                                    fontWeight: 400,
                                    fontSize: "16px",
                                    color: "#646464",
                                    background: "#fff",
                                }}
                                onClick={() => handleChangeLang(enumLanuage.EN)}
                            >
                                <EngIcon />
                                <span className="lang-item"> {t("page.language.en")}</span>
                            </Menu.Item>
                            <Menu.Item
                                style={{
                                    fontWeight: 400,
                                    fontSize: "16px",
                                    color: "#646464",
                                    background: "#fff",
                                }}
                                onClick={() => handleChangeLang(enumLanuage.TH)}
                            >
                                <ThaiIcon />
                                <span className="lang-item"> {t("page.language.th")}</span>
                            </Menu.Item>
                        </Menu>
                    </Menu.SubMenu>
                    <Divider className="profile-divider" type="vertical" style={verticalStyle} />
                    <Menu.SubMenu
                        key={"name"}
                        className="profile-menu"
                        title={
                            <div className="profile-title">
                                <Avatar size={48} src={userInfo?.avatar || "/user-avatar.png"} />
                                <p className="merchant-name">{userInfo?.fullName}</p>
                                <DownArrow />
                            </div>
                        }
                        onTitleClick={handleClickProfile}
                    >
                        {!app.mobile && (
                            <Menu className="profile-layout">
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
                                <Menu.Divider />
                                <Menu.Item
                                    onClick={() => history.push("/accounts")}
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
                                    onClick={() => history.push(PATH_EDIT_PROFILE)}
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
                                    onClick={() => history.push(PATH_FEATURE_SETTING)}
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
                        )}
                    </Menu.SubMenu>
                </Menu>
            </Header>
        </StyledHeader>
    );
};

// const StyledDropdownLINE = styled.div`
//     background-color: #ffffff;
//     padding: 0.25rem 0.5rem;
//     box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
//     display: flex;
//     flex-direction: column;
//     a {
//         color: rgba(0, 0, 0, 0.85) !important;
//         font-size: 14px;
//         margin: 4px 12px;
//     }

//     .space {
//         height: 1px;
//         width: 80%;
//         margin: 0 12px;
//         background-color: #dbdee9;
//     }
// `;
const StyledUpArrow = styled.span`
    position: absolute;
    top: -10px;
    right: 123px;
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        right: 11px;
    }
`;
