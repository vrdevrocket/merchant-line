import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { useTranslation } from "react-i18next";

import { StyledLoyaltyDetail } from "@components";
import { ICoupon } from "@interfaces";
import { ALL_SELECT, PATH_COUPON } from "@configs";
import { ModuleCouponsFrom } from "@modules";
import { couponAPI } from "@api";
import { setLoading } from "@redux";
import { showErrorMessage, useNotify } from "@utils";
export const PageCouponDetail = () => {
    //page hook

    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const { warning } = useNotify();
    const { t } = useTranslation();
    // page state
    const [coupon, setCoupon] = useState<ICoupon>();

    useEffect(() => {
        setupCoupon();
    }, []);

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

    const view = coupon && (
        <StyledLoyaltyDetail>
            {/* form */}
            <ModuleCouponsFrom coupon={coupon} />
        </StyledLoyaltyDetail>
    );

    return <>{view}</>;
};
