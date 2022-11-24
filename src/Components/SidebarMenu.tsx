import { Badge, Drawer, Layout, Menu, Avatar, Select, Spin } from "antd";

import { useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MenuMode, MenuTheme } from "antd/lib/menu";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useState, useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import { capitalize, useNotify } from "@utils";
import { StyledSidebar } from "@components";
import {
    LoyaltyMenu,
    PointStar,
    IconList,
    IconPermission,
    IconManage,
    // IconPayment,
    IconPricing,
    Friend,
    IconSetting,
    IconTheme,
    ThinArrow,
    IconContact,
} from "@components";
import { ModuleCurrentPlan } from "@modules";
import {
    selectApp,
    setMobileDrawer,
    useAppSelector,
    selectAuth,
    selectTheme,
    setMobileMenu,
} from "@redux";
import {
    enumLoyaltyMenu,
    enumPermission,
    PATH_ACCEPT_REDEEM,
    PATH_ACCOUNT_SETTINGS,
    PATH_BENEFITS,
    PATH_CHOOSE_PLAN,
    PATH_BENEFITS_CREATE,
    PATH_COUPON,
    PATH_COUPON_CREATE,
    PATH_FREE_POINT_CREATE,
    PATH_CURRENT_PLAN,
    PATH_EDIT_POINT,
    PATH_EDIT_PROFILE,
    PATH_FEATURE_SETTING,
    PATH_FREE_POINT,
    PATH_NOTIFICATION_SETTING,
    PATH_HOME,
    PATH_INTEGRATION_SETTING,
    PATH_LOYALTY,
    PATH_MERCHANT_SETTING,
    PATH_REWARDS_CREATE,
    PATH_PERMISSIONS,
    PATH_REWARDS,
    PATH_SIGNUP_SETTING,
    PATH_TRAFFIC_SOURCE,
    PATH_CONTACTS,
    PATH_NOTIFICATION_SETTINGS,
    PATH_USER_PROFILE,
    PATH_GAIN_FRIENDS,
    PATH_GAIN_CREATE_URL,
    PATH_GAIN_CREATE_QR,
    PATH_GAIN_CREATE_POSTER,
    PATH_GAIN_CREATE_MENU,
    enumMobileSidebar,
    PATH_SET_THEME,
    PATH_LOYALTY_SET_THEME,
    PATH_LOYALTY_GAIN_FRIENDS,
    PATH_LOYALTY_GAIN_CREATE_URL,
    PATH_LOYALTY_GAIN_CREATE_QR,
    PATH_LOYALTY_GAIN_CREATE_POSTER,
    PATH_LOYALTY_GAIN_CREATE_MENU,
    PATH_HOME_NEW,
} from "@configs";

const { SubMenu } = Menu;
const { Sider } = Layout;
const { Option } = Select;

const getKey = (name: string, index: number) => {
    const string = `${name}-${index}`;
    const key = string.replace(" ", "-");
    return key.charAt(0).toLowerCase() + key.slice(1);
};

