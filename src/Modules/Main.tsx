import { Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { ComponentAppRoute, ComponentToast, ModuleLiveChat } from "@components";
import { routes } from "@configs";
import { IRoute } from "@interfaces";
import { useWindowDimensions } from "@utils";
import { getInfo, selectAuth, setLoading, setMobile } from "@redux";

export const ModuleMain = () => {
    //page hooks
    const { width } = useWindowDimensions();
    const dispatch = useDispatch();
    // page  redux
    const auth = useSelector(selectAuth).auth;

    useEffect(() => {
        dispatch(setMobile(width < 992));
    }, [width]);

    useEffect(() => {
        if (auth?.accessToken) {
            fetchInfo();
        }
    }, [auth]);

    // useEffect(() => {
    //     if (userInfo) {
    //         console.log(userInfo);
    //     }
    // }, [userInfo]);

    const fetchInfo = () => {
        try {
            dispatch(getInfo());
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <BrowserRouter>
            <Switch>
                {routes.map((e: IRoute, key) => (
                    <ComponentAppRoute key={key} {...e} />
                ))}
            </Switch>
            <ComponentToast />
            <ModuleLiveChat />
        </BrowserRouter>
    );
};
