import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { StyledLoyaltyDetail } from "@components";
import { IRewardData } from "@interfaces";
import { enumStatus, PATH_REWARDS, PATH_REWARDS_CREATE, enumLength, ALL_SELECT } from "@configs";
import { ModuleRewardForm } from "@modules";
import { useRandomCode, useNotify, showErrorMessage } from "@utils";
import { rewardAPI } from "@api";
import { setLoading } from "@redux";

export const PageRewardCreate = () => {
    //variables
    const newDate = new Date();
    const initData: IRewardData = {
        name: "",
        limit: undefined,
        code: useRandomCode(enumLength.CODE),
        point: undefined,
        levelIds: [ALL_SELECT],
        birthMonths: [ALL_SELECT],
        startDate: new Date(),
        endDate: new Date(newDate.setFullYear(newDate.getFullYear() + 1)),
        description: "",
        status: enumStatus.ACTIVE,
        imageUrl: [],
        variants: [],
    };

    //page hook

    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const history = useHistory();
    const { warning } = useNotify();
    const { t } = useTranslation();
    // page state
    const [reward, setReward] = useState<IRewardData>(initData);
    // variable
    const pathName = history.location.pathname;
    useEffect(() => {
        getInitData();
    }, []);

    const fetchReward = async () => {
        if (!pathName.includes(PATH_REWARDS_CREATE)) {
            try {
                const response = await rewardAPI.detail(id);
                const data: IRewardData = response.data;
                if (!data.birthMonths?.length) data.birthMonths = [ALL_SELECT];
                if (!data.levelIds?.length) data.levelIds = [ALL_SELECT];
                setReward(data);
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

    return <StyledLoyaltyDetail>{<ModuleRewardForm reward={reward} />}</StyledLoyaltyDetail>;
};