interface ISideBarRoute {
    path?: string;
    name: string;
    icon: JSX.Element;
    permission?: string;
    children?: Array<{
        path: string;
        name: string;
        permission?: string;
        badge?: {
            value: string;
        };
    }>;
    badge?: {
        value: string;
    };
}
interface IMobileMenu {
    name: enumMobileSidebar;
}
interface ISideBarMobileRoute {
    path?: string;
    name: string;
    icon: JSX.Element;
    permission?: string;
    children: Array<{
        name: string;
        icon?: JSX.Element;
        path?: string;
        permission?: string;
        children: Array<{
            name: string;
            icon?: JSX.Element;
            path: string;
            permission?: string;
        }>;
        // badge?: {
        //     value: string;
        // };
    }>;
    badge?: {
        value: string;
    };
}
const mobileSidebarMenu: IMobileMenu[] = [
    {
        name: enumMobileSidebar.LOYALTY,
    },
    {
        name: enumMobileSidebar.SETTINGS,
    },
    {
        name: enumMobileSidebar.CONTACTS,
    },
];
const settingRoutes: ISideBarRoute[] = [
    {
        path: PATH_SET_THEME,
        name: "set_theme",
        permission: enumPermission.MANAGE_ROLE,
        icon: <IconTheme size={24} color={"#f22f46"} />,
        children: [],
    },
    {
        path: PATH_GAIN_FRIENDS,
        name: "gain_friends",
        icon: <Friend size={24} color={"#f22f46"} />,
        permission: enumPermission.MANAGE_CONTACT,
        children: [],
    },
    {
        // path: "/",
        name: "user_info",
        icon: <IconList size={24} color={"#f22f46"} />,
        children: [
            {
                path: PATH_EDIT_PROFILE,
                name: "edit_profile",
                permission: enumPermission.MANAGE_CONTACT,
            },
            {
                path: PATH_NOTIFICATION_SETTINGS,
                name: "noti_settings",
                permission: enumPermission.MANAGE_CONTACT,
            },
        ],
    },
    {
        path: PATH_PERMISSIONS,
        name: "manage_permissions",
        icon: <IconPermission size={24} color={"#f22f46"} />,
        permission: enumPermission.MANAGE_CONTACT,
        children: [],
    },
    {
        name: "settings",
        icon: <IconManage size={24} color={"#f22f46"} />,
        children: [
            // {
            //     path: PATH_MERCHANT_SETTING,
            //     name: "account_settings",
            //     permission: enumPermission.MANAGE_SETTING,
            // },
            {
                path: PATH_TRAFFIC_SOURCE,
                name: "traffic_source",
                permission: enumPermission.MANAGE_SETTING,
            },
            {
                path: PATH_FEATURE_SETTING,
                name: "features_settings",
                permission: enumPermission.MANAGE_SETTING,
            },
            {
                path: PATH_INTEGRATION_SETTING,
                name: "integrations",
                permission: enumPermission.MANAGE_SETTING,
            },
            {
                path: PATH_PERMISSIONS,
                name: "manage_permissions",
                permission: enumPermission.MANAGE_ROLE,
            },
        ],
    },
    {
        path: PATH_FEATURE_SETTING,
        name: "pricing_features",
        permission: enumPermission.MANAGE_ROLE,
        icon: <IconPricing size={24} color={"#f22f46"} />,
        children: [],
    },
];
const loyaltyRoutes: ISideBarRoute[] = [
    {
        path: "/",
        name: enumLoyaltyMenu.POINTS,
        icon: <PointStar size={24} color={"#f22f46"} />,
        children: [
            // {
            //     path: PATH_CONTACTS,
            //     name: "contacts",
            //     permission: enumPermission.MANAGE_CONTACT,
            // },
            // {
            //     path: PATH_LOYALTY_GAIN_FRIENDS,
            //     name: "gain_friends",
            //     permission: enumPermission.MANAGE_CONTACT,
            // },
            // {
            //     path: PATH_LOYALTY_SET_THEME,
            //     name: "set_theme",
            //     permission: enumPermission.MANAGE_ROLE,
            // },
            {
                path: PATH_ACCEPT_REDEEM,
                name: "accept_point",
                permission: enumPermission.MANAGE_CONTACT,
            },
            {
                path: PATH_EDIT_POINT,
                name: "edit_points_member",
                permission: enumPermission.MANAGE_CONTACT,
            },
        ],
    },
    {
        name: enumLoyaltyMenu.LOYALTY,
        icon: <LoyaltyMenu size={24} color={"#f22f46"} />,
        children: [
            {
                path: PATH_REWARDS,
                name: "rewards",
                permission: enumPermission.MANAGE_LOYALTY,
            },
            {
                path: PATH_BENEFITS,
                name: "member_benefits",
                permission: enumPermission.MANAGE_LOYALTY,
            },
            {
                path: PATH_COUPON,
                name: "coupons",
                permission: enumPermission.MANAGE_LOYALTY,
            },
            {
                path: PATH_FREE_POINT,
                name: "free_points",
                permission: enumPermission.MANAGE_LOYALTY,
            },
            {
                path: PATH_LOYALTY,
                name: "loyalty_rules",
                permission: enumPermission.MANAGE_LOYALTY,
            },
            {
                path: PATH_SIGNUP_SETTING,
                name: "user_sign_up_settings",
                permission: enumPermission.MANAGE_LOYALTY,
            },
        ],
    },
    {
        path: PATH_GAIN_FRIENDS,
        name: "gain_friends",
        icon: <Friend size={24} color={"#f22f46"} />,
        permission: enumPermission.MANAGE_CONTACT,
        children: [],
    },
    {
        path: PATH_MERCHANT_SETTING,
        name: "set_theme",
        permission: enumPermission.MANAGE_ROLE,
        icon: <IconTheme size={24} color={"#f22f46"} />,
        children: [],
    },
];
const contactRoutes: ISideBarRoute[] = [
    {
        path: PATH_CONTACTS,
        name: "contacts_title",
        permission: enumPermission.MANAGE_CONTACT,
        icon: <IconContact size={24} color={"#f22f46"} />,
        children: [],
    },
    {
        path: PATH_GAIN_FRIENDS,
        name: "gain_friends",
        icon: <Friend size={24} color={"#f22f46"} />,
        permission: enumPermission.MANAGE_CONTACT,
        children: [],
    },
    {
        path: PATH_MERCHANT_SETTING,
        name: "set_theme",
        permission: enumPermission.MANAGE_ROLE,
        icon: <IconTheme size={24} color={"#f22f46"} />,
        children: [],
    },
];
const mobileRoutes: ISideBarMobileRoute[] = [
    {
        path: "/loyalty",
        name: "loyalty",
        icon: <IconPermission size={24} color={"#f22f46"} />,
        children: [
            {
                name: "points",
                icon: <PointStar size={24} color={"#f22f46"} />,
                children: [
                    {
                        path: PATH_CONTACTS,
                        name: "contacts",
                        permission: enumPermission.MANAGE_CONTACT,
                    },
                    {
                        path: PATH_ACCEPT_REDEEM,
                        name: "accept_point",
                        permission: enumPermission.MANAGE_CONTACT,
                    },
                    {
                        path: PATH_EDIT_POINT,
                        name: "edit_points_member",
                        permission: enumPermission.MANAGE_CONTACT,
                    },
                ],
            },
            {
                name: "loyalty_features",
                icon: <LoyaltyMenu size={24} color={"#f22f46"} />,
                children: [
                    {
                        path: PATH_REWARDS,
                        name: "rewards",
                        permission: enumPermission.MANAGE_LOYALTY,
                    },
                    {
                        path: PATH_BENEFITS,
                        name: "member_benefits",
                        permission: enumPermission.MANAGE_LOYALTY,
                    },
                    {
                        path: PATH_COUPON,
                        name: "coupons",
                        permission: enumPermission.MANAGE_LOYALTY,
                    },
                    {
                        path: PATH_FREE_POINT,
                        name: "free_points",
                        permission: enumPermission.MANAGE_LOYALTY,
                    },
                    {
                        path: PATH_LOYALTY,
                        name: "loyalty_rules",
                        permission: enumPermission.MANAGE_LOYALTY,
                    },
                    {
                        path: PATH_SIGNUP_SETTING,
                        name: "user_sign_up_settings",
                        permission: enumPermission.MANAGE_LOYALTY,
                    },
                ],
            },
        ],
    },
    {
        path: "/",
        name: "store_front",
        icon: <IconPermission size={24} color={"#f22f46"} />,
        children: [],
    },
    {
        path: "/contact",
        name: "contact",
        icon: <IconPermission size={24} color={"#f22f46"} />,
        children: [],
    },
    {
        path: "/settings",
        name: "settings",
        icon: <IconPermission size={24} color={"#f22f46"} />,
        children: [
            {
                name: "user_info",
                icon: <IconList size={24} color={"#f22f46"} />,
                children: [
                    {
                        path: PATH_EDIT_PROFILE,
                        name: "edit_profile",
                        permission: enumPermission.MANAGE_CONTACT,
                    },
                    {
                        path: PATH_NOTIFICATION_SETTINGS,
                        name: "noti_settings",
                        permission: enumPermission.MANAGE_CONTACT,
                    },
                ],
            },
            {
                path: "/permissions",
                name: "manage_permissions",
                permission: enumPermission.MANAGE_CONTACT,
                icon: <IconPermission size={24} color={"#f22f46"} />,
                children: [],
            },
            {
                path: PATH_GAIN_FRIENDS,
                name: "gain_friends",
                icon: <Friend size={24} color={"#f22f46"} />,
                permission: enumPermission.MANAGE_CONTACT,
                children: [],
            },
            {
                name: "settings",
                icon: <IconManage size={24} color={"#f22f46"} />,
                children: [
                    {
                        path: PATH_MERCHANT_SETTING,
                        name: "account_settings",
                        permission: enumPermission.MANAGE_SETTING,
                    },
                    {
                        path: PATH_TRAFFIC_SOURCE,
                        name: "traffic_source",
                        permission: enumPermission.MANAGE_SETTING,
                    },
                    {
                        path: PATH_FEATURE_SETTING,
                        name: "features_settings",
                        permission: enumPermission.MANAGE_SETTING,
                    },
                    {
                        path: PATH_INTEGRATION_SETTING,
                        name: "integrations",
                        permission: enumPermission.MANAGE_SETTING,
                    },
                    {
                        path: PATH_PERMISSIONS,
                        name: "manage_permissions",
                        permission: enumPermission.MANAGE_ROLE,
                    },
                ],
            },
            // {
            //     path: "/payments",
            //     name: "payments",
            //     icon: <IconPayment size={24} color={"#f22f46"} />,
            //     children: [],
            //     permission: enumPermission.MANAGE_CONTACT,
            // },
            {
                path: PATH_FEATURE_SETTING,
                name: "pricing_features",
                icon: <IconPricing size={24} color={"#f22f46"} />,
                children: [],
                permission: enumPermission.MANAGE_CONTACT,
            },
        ],
    },
];
interface IProps {
    sidebarTheme: MenuTheme;
    sidebarMode: MenuMode;
    sidebarIcons: boolean;
    collapsed: boolean;
}

