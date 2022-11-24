import { v4 as uuidv4 } from "uuid";
import { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { StyledLoyaltyDetail } from "@components";
import { IFreePoint } from "@interfaces";
import { ALL_SELECT, PATH_FREE_POINT } from "@configs";
import { ModuleFreePointFrom } from "@modules";
import { freePointAPI } from "@api";
import { setLoading } from "@redux";
import { useHistory, useParams } from "react-router";
import { showErrorMessage, useNotify } from "@utils";

let uuid = uuidv4();

export const PageFreePointDetail = () => {
    //page hook
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const { t } = useTranslation();
    const { warning } = useNotify();
    // page state
    const [freePoint, setFreePoint] = useState<IFreePoint>();
    //page ref
    const posterRef = useRef<HTMLDivElement>(null);
    //page variable
    const clientUrl = process.env.REACT_APP_CLIENT_URL;

    //WHAT: random uuid
    useEffect(() => {
        setupFreePoint();

        return () => {
            uuid = uuidv4();
        };
    }, []);

    const setupFreePoint = async () => {
        if (id) {
            try {
                dispatch(setLoading(true));
                const res = await freePointAPI.getFreePointById(id);
                const data = res.data as IFreePoint;
                const levelIds = !data.levelIds?.length ? [ALL_SELECT] : data.levelIds;
                setFreePoint({ ...data, levelIds });
            } catch (err: any) {
                if (err.response) {
                    warning(showErrorMessage(err.response));
                } else warning(t("message.not_found", { name: t("object._free_point") }));
                history.push(PATH_FREE_POINT);
            } finally {
                dispatch(setLoading(false));
            }
        }
    };

    const view = freePoint && (
        <StyledLoyaltyDetail>
            {/* form */}
            <ModuleFreePointFrom freePoint={freePoint} />
        </StyledLoyaltyDetail>
    );

    return (
        <>
            {view}

            {/* qr Code */}
            <div
                id="QRPoster"
                style={{
                    position: "fixed",
                    top: "-10000px",
                    left: "-100000px",
                    width: "1024px",
                    height: "1024px",
                    zIndex: -10000,
                }}
                ref={posterRef}
            >
                <QRCode value={`${clientUrl}/${uuid}`} size={1024} />
            </div>
        </>
    );
};
