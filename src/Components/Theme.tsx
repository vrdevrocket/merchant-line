import styled, { CSSProperties } from "styled-components";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ComponentColor, ComponentColorPicker } from "@components";
// import { theme } from "@utils";
import { selectTheme, setMainColor } from "@redux";

interface Iprops {
    style?: CSSProperties | undefined;
    themeConfig?: string[];
    title?: string;
    callbackColor?: (color: string) => void;
    initColor?: string;
}

export const ComponentTheme = (props: Iprops) => {
    //page Hooks
    const { t } = useTranslation();
    const mainColor = useSelector(selectTheme).mainColor;
    const dispatch = useDispatch();
    //page props
    const { style, themeConfig, title, callbackColor, initColor } = props;
    //page states
    const [edit, setEdit] = useState<boolean>();
    //page variable
    // const colorThemes = theme.colors.colorThemes;

    const handleToggleEdit = () => {
        setEdit(!edit);
    };

    const handleChangeMainColor = (color?: string) => {
        if (color) {
            dispatch(setMainColor(color));
        }
    };

    return (
        <StyledTheme>
            <div className="theme">
                <div className="title" style={style}>
                    {title ? title : t("page.theme_color")}
                </div>
                <div className="main__color">
                    <ComponentColor className="marginLeft_0" color={initColor || mainColor} />
                    <Button
                        type="primary"
                        onClick={handleToggleEdit}
                        size="large"
                        className="btn--edit"
                    >
                        {edit ? t("page.close") : t("page.edit")}
                    </Button>
                </div>
            </div>

            {edit && (
                <div className="colorTheme">
                    {themeConfig ? (
                        themeConfig.map((color) => {
                            return (
                                <ComponentColor
                                    key={color}
                                    color={color}
                                    //@ts-ignore
                                    onClick={() => callbackColor(color)}
                                />
                            );
                        })
                    ) : (
                        <ComponentColorPicker
                            color={initColor || mainColor}
                            onClick={handleChangeMainColor}
                        />
                    )}
                </div>
            )}
        </StyledTheme>
    );
};

const StyledTheme = styled.div`
    margin-bottom: 20px;
    .theme {
        .title {
            color: rgba(0, 0, 0, 0.85);
            font-weight: 600;
            line-height: 1.5rem;
        }
        .main__color {
            display: flex;
            align-items: flex-end;
            margin-top: 12px;
        }
    }
    .colorTheme {
        display: flex;
        flex-wrap: wrap;
        padding: 10px 20px;
        border-radius: 4px;
        background: #f7f7f8;
        /* margin-top: 22px; */
    }
    .btn--edit {
        height: 33px;
        padding: 0 8px;
        font-weight: 600;
        font-size: 14px;
        line-height: 21px;
        background-color: #ffffff;
        position: relative;
        top: -3px;
        color: #000000;
        border-color: #d9d9d9 !important;
        box-shadow: none !important;
    }
    .marginLeft_0 {
        margin-left: 0 !important;
    }
`;
