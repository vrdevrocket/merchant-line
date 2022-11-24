import queryString from "querystring";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

import { enumExternalMethod, PATH_LOGIN } from "@configs";
import { logout, setExternalLogin } from "@redux";

export const PageLineLogin = () => {
    //page hook
    const dispatch = useDispatch();
    const history = useHistory();

    const queryParams = queryString.parse(window.location.search.substring(1));

    useEffect(() => {
        if (queryParams.code) {
            if (queryParams.state) {
                dispatch(
                    setExternalLogin({
                        type: enumExternalMethod.LINE,
                        line: {
                            code: queryParams.code.toString(),
                            state: queryParams.state.toString(),
                        },
                    })
                );
            } else {
                dispatch(logout());
            }
        } else {
            dispatch(logout());
        }
        history.push(PATH_LOGIN);
    }, [queryParams]);

    return <></>;
};
