import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { useTranslation } from "react-i18next";

import { StyledLoyaltyDetail } from "@components";
import { ITrafficSource } from "@interfaces";
import { PATH_TRAFFIC_SOURCE } from "@configs";
import { ModuleTrafficSourceForm } from "@modules";
import { setLoading } from "@redux";
import { trafficSourceAPI } from "@api";
import { showErrorMessage, useNotify } from "@utils";

export const PageTrafficSourceDetail = () => {
    //page hook
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();
    const { warning } = useNotify();
    // page state
    const [trafficSource, setTrafficSource] = useState<ITrafficSource>();

    useEffect(() => {
        setupTrafficSource();
    }, []);

    const setupTrafficSource = async () => {
        if (id) {
            try {
                dispatch(setLoading(true));
                const res = await trafficSourceAPI.getTrafficSourceById(id);
                const data = res.data as ITrafficSource;
                setTrafficSource(data);
            } catch (err: any) {
                if (err.response) {
                    warning(showErrorMessage(err.response));
                } else warning(t("message.not_found", { name: t("object._traffic_source") }));
                history.push(PATH_TRAFFIC_SOURCE);
            } finally {
                dispatch(setLoading(false));
            }
        }
    };

    const view = trafficSource && (
        <StyledLoyaltyDetail>
            {/* form */}
            <ModuleTrafficSourceForm trafficSource={trafficSource} />
        </StyledLoyaltyDetail>
    );

    return (
        <>
            <>{view}</>
        </>
    );
};
