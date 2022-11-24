import { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { MEMBERSHIP_ICONS } from "@configs";
import ComponentBadgeIcon from "./BadgeIcon";

interface IProps {
    initIcon: string;
    callbackIcon: (val: string) => void;
}

export const ComponentTierBadgeIcons = (props: IProps) => {
    const { t } = useTranslation();
    const [edit, setEdit] = useState<boolean>();
    const { initIcon, callbackIcon } = props;
    const handleToggleEdit = () => {
        setEdit(!edit);
    };
    return (
        <StyledLayout>
            <div className="box_title">{t("page.tier_icon")}</div>
            <div className="flex">
                <ComponentBadgeIcon icon={initIcon} callbackIcon={callbackIcon} />
                <Button
                    type="primary"
                    onClick={handleToggleEdit}
                    size="large"
                    className="btn--edit"
                >
                    {edit ? t("page.close") : t("page.edit")}
                </Button>
            </div>

            {edit && (
                <div className="icon-layout">
                    {MEMBERSHIP_ICONS.map((icon) => {
                        return (
                            <ComponentBadgeIcon
                                key={icon}
                                icon={icon}
                                callbackIcon={callbackIcon}
                            />
                        );
                    })}
                </div>
            )}
        </StyledLayout>
    );
};

const StyledLayout = styled.div`
    .btn--edit {
        height: 33px;
        padding: 0 8px;
        font-weight: 600;
        font-size: 14px;
        line-height: 21px;
        background-color: #ffffff;
        position: relative;
        color: #000000;
        border-color: #d9d9d9 !important;
        box-shadow: none !important;
    }
    .flex {
        display: flex;
        align-items: center;
    }
    .icon-layout {
        display: flex;
        flex-wrap: wrap;
        padding: 27px 23px;
        border-radius: 4px;
        background: #f7f7f8;
        margin-top: 22px;
    }
`;