export const ComponentSidebar = ({
    sidebarTheme,
    sidebarMode,
    sidebarIcons,
    collapsed,
}: IProps) => {
    //hook
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { warning } = useNotify();
    const sidebarRef = useRef();
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    //redux state
    const app = useAppSelector(selectApp);
    const { userInfo } = useSelector(selectAuth);
    const Theme = useSelector(selectTheme);
    const allowPermissions: string[] = userInfo?.role?.permissions || [];
    //page state
    const [showCurrentPlan, setShowCUrrentPlan] = useState<boolean>(false);
    // const [openKeys, setOpenKeys] = useState<string[]>([]);
    const [selectMenu, setSelectMenuTitle] = useState<enumMobileSidebar>(enumMobileSidebar.LOYALTY);
    const [sidebarLoading, setSidebarLoading] = useState<boolean>(false);
    const [openMenu, setOpenMenu] = useState([]);
    const pathname = location.pathname;
    const urlImage = Theme.logo;
    useEffect(() => {
        if (sidebarRef.current) {
            //@ts-ignore
            sidebarRef.current.scrollIntoView({
                behavior: "auto",
                block: "center",
                inline: "nearest",
            });
        }
        handleOpenSidebar(pathname);
    }, [pathname]);

    const noSidebarRoute = () =>
        location.pathname === PATH_HOME ||
        location.pathname === PATH_HOME_NEW ||
        location.pathname === PATH_CONTACTS ||
        location.pathname === PATH_NOTIFICATION_SETTING ||
        location.pathname.includes(PATH_CONTACTS);

    const handleOpenSidebar = (route) => {
        if (isLoyaltyRoutes(route)) {
            setOpenKeys(["0", "1"]); // cannot use string of route.
        }
        if (isSettingRoutes(route)) {
            setOpenKeys(["4", "2"]);
        }
    };
    // const isHomePage = () => pathname === PATH_HOME;

    const isLoyaltyRoutes = (route: string) =>
        route === PATH_ACCEPT_REDEEM ||
        route === PATH_EDIT_POINT ||
        route === PATH_COUPON ||
        route === PATH_REWARDS ||
        route === PATH_BENEFITS ||
        route === PATH_FREE_POINT ||
        route === PATH_LOYALTY ||
        route === PATH_SIGNUP_SETTING ||
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

    const isSettingRoutes = (route: string) =>
        route === PATH_MERCHANT_SETTING ||
        route === PATH_ACCOUNT_SETTINGS ||
        route === PATH_TRAFFIC_SOURCE ||
        route === PATH_FEATURE_SETTING ||
        route === PATH_INTEGRATION_SETTING ||
        route === PATH_PERMISSIONS ||
        route === PATH_EDIT_PROFILE ||
        route === PATH_NOTIFICATION_SETTINGS ||
        route === PATH_USER_PROFILE ||
        route === PATH_GAIN_FRIENDS ||
        route === PATH_GAIN_CREATE_URL ||
        route === PATH_GAIN_CREATE_QR ||
        route === PATH_GAIN_CREATE_POSTER ||
        route === PATH_GAIN_CREATE_MENU ||
        route === PATH_SET_THEME ||
        route.includes(PATH_TRAFFIC_SOURCE);

    const badgeTemplate = (badge: { value: string }) => <Badge count={badge.value} />;

    const switchRoute = (path: string, permission?: string, index?: string) => {
        if (app.mobile) dispatch(setMobileDrawer(!app.mobileDrawer));
        if (permission) {
            if (!allowPermissions.includes(permission)) {
                warning(t("message.not_permission"));
            } else {
                history.push(path);
            }
        } else if (path === PATH_CURRENT_PLAN) {
            setShowCUrrentPlan(true);
        } else {
            history.push(path);
        }
        // console.log(sidebarRef);
    };

    const upgradePlan = useCallback(() => {
        history.push(PATH_CHOOSE_PLAN);
    }, []);

    const closeCurrentPlan = () => {
        setShowCUrrentPlan(false);
    };
    const handleOpenKey = (e) => {
        setOpenKeys([...openKeys, e.key]);
    };
    const loyaltyMenu = (
        <>
            <Menu
                theme={sidebarTheme}
                className="border-0 scroll-y "
                style={{ flex: 1 }}
                mode={sidebarMode}
                defaultOpenKeys={["0", "1"]}
                onClick={handleOpenKey}
            >
                {loyaltyRoutes.map((route, index) => {
                    if (!route.children) {
                        return (
                            <Menu.Item
                                key={index}
                                className={
                                    pathname === route.path
                                        ? `ant-menu-item-selected menu-after ${route.path}`
                                        : `menu-after ${route.path}`
                                }
                                onClick={() => switchRoute(route.path || "/", "", index.toString())}
                            >
                                <div>
                                    {sidebarIcons && (
                                        <span style={{ marginBottom: 5 }} className="anticon">
                                            {route.icon}
                                        </span>
                                    )}
                                    <span
                                        className="mr-2 menu-item-text"
                                        style={{
                                            color: "black",
                                            fontWeight: 700,
                                            fontSize: 16,
                                        }}
                                    >
                                        {capitalize(t("page.sidebar." + route.name))}
                                    </span>
                                    {route.badge && badgeTemplate(route.badge)}
                                </div>
                            </Menu.Item>
                        );
                    } else {
                        return (
                            <SubMenu
                                className={`menu-after ${route.name}`}
                                key={index}
                                onTitleClick={() => {
                                    if (route.path && route.permission) {
                                        switchRoute(
                                            route.path,
                                            route.permission || "",
                                            index.toString()
                                        );
                                    }
                                }}
                                title={
                                    <span>
                                        {sidebarIcons && (
                                            <span className="anticon" style={{ marginBottom: 5 }}>
                                                {route.icon}
                                            </span>
                                        )}
                                        <span
                                            className="menu-item-text"
                                            style={{
                                                color: "black",
                                                fontWeight: 700,
                                                fontSize: 16,
                                            }}
                                        >
                                            {capitalize(t("page.sidebar." + route.name))}
                                        </span>
                                        {route.badge && badgeTemplate(route.badge)}
                                    </span>
                                }
                            >
                                {route.children.map((subitem, index) => (
                                    <Menu.Item
                                        disabled={
                                            !allowPermissions.includes(subitem.permission || "")
                                        }
                                        key={getKey(subitem.name, index)}
                                        style={{ paddingLeft: 60 }}
                                        className={
                                            pathname === subitem.path
                                                ? `ant-menu-item-selected sub-item-text ${route}`
                                                : ` sub-item-text ${route}`
                                        }
                                        onClick={() =>
                                            switchRoute(subitem.path, subitem.permission || "")
                                        }
                                    >
                                        <div
                                            className={subitem.path}
                                            //@ts-ignore
                                            ref={
                                                pathname.includes(subitem.path) ? sidebarRef : null
                                            }
                                        >
                                            <span
                                                className="mr-auto"
                                                style={
                                                    subitem.path && pathname.includes(subitem.path)
                                                        ? {
                                                              color: "black",
                                                              fontSize: 16,
                                                              fontWeight: 700,
                                                          }
                                                        : { color: "#646464", fontSize: 16 }
                                                }
                                            >
                                                {capitalize(t("page.sidebar." + subitem.name))}
                                            </span>
                                            {subitem.badge && badgeTemplate(subitem.badge)}
                                        </div>
                                    </Menu.Item>
                                ))}
                            </SubMenu>
                        );
                    }
                })}
            </Menu>
        </>
    );
    const settingMenu = (
        <>
            <Menu
                theme={sidebarTheme}
                className="border-0 scroll-y "
                style={{ flex: 1 }}
                mode={sidebarMode}
                defaultOpenKeys={["2", "4"]}
                onClick={handleOpenKey}
            >
                {settingRoutes.map((route, index) => {
                    if (!route.children) {
                        console.log(route);
                        return (
                            <Menu.Item
                                key={index}
                                className={
                                    pathname === route.path
                                        ? `ant-menu-item-selected menu-after ${route.path}`
                                        : `menu-after ${route.path}`
                                }
                                onClick={() => switchRoute(route.path || "/", "", index.toString())}
                            >
                                <div>
                                    {sidebarIcons && (
                                        <span style={{ marginBottom: 5 }} className="anticon">
                                            {route.icon}
                                        </span>
                                    )}
                                    <span
                                        className="mr-2 menu-item-text"
                                        style={{
                                            color: "black",
                                            fontWeight: 700,
                                            fontSize: 16,
                                        }}
                                    >
                                        {capitalize(t("page.sidebar." + route.name))}
                                    </span>
                                    {route.badge && badgeTemplate(route.badge)}
                                </div>
                            </Menu.Item>
                        );
                    } else {
                        return (
                            <SubMenu
                                className={`menu-after ${route.name}`}
                                key={index}
                                onTitleClick={() => {
                                    if (route.path && route.permission) {
                                        switchRoute(
                                            route.path,
                                            route.permission || "",
                                            index.toString()
                                        );
                                    }
                                }}
                                title={
                                    <span>
                                        {sidebarIcons && (
                                            <span className="anticon" style={{ marginBottom: 5 }}>
                                                {route.icon}
                                            </span>
                                        )}
                                        <span
                                            className="menu-item-text"
                                            style={{
                                                color: "black",
                                                fontWeight: 700,
                                                fontSize: 16,
                                            }}
                                        >
                                            {capitalize(t("page.sidebar." + route.name))}
                                        </span>
                                        {route.badge && badgeTemplate(route.badge)}
                                    </span>
                                }
                            >
                                {route.children.map((subitem, secondIndex) => (
                                    <Menu.Item
                                        disabled={
                                            !allowPermissions.includes(subitem.permission || "")
                                        }
                                        key={getKey(subitem.name, secondIndex)}
                                        style={{ paddingLeft: 60 }}
                                        className={
                                            pathname === subitem.path
                                                ? `ant-menu-item-selected sub-item-text`
                                                : ` sub-item-text`
                                        }
                                        onClick={() =>
                                            switchRoute(
                                                subitem.path,
                                                subitem.permission || "",
                                                index.toString()
                                            )
                                        }
                                    >
                                        <div
                                            className={subitem.path}
                                            //@ts-ignore
                                            ref={
                                                pathname.includes(subitem.path) ? sidebarRef : null
                                            }
                                        >
                                            <span
                                                className="mr-auto"
                                                style={
                                                    subitem.path && pathname.includes(subitem.path)
                                                        ? {
                                                              color: "black",
                                                              fontSize: 16,
                                                              fontWeight: 700,
                                                          }
                                                        : { color: "#646464", fontSize: 16 }
                                                }
                                            >
                                                {capitalize(t("page.sidebar." + subitem.name))}
                                            </span>
                                            {subitem.badge && badgeTemplate(subitem.badge)}
                                        </div>
                                    </Menu.Item>
                                ))}
                            </SubMenu>
                        );
                    }
                })}
            </Menu>
        </>
    );
    const contactMenu = (
        <>
            <Menu
                theme={sidebarTheme}
                className="border-0 scroll-y "
                style={{ flex: 1 }}
                mode={sidebarMode}
                defaultOpenKeys={["0", "3"]}
                onClick={handleOpenKey}
            >
                {contactRoutes.map((route, index) => {
                    if (!route.children) {
                        return (
                            <Menu.Item
                                key={index}
                                className={
                                    pathname === route.path
                                        ? `ant-menu-item-selected menu-after ${route.path}`
                                        : `menu-after ${route.path}`
                                }
                                onClick={() => switchRoute(route.path || "/", "")}
                            >
                                <div>
                                    {sidebarIcons && (
                                        <span style={{ marginBottom: 5 }} className="anticon">
                                            {route.icon}
                                        </span>
                                    )}
                                    <span
                                        className="mr-2 menu-item-text"
                                        style={{
                                            color: "black",
                                            fontWeight: 700,
                                            fontSize: 16,
                                        }}
                                    >
                                        {capitalize(t("page.sidebar." + route.name))}
                                    </span>
                                    {route.badge && badgeTemplate(route.badge)}
                                </div>
                            </Menu.Item>
                        );
                    } else {
                        return (
                            <SubMenu
                                className={`menu-after ${route.name}`}
                                key={index}
                                onTitleClick={() => {
                                    if (route.path && route.permission) {
                                        switchRoute(route.path, route.permission || "");
                                    }
                                }}
                                title={
                                    <span>
                                        {sidebarIcons && (
                                            <span className="anticon" style={{ marginBottom: 5 }}>
                                                {route.icon}
                                            </span>
                                        )}
                                        <span
                                            className="menu-item-text"
                                            style={{
                                                color: "black",
                                                fontWeight: 700,
                                                fontSize: 16,
                                            }}
                                        >
                                            {capitalize(t("page.sidebar." + route.name))}
                                        </span>
                                        {route.badge && badgeTemplate(route.badge)}
                                    </span>
                                }
                            >
                                {route.children.map((subitem, index) => (
                                    <Menu.Item
                                        disabled={
                                            !allowPermissions.includes(subitem.permission || "")
                                        }
                                        key={getKey(subitem.name, index)}
                                        style={{ paddingLeft: 60 }}
                                        className={
                                            pathname === subitem.path
                                                ? `ant-menu-item-selected sub-item-text`
                                                : ` sub-item-text`
                                        }
                                        onClick={() =>
                                            switchRoute(subitem.path, subitem.permission || "")
                                        }
                                    >
                                        <div
                                            className={subitem.path}
                                            //@ts-ignore
                                            ref={
                                                pathname.includes(subitem.path) ? sidebarRef : null
                                            }
                                        >
                                            <span
                                                className="mr-auto"
                                                style={
                                                    subitem.path && pathname.includes(subitem.path)
                                                        ? {
                                                              color: "black",
                                                              fontSize: 16,
                                                              fontWeight: 700,
                                                          }
                                                        : { color: "#646464", fontSize: 16 }
                                                }
                                            >
                                                {capitalize(t("page.sidebar." + subitem.name))}
                                            </span>
                                            {subitem.badge && badgeTemplate(subitem.badge)}
                                        </div>
                                    </Menu.Item>
                                ))}
                            </SubMenu>
                        );
                    }
                })}
            </Menu>
        </>
    );
    const mobileMenu = (
        <>
            <Menu
                theme={sidebarTheme}
                className="border-0 scroll-y "
                style={{ flex: 1 }}
                mode={sidebarMode}
                // defaultOpenKeys={openKeys}
                onClick={handleOpenKey}
            >
                {mobileRoutes.map((route, index) => (
                    <SubMenu
                        className={`menu-after ${route.name}`}
                        key={index}
                        // onTitleClick={() => setOpenKeys([...openKeys, index])}
                        title={
                            <span>
                                <span
                                    className="menu-item-text"
                                    style={{
                                        color: "black",
                                        fontWeight: 700,
                                        fontSize: 16,
                                    }}
                                >
                                    {capitalize(t("page.sidebar." + route.name))}
                                </span>
                            </span>
                        }
                    >
                        {route.children.map((subRoute, index) => (
                            <SubMenu
                                className={`menu-after ${subRoute.name}`}
                                key={route.name + index}
                                onTitleClick={() => {
                                    if (subRoute.path && subRoute.permission) {
                                        switchRoute(subRoute.path, subRoute.permission || "");
                                    }
                                }}
                                title={
                                    <span>
                                        {sidebarIcons && (
                                            <span className="anticon" style={{ marginBottom: 5 }}>
                                                {subRoute.icon}
                                            </span>
                                        )}
                                        <span
                                            className="menu-item-text"
                                            style={{
                                                color: "black",
                                                fontWeight: 700,
                                                fontSize: 16,
                                            }}
                                        >
                                            {capitalize(t("page.sidebar." + subRoute.name))}
                                        </span>
                                    </span>
                                }
                            >
                                {subRoute.children.map((subitem, index) => (
                                    <Menu.Item
                                        disabled={
                                            !allowPermissions.includes(subitem.permission || "")
                                        }
                                        key={subitem.name + index}
                                        style={{ paddingLeft: 60 }}
                                        onClick={() =>
                                            switchRoute(subitem.path, subitem.permission || "")
                                        }
                                    >
                                        <div
                                            className={subitem.path}
                                            //@ts-ignore
                                            ref={
                                                pathname.includes(subitem.path) ? sidebarRef : null
                                            }
                                        >
                                            <span
                                                className="mr-auto"
                                                style={
                                                    subitem.path && pathname.includes(subitem.path)
                                                        ? {
                                                              color: "black",
                                                              fontSize: 16,
                                                              fontWeight: 700,
                                                          }
                                                        : { color: "#646464", fontSize: 16 }
                                                }
                                            >
                                                {capitalize(t("page.sidebar." + subitem.name))}
                                            </span>
                                        </div>
                                    </Menu.Item>
                                ))}
                            </SubMenu>
                        ))}
                    </SubMenu>
                ))}
            </Menu>
        </>
    );
    const handleChangeMenu = (value: enumMobileSidebar) => {
        setSidebarLoading(true);
        dispatch(setMobileMenu(value));
        setTimeout(() => {
            setSidebarLoading(false);
        }, 700);
    };
    return (
        <>
            {/* web version sidebar */}
            {!noSidebarRoute() && (
                <div className="side-bar-menu">
                    <ModuleCurrentPlan
                        visible={showCurrentPlan}
                        onClose={closeCurrentPlan}
                        handleUpgrade={upgradePlan}
                    />
                    <StyledSidebar>
                        {!app.mobile && (
                            <div className="sidebar-wrap">
                                <Sider
                                    width={240}
                                    className={`bg-${sidebarTheme}`}
                                    theme={sidebarTheme}
                                    collapsed={collapsed}
                                >
                                    {isLoyaltyRoutes(pathname) && loyaltyMenu}
                                    {isSettingRoutes(pathname) && settingMenu}
                                </Sider>
                            </div>
                        )}
                    </StyledSidebar>
                </div>
            )}
            {/* mobile version sidebar */}
            <Drawer
                closable={false}
                width={275}
                placement={"left"}
                onClose={() => dispatch(setMobileDrawer(!app.mobileDrawer))}
                visible={app.mobileDrawer}
                // visible={true}
                className="sidebar-drawer"
            >
                <StyledSidebar>
                    <div
                        style={{
                            overflow: "hidden",
                            flex: "1 1 auto",
                            flexDirection: "column",
                            display: "flex",
                            height: "100vh",
                        }}
                    >
                        <div className="sidebar-layout">
                            <ComponentSidebarDropdown
                                onChange={handleChangeMenu}
                                value={app.currentMenu}
                            />
                            <div onClick={() => handleChangeMenu(enumMobileSidebar.SETTINGS)}>
                                <IconSetting color="#6C7084" size={24} />
                            </div>
                        </div>
                        {sidebarLoading ? (
                            <Spin />
                        ) : (
                            <div>
                                {app.currentMenu === enumMobileSidebar.LOYALTY && (
                                    <>{loyaltyMenu}</>
                                )}
                                {app.currentMenu === enumMobileSidebar.SETTINGS && (
                                    <>{settingMenu}</>
                                )}
                                {app.currentMenu === enumMobileSidebar.CONTACTS && (
                                    <>{contactMenu}</>
                                )}
                            </div>
                        )}
                    </div>
                </StyledSidebar>
            </Drawer>
        </>
    );
};

