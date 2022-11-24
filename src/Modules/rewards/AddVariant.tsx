import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Input, Select } from "antd";
import { useEffect, useRef, useState } from "react";

import { ComponentDrawer } from "@components";
import { rewardAPI } from "@api";
import { setLoading } from "@redux";
import { IVariant } from "@interfaces";
import { showErrorMessage, useNotify } from "@utils";
import { enumDrawerPlacement } from "@configs";

interface IProps {
    visible: boolean;
    initVariants: IVariant[];
    handleClose: () => void;
    callbackData: (value: IVariant[]) => void;
    createData: (value: IVariant) => void;
}

const { Option } = Select;
const initParams = {
    page: 1,
    limit: 1000,
};

export const ModuleRewardAddVariant = (props: IProps) => {
    //page hook
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { error, success } = useNotify();
    const searchInputRef = useRef<any | null>(null);
    // props
    const { visible, handleClose, callbackData, initVariants, createData } = props;
    // state
    const [data, setData] = useState<string>("");
    const [listVariant, setListVariant] = useState<IVariant[]>([]);

    useEffect(() => {
        fetchVariants();
    }, []);

    const fetchVariants = async () => {
        const response = await rewardAPI.listVariant(initParams);
        if (response.data) setListVariant(response.data.docs);
    };
    const createVariant = async () => {
        dispatch(setLoading(true));
        try {
            const response = await rewardAPI.createVariant({ name: data });
            createData({ name: response.data.name || "", _id: response.data._id || "" });
            success(t("message.create.success"));
            fetchVariants();
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.create.fail"));
        } finally {
            dispatch(setLoading(false));
        }
    };
    const handleSearchInput = (value: string) => {
        setData(value);
    };

    const handleEnter = (e: string) => {
        if (e === "Enter") {
            createVariant();
            searchInputRef.current.focus();
        }
    };
    const handleChange = (valueArr: string[]) => {
        const callbackArr: IVariant[] = listVariant.filter((item) => valueArr.includes(item.name));
        callbackData(callbackArr);
    };
    return (
        <ComponentDrawer
            title={t("page.add_variant")}
            visible={visible}
            handleClose={handleClose}
            handleSubmit={createVariant}
            placement={enumDrawerPlacement.RIGHT}
        >
            <div className="form-input">
                <p>{t("page.variant_name")}</p>
                <Select
                    maxTagCount={5}
                    mode="multiple"
                    showSearch
                    className="input-with-search"
                    placeholder={t("page.choose_variants")}
                    optionFilterProp="children"
                    onSearch={handleSearchInput}
                    // onChange={handleChangeName}
                    value={initVariants.map((item) => item.name)}
                    onChange={handleChange}
                    onInputKeyDown={(e) => handleEnter(e.key)}
                    notFoundContent={false}
                    filterOption={(input, option) =>
                        //@ts-ignore
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {listVariant?.map((item) => (
                        <Option key={item._id} value={item.name}>
                            {item.name}
                        </Option>
                    ))}
                </Select>
                <Input ref={searchInputRef} style={{ opacity: "0" }} readOnly={true} />
            </div>
        </ComponentDrawer>
    );
};
