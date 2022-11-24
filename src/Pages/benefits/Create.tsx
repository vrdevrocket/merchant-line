import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import {
    enumStatus,
    PATH_REWARDS,
    PATH_BENEFITS_CREATE,
    ALL_SELECT,
    enumLength,
    enumBenefitLimit,
} from "@configs";
import { ModuleBenefitForm } from "@modules";
import { benefitAPI } from "@api";
import { setLoading } from "@redux";
import { IBenefitData } from "@interfaces";
import { showErrorMessage, useNotify, useRandomCode } from "@utils";
import { StyledLoyaltyDetail } from "@components";

export const PageBenefitCreate = () => {
    //variables
    const newDate = new Date();
    const initData: IBenefitData = {
        name: "",
        limit: undefined,
        code: useRandomCode(enumLength.CODE),
        quantityUnit: enumBenefitLimit.ALLTIME,
        limitUnit: enumBenefitLimit.ALLTIME,
        levelIds: [ALL_SELECT],
        birthMonths: [ALL_SELECT],
        startDate: new Date(),
        endDate: new Date(newDate.setMonth(newDate.getMonth() + 1)),
        description: "",
        status: enumStatus.ACTIVE,
        imageUrl: [],
    };

    //page hook
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const history = useHistory();
    const { warning } = useNotify();
    const { t } = useTranslation();
    // page state
    const [benefit, setBenefit] = useState<IBenefitData>(initData);
    // page variable
    const pathName = history.location.pathname;

    useEffect(() => {
        getInitData();
    }, []);

    const fetchReward = async () => {
        if (!pathName.includes(PATH_BENEFITS_CREATE)) {
            try {
                const response = await benefitAPI.detail(id);
                const data: IBenefitData = response.data;
                if (!data.birthMonths.length) data.birthMonths = [ALL_SELECT];
                if (!data.levelIds.length) data.levelIds = [ALL_SELECT];
                setBenefit(data);
            } catch (err: any) {
                if (err.response) {
                    warning(showErrorMessage(err.response));
                } else warning(t("message.not_found", { name: t("object._reward") }));
                history.push(PATH_REWARDS);
            }
        }
    };
    const getInitData = async () => {
        dispatch(setLoading(true));
        await fetchReward();
        dispatch(setLoading(false));
    };

    return (
        <StyledLoyaltyDetail>
            <ModuleBenefitForm benefit={benefit} />
        </StyledLoyaltyDetail>
    );
};
