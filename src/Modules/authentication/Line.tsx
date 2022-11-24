import querystring from "querystring";
import { memo, useCallback } from "react";

import { ComponentLineButton } from "@components";
import { LINE_ACCESS_URL, LINE_SCOPE, PATH_LINE_LOGIN } from "@configs";
import { IExternalAuthState } from "@interfaces";

interface IProps {
    state: IExternalAuthState;
}

export const ModuleLine = memo((props: IProps) => {
    //props
    const { state } = props;

    const handleLineLogin = useCallback(() => {
        // Build query string.
        const query = querystring.stringify({
            response_type: "code",
            client_id: process.env.REACT_APP_LINE_ID,
            state: JSON.stringify(state),
            redirect_uri: `${process.env.REACT_APP_WEB_URL}${PATH_LINE_LOGIN}`,
        });

        // Build the Line authorize URL.
        const lineUrl = `${LINE_ACCESS_URL}/authorize?&bot_prompt=normal&scope=${LINE_SCOPE}&${query}`;

        // Redirect to external URL.
        window.location.href = lineUrl;
    }, []);

    return <ComponentLineButton onClick={handleLineLogin} />;
});
