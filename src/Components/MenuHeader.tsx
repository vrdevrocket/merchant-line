import { Layout, Menu } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { StyledMenuHeader, User } from "@components";
import { IconSetting } from "@components";
import {
    PATH_ACCEPT_REDEEM,
    PATH_ACCOUNT_SETTINGS,
    PATH_BENEFITS,
    PATH_BENEFITS_CREATE,
    PATH_CONTACTS,
    // PATH_CONTACTS,
    PATH_COUPON,
    PATH_COUPON_CREATE,
    PATH_EDIT_POINT,
    PATH_EDIT_PROFILE,
    PATH_FEATURE_SETTING,
    PATH_FREE_POINT,
    PATH_FREE_POINT_CREATE,
    PATH_GAIN_CREATE_MENU,
    PATH_GAIN_CREATE_POSTER,
    PATH_GAIN_CREATE_QR,
    PATH_GAIN_CREATE_URL,
    PATH_GAIN_FRIENDS,
    PATH_INTEGRATION_SETTING,
    PATH_LOYALTY,
    PATH_MERCHANT_SETTING,
    // PATH_NOTIFICATION_SETTING,
    PATH_NOTIFICATION_SETTINGS,
    PATH_PERMISSIONS,
    PATH_REWARDS,
    PATH_REWARDS_CREATE,
    PATH_SIGNUP_SETTING,
    PATH_TRAFFIC_SOURCE,
    PATH_USER_PROFILE,
    PATH_SET_THEME,
    PATH_LOYALTY_SET_THEME,
    PATH_LOYALTY_GAIN_FRIENDS,
    PATH_LOYALTY_GAIN_CREATE_URL,
    PATH_LOYALTY_GAIN_CREATE_QR,
    PATH_LOYALTY_GAIN_CREATE_POSTER,
    PATH_LOYALTY_GAIN_CREATE_MENU,
    PATH_HOME_NEW,
    PATH_HOME,
} from "@configs";
const { Header } = Layout;

export const ComponentMenuHeader = () => {
    //page hook
    const { t } = useTranslation();
    const history = useHistory();
    const location = useLocation();
    //redux state
    const pathname = location.pathname;
    const handleClickMenu = (e) => {
        history.push(e.key);
    };

    const isLoyaltyRoutes = (route: string) =>
        route === PATH_ACCEPT_REDEEM ||
        route === PATH_EDIT_POINT ||
        route === PATH_COUPON ||
        route === PATH_REWARDS ||
        route === PATH_BENEFITS ||
        route === PATH_FREE_POINT ||
        route === PATH_LOYALTY ||
        route === PATH_SIGNUP_SETTING ||
        route === PATH_REWARDS_CREATE ||
        route === PATH_COUPON_CREATE ||
        route === PATH_BENEFITS_CREATE ||
        route === PATH_FREE_POINT_CREATE ||
        route === PATH_LOYALTY_SET_THEME ||
        route === PATH_LOYALTY_GAIN_FRIENDS ||
        route === PATH_LOYALTY_GAIN_CREATE_URL ||
        route === PATH_LOYALTY_GAIN_CREATE_QR ||
        route === PATH_LOYALTY_GAIN_CREATE_POSTER ||
        route === PATH_LOYALTY_GAIN_CREATE_MENU ||
        route.includes(PATH_COUPON) ||
        route.includes(PATH_REWARDS) ||
        route.includes(PATH_BENEFITS) ||
        route.includes(PATH_FREE_POINT);
    // route === PATH_CONTACTS ||
    // route.includes(PATH_CONTACTS);

    const isSettingRoutes = (route: string) =>
        route === PATH_MERCHANT_SETTING ||
        route === PATH_ACCOUNT_SETTINGS ||
        route === PATH_TRAFFIC_SOURCE ||
        route === PATH_FEATURE_SETTING ||
        route === PATH_INTEGRATION_SETTING ||
        route === PATH_PERMISSIONS ||
        // route === PATH_NOTIFICATION_SETTING ||
        route === PATH_EDIT_PROFILE ||
        route === PATH_NOTIFICATION_SETTINGS ||
        route === PATH_USER_PROFILE ||
        route === PATH_GAIN_FRIENDS ||
        route === PATH_GAIN_CREATE_URL ||
        route === PATH_GAIN_CREATE_QR ||
        route === PATH_GAIN_CREATE_POSTER ||
        route === PATH_GAIN_CREATE_MENU ||
        route.includes(PATH_TRAFFIC_SOURCE);
    const isContactRoute = (route: string) =>
        route === PATH_CONTACTS || route.includes(PATH_CONTACTS);
    return (
        <StyledMenuHeader>
            <Header>
                <Menu onClick={handleClickMenu} mode="horizontal">
                    <Menu.Item
                        className={
                            pathname === PATH_HOME || pathname === PATH_HOME_NEW
                                ? `ant-menu-item-selected menu-after`
                                : `menu-after`
                        }
                        key="/"
                    >
                        {t("page.home")}
                        <div className="menu-heightlight">
                            <div className="line"></div>
                        </div>
                    </Menu.Item>
                    <Menu.Item
                        className={
                            isLoyaltyRoutes(pathname)
                                ? `ant-menu-item-selected menu-after rewards`
                                : `menu-after rewards`
                        }
                        key="/accept-redeem"
                    >
                        {t("page.loyalty")}
                        <div className="menu-heightlight">
                            <div className="line"></div>
                        </div>
                    </Menu.Item>
                    {/* <Menu.Item
                        className={
                            pathname === "/store-front"
                                ? `ant-menu-item-selected menu-after store-front`
                                : `menu-after store-front`
                        }
                        key="/store-front"
                    >
                        {t("page.store_front")}
                    </Menu.Item> */}
                    {/* <Menu.Item
                        className={
                            pathname === "/line"
                                ? `ant-menu-item-selected menu-after line`
                                : `menu-after line`
                        }
                        key="/line"
                    >
                        {t("page.LINE")}
                    </Menu.Item> */}
                    {/* <Menu.Item
                        className={
                            pathname === "/workflow"
                                ? `ant-menu-item-selected menu-after workflow`
                                : `menu-after workflow`
                        }
                        key="/workflow"
                    >
                        {t("page.workflow")}
                    </Menu.Item> */}
                    {/* <Menu.Item
                        className={
                            pathname === "/help"
                                ? `ant-menu-item-selected menu-after help`
                                : `menu-after help`
                        }
                        key="/help"
                    >
                        {t("page.help")}
                    </Menu.Item> */}
                </Menu>
                <Menu onClick={handleClickMenu} mode="horizontal">
                    <Menu.Item
                        className={
                            isContactRoute(pathname)
                                ? `ant-menu-item-selected menu-after contacts`
                                : `menu-after contacts`
                        }
                        key="/contacts"
                    >
                        <span className="title">
                            <User />
                            {t("page.contact_list")}
                        </span>
                        <div className="menu-heightlight">
                            <div className="line"></div>
                        </div>
                    </Menu.Item>
                    <Menu.Item
                        className={
                            isSettingRoutes(pathname)
                                ? `ant-menu-item-selected menu-after edit-profile`
                                : `menu-after edit-profile`
                        }
                        key="/edit-profile"
                    >
                        <span className="title">
                            <IconSetting size={23} />
                            {t("page.settings")}
                        </span>
                        <div className="menu-heightlight">
                            <div className="line"></div>
                        </div>
                    </Menu.Item>
                </Menu>
            </Header>
        </StyledMenuHeader>
    );
};
