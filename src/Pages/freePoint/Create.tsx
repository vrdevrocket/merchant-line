import { v4 as uuidv4 } from "uuid";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import QRCode from "react-qr-code";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { useTranslation } from "react-i18next";

import { StyledLoyaltyDetail } from "@components";
import { IFreePoint } from "@interfaces";
import { ALL_SELECT, enumStatus, PATH_FREE_POINT, PATH_FREE_POINT_CREATE } from "@configs";
import { ModuleFreePointFrom } from "@modules";
import { showErrorMessage, useConvertBase64, useNotify } from "@utils";
import { freePointAPI, merchantAPI } from "@api";
import { setLoading } from "@redux";

let uuid = uuidv4();

export const PageFreePointCreate = () => {
    //variables
    const newDate = new Date();
    const newFreePoint: IFreePoint = {
        name: "",
        point: undefined,
        levelIds: [ALL_SELECT],
        qrImageLink: "",
        status: enumStatus.ACTIVE,
        qrToken: uuid,
        quantity: undefined,
        limit: undefined,
        imageUrl: [],
        startDate: new Date(),
        endDate: new Date(newDate.setMonth(newDate.getMonth() + 1)),
    };

    //page hook
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const history = useHistory();
    const { warning } = useNotify();
    const { t } = useTranslation();
    // page state
    const [freePoint, setFreePoint] = useState<IFreePoint>(newFreePoint);
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
        if (!pathName.includes(PATH_FREE_POINT_CREATE)) {
            setupFreePoint();
        } else {
            uploadQRCode();
        }
    };

    // get data
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
    // create new data
    const uploadQRCode = async () => {
        if (posterRef.current) {
            const formData = new FormData();
            const canvas = await html2canvas(posterRef.current);

            const file = useConvertBase64(canvas.toDataURL());
            formData.append("file", file, "image.jpg");
            const res = await merchantAPI.uploadImage(formData);

            const qrImageLink = res.data.publicUrl;
            setFreePoint({ ...freePoint, qrImageLink: qrImageLink });
        }
        return "null";
    };

    const view = (
        <StyledLoyaltyDetail>
            <ModuleFreePointFrom freePoint={freePoint} />
        </StyledLoyaltyDetail>
    );

    return (
        <>
            {view}
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
                <QRCode value={`${clientUrl}/free-point/${uuid}`} size={1024} />
            </div>
        </>
    );
};
