import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router";

import { StyledLoyaltyDetail } from "@components";
import { ITrafficSource } from "@interfaces";
import { enumStatus, PATH_TRAFFIC_SOURCE, PATH_TRAFFIC_SOURCE_CREATE } from "@configs";
import { ModuleTrafficSourceForm } from "@modules";
import { setLoading } from "@redux";
import { showErrorMessage, useConvertBase64, useNotify } from "@utils";
import { merchantAPI, trafficSourceAPI } from "@api";

let uuid = uuidv4();

export const PageTrafficSourceCreate = () => {
    //init variable
    const newCoupon: ITrafficSource = {
        name: "",
        url: "",
        status: enumStatus.INACTIVE,
        qrToken: uuid,
        qrImageLink: "",
    };
    //page hook
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const history = useHistory();
    const { warning } = useNotify();
    const { t } = useTranslation();
    // page state
    const [trafficSource, setTrafficSource] = useState<ITrafficSource>(newCoupon);
    //page ref
    const posterRef = useRef<HTMLDivElement>(null);
    //page variable
    const clientUrl = process.env.REACT_APP_CLIENT_URL;
    const pathName = history.location.pathname;
    //WHAT: random uuid
    useEffect(() => {
        getInitData();
        return () => {
            uuid = uuidv4();
        };
    }, []);

    const getInitData = () => {
        if (!pathName.includes(PATH_TRAFFIC_SOURCE_CREATE)) {
            setupTrafficSource();
        } else uploadQRCode();
    };

    // get detail data

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

    // create new data
    const uploadQRCode = async () => {
        if (posterRef.current) {
            const formData = new FormData();
            const canvas = await html2canvas(posterRef.current);

            const file = useConvertBase64(canvas.toDataURL());
            formData.append("file", file, "image.jpg");
            const res = await merchantAPI.uploadImage(formData);
            const qrImageLink = res.data.publicUrl;

            setTrafficSource({ ...trafficSource, qrImageLink: qrImageLink });
        }

        return "null";
    };

    const view = (
        <StyledLoyaltyDetail>
            {/* form */}
            <ModuleTrafficSourceForm trafficSource={trafficSource} />
        </StyledLoyaltyDetail>
    );

    return (
        <>
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
                    <QRCode value={`${clientUrl}/traffic-source/${uuid}`} size={1024} />
                </div>
            </>
        </>
    );
};
