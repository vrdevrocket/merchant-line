import { v4 as uuidv4 } from "uuid";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import QRCode from "react-qr-code";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { useTranslation } from "react-i18next";

import { ICoupon } from "@interfaces";
import {
    ALL_SELECT,
    enumLength,
    enumStatus,
    FIXED,
    PATH_COUPON,
    PATH_COUPON_CREATE,
} from "@configs";
import { ModuleCouponsFrom } from "@modules";
import { randomCode, showErrorMessage, useConvertBase64, useNotify } from "@utils";
import { couponAPI, merchantAPI } from "@api";
import { StyledLoyaltyDetail } from "@components";
import { setLoading } from "@redux";

let uuid = uuidv4();

export const PageCouponCreate = () => {
    //variables
    const newDate = new Date();
    const newCoupon: ICoupon = {
        name: "",
        code: randomCode(enumLength.CODE),
        levelIds: [ALL_SELECT],
        qrImageLink: "",
        status: enumStatus.ACTIVE,
        qrToken: uuid,
        quantity: undefined,
        limit: undefined,
        imageUrl: [],
        guideline: "",
        startDate: new Date(),
        endDate: new Date(newDate.setMonth(newDate.getMonth() + 1)),
        benefit: undefined,
        unit: FIXED,
        isDisplayed: enumStatus.INACTIVE,
    };

    //hooks
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const { warning } = useNotify();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    // page state
    const [coupon, setCoupon] = useState<ICoupon>(newCoupon);
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
        if (!pathName.includes(PATH_COUPON_CREATE)) {
            setupCoupon();
        } else {
            uploadQRCode();
        }
    };

    // get coupon if
    const setupCoupon = async () => {
        if (id) {
            try {
                dispatch(setLoading(true));
                const res = await couponAPI.getCouponById(id);
                const data = res.data as ICoupon;
                const levelIds = !data.levelIds?.length ? [ALL_SELECT] : data.levelIds;
                setCoupon({ ...data, unit: data.unit?.toString() || "", levelIds });
            } catch (err: any) {
                if (err.response) {
                    warning(showErrorMessage(err.response));
                } else warning(t("message.not_found", { name: t("object._coupon") }));
                history.push(PATH_COUPON);
            } finally {
                dispatch(setLoading(false));
            }
        }
    };

    const uploadQRCode = async () => {
        if (posterRef.current) {
            const formData = new FormData();
            const canvas = await html2canvas(posterRef.current);
            const file = useConvertBase64(canvas.toDataURL());
            formData.append("file", file, "image.jpg");
            const res = await merchantAPI.uploadImage(formData);
            const qrImageLink = res.data.publicUrl;
            setCoupon({ ...coupon, qrImageLink: qrImageLink });
        }
        return "null";
    };

    return (
        <>
            <StyledLoyaltyDetail>
                <ModuleCouponsFrom coupon={coupon} />
            </StyledLoyaltyDetail>
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
                <QRCode value={`${clientUrl}/coupon/${uuid}`} size={1024} />
            </div>
        </>
    );
};
