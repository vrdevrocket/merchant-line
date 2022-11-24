import { PATH_LINE_LOGIN } from "./../Configs/routes";
import querystring from "querystring";
import axios from "axios";

const lineHeader = (baseURL: string) => ({
    baseURL,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    paramsSerializer: (params: any) => querystring.stringify(params),
});

export const FacebookApi = (baseUrl: string) => {
    //hook state
    const axiosClient = axios.create(lineHeader(baseUrl));

    return {
        login: (code: string) => {
            const url = "/token";

            //WHAT: login body
            const redirectUrl = process.env.REACT_APP_WEB_URL + PATH_LINE_LOGIN;
            const grantType = "authorization_code";
            const clientId = process.env.REACT_APP_LINE_ID || "";
            const clientSecret = process.env.REACT_APP_LINE_SECRET || "";

            //WHAT: setup xxx-form-data body
            const accessTokenBody = new URLSearchParams();
            accessTokenBody.append("grant_type", grantType);
            accessTokenBody.append("code", code);
            accessTokenBody.append("redirect_uri", redirectUrl);
            accessTokenBody.append("client_id", clientId);
            accessTokenBody.append("client_secret", clientSecret);

            return axiosClient.post(url, accessTokenBody);
        },
    };
};