interface Iprops {
    onChange: (value: enumMobileSidebar) => void;
    value: enumMobileSidebar;
}
const ComponentSidebarDropdown = (props: Iprops) => {
    const { t } = useTranslation();
    return (
        <StyledDropdown>
            <Select value={props.value} onChange={props.onChange} suffixIcon={<ThinArrow />}>
                {/*  */}
                {mobileSidebarMenu.map((item) => (
                    <Option key={item.name}>{capitalize(t("page.sidebar." + item.name))}</Option>
                ))}
            </Select>
        </StyledDropdown>
    );
};
const StyledDropdown = styled.div`
    .ant-select {
        width: 200px;
        height: 45px;
        .ant-select-selection {
            height: 100%;
            background: #f22f46;
            border-color: #f22f46;
            color: #fff;
            font-weight: bold;
            &:hover,
            :focus,
            :focus-within {
                border-color: #f22f46 !important;
            }
            .ant-select-arrow {
                color: #fff;
            }
            .ant-select-selection__rendered {
                height: 100%;
                display: flex;
                align-items: center;
                font-size: 16px;
            }
            .ant-select-arrow {
                top: 39% !important;
                svg {
                    transition: 0.3s;
                }
            }
        }
    }
    .ant-select-open {
        .ant-select-selection {
            .ant-select-arrow {
                svg {
                    transform: rotate(180deg);
                }
            }
        }
    }
`;
