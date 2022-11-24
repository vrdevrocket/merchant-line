import { Route, useHistory, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { IRoute } from "@interfaces";
import { LayoutApp } from "@layouts";
import { ModuleUpgradePlan } from "@modules";
import {
    authRoutes,
    enumStatus,
    normalRoutes,
    PATH_ACCOUNTS,
    PATH_ACCOUNT_SETTINGS,
    PATH_BENEFITS,
    PATH_CHOOSE_PLAN,
    PATH_COUPON,
    PATH_CREATE_BUSINESS,
    PATH_CREATE_PASSWORD,
    PATH_FREE_POINT,
    PATH_HOME,
    // PATH_HOME_NEW,
    PATH_LOGIN,
    PATH_NOTIFICATION_SETTING,
    PATH_REWARDS,
    PATH_SEGMENTS,
    PATH_TRAFFIC_SOURCE,
    PATH_USER_SIGNUP,
} from "@configs";
import { logout, selectAuth, setPlan } from "@redux";
import { theme, useNotify } from "@utils";
import { authApi } from "@api";
// import { onMessageListener } from "src/firebaseInit";
// import { ModuleUserGuideModal } from "src/Modules/UserGuideModal";
import { useMediaQuery } from "react-responsive";

interface INotify {
    body: string;
    title: string;
}

export const ComponentAppRoute = (props: IRoute) => {
    //page props
    const { path, exact } = props;
    //page hook
    const history = useHistory();
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const { warning } = useNotify();
    const { t } = useTranslation();
    const { info } = useNotify();
    //redux state
    const { auth, userInfo, plan } = useSelector(selectAuth);
    const allowPermissions: string[] = userInfo?.role?.permissions || [];
    //states
    const [visible, setVisible] = useState(false);
    //WHAT: check user login
    const token = auth?.accessToken;

    const Component = props.component;
    const Layout = props.layout || LayoutApp;
    const isMobile = useMediaQuery({ query: `(max-width: ${theme.breakPoints.breakTablet})` });

    useEffect(() => {
        if (userInfo && token && typeof userInfo === "object") {
            if (userInfo.merchant?.status === enumStatus.INACTIVE) {
                // if not create yet merchant
                if (userInfo._id && userInfo.merchant?.businessName === "") {
                    // if (pathname !== PATH_CHOOSE_PLAN) history.push(PATH_CREATE_BUSINESS);
                    history.push(PATH_CREATE_BUSINESS); // got to step by step flow
                } else if (userInfo.merchant?.businessName) {
                    // history.push(PATH_CHOOSE_PLAN);
                    history.push(PATH_HOME);
                } else {
                    dispatch(logout());
                }
            } else if (userInfo.merchant?.status === enumStatus.ACTIVE) {
                // if not create yet merchant busines
                if (
                    pathname !== PATH_ACCOUNT_SETTINGS &&
                    (userInfo.merchant?.businessName === "" ||
                        userInfo.merchant?.businessName === null)
                ) {
                    if (!isMobile) {
                        history.push(PATH_ACCOUNT_SETTINGS);
                    }
                }
            }
            const planId = userInfo?.merchant?.planId;
            if (planId) fetchPlan(planId);
        }
    }, [userInfo]);

    // WHAT: check valid route
    useEffect(() => {
        //WHAT: check normal path
        const isNormalRoute =
            pathname === PATH_HOME
                ? true
                : normalRoutes.some((item: string) => {
                      if (item === PATH_HOME) {
                          return false;
                      }
                      return pathname.includes(item);
                  });

        //WHAT: check a uth path
        const isAuthRoute = authRoutes.some((item: string) => pathname.includes(item));
        if (token) {
            checkPlan(pathname);
            checkPermission(isAuthRoute);
            checkAdminPane(pathname);
        } else if (isNormalRoute && !pathname.includes(PATH_CREATE_PASSWORD)) {
            history.push(PATH_LOGIN);
        }
    }, [pathname, auth]);
    // useEffect(() => {
    //     // @ts-ignore
    //     LOU.startTour(LOU_ID, false);
    // });
    //WHAT: getPlan
    const fetchPlan = async (planId: string) => {
        const res = await authApi.getPlan(planId);
        if (res.data) dispatch(setPlan(res.data));
    };
    // WHAT: checkPlan
    const checkPlan = (path: string) => {
        if (path.includes(PATH_SEGMENTS)) {
            if (!plan?.segmentation) return setVisible(true);
        } else if (path.includes(PATH_REWARDS)) {
            if (!plan?.reward?.status) return setVisible(true);
        } else if (path.includes(PATH_COUPON)) {
            if (!plan?.coupon?.status) return setVisible(true);
        } else if (path.includes(PATH_BENEFITS)) {
            if (!plan?.benefit?.status) return setVisible(true);
        } else if (path.includes(PATH_FREE_POINT)) {
            if (!plan?.freePoint) return setVisible(true);
        } else if (path.includes(PATH_USER_SIGNUP)) {
            if (!plan?.customSignUp) return setVisible(true);
        } else if (path.includes(PATH_TRAFFIC_SOURCE)) {
            if (!plan?.trafficSource) return setVisible(true);
        }
    };

    //check permission
    const checkPermission = (isAuthRoute: boolean) => {
        // console.log("auth permission");
        if (isAuthRoute && location.pathname !== PATH_ACCOUNTS) {
            history.push(PATH_HOME);
        } else if (props.permission && !allowPermissions.includes(props.permission)) {
            warning(t("message.not_permission"));
            history.push(PATH_HOME);
        }
    };
    // check admin pane
    const checkAdminPane = (pathName: string) => {
        const adminPane = userInfo?.notifSetting?.channels?.adminPanel;
        if (!adminPane && pathName === PATH_NOTIFICATION_SETTING) {
            warning(t("message.admin_panel_notification_setting_is_turn_off"), 3000);
            history.goBack();
        }
    };

    const gotoChoosePlan = useCallback(() => {
        history.push(PATH_CHOOSE_PLAN);
    }, []);

    const handleClose = useCallback(() => {
        history.push(PATH_HOME);
    }, []);

    // onMessageListener().then((payload: any) => {
    //     const notification: INotify = payload.notification;
    //     info(notification.title);
    //     // const { title, body } = payload.data;
    // });

    return (
        <>
            <ModuleUpgradePlan
                visible={visible}
                onClose={handleClose}
                handleUpgrade={gotoChoosePlan}
            />
            <Route
                path={path}
                exact={exact}
                render={() => (
                    <Layout>
                        <Component />
                    </Layout>
                )}
            />
        </>
    );
};
