import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { enumSegmentDataType, SEGMENT_ITEM_COMPARISONS, SEGMENT_TOTAL_VALUES } from "@configs";
import { ISegment, ISegmentConditionItem, ISignupMethod } from "@interfaces";
import { selectAuth } from "@redux";
import { useSelector } from "react-redux";

interface IProps {
    data: ISegment;
    handleClick: (item: ISegmentConditionItem) => void;
}

export const AddSegmentItem = (props: IProps) => {
    // page hook
    const { t } = useTranslation();
    // redux state
    const signUpSettings: ISignupMethod | undefined =
        useSelector(selectAuth).userInfo?.merchant?.signUpSettings || undefined;
    const { data, handleClick } = props;
    // get key, subKey, value of obj : a{ b: []}

    const subObj = Object.values(data)[0];
    const comparison = Object.keys(subObj)[0];
    const checkObject = () => {
        const object = SEGMENT_TOTAL_VALUES.find((item) => item.key === Object.keys(data)[0]);
        if (object) return { ...object, title: t("page." + object.title) };
        else if (signUpSettings?.fields) {
            const id = Object.keys(data)[0];
            const value = signUpSettings?.fields.find((item) => "form." + item._id === id);
            return {
                key: "form." + value?._id || "",
                title: value?.fieldName || "",
                type: enumSegmentDataType.textIncluded,
            };
        }
    };
    const object = checkObject();
    const title = object?.title;

    //@ts-ignore
    const subKey: string = SEGMENT_ITEM_COMPARISONS[comparison];
    const value: string = Object.values(Object.values(subObj))[0] as string;

    const clickElement = () => {
        if (object) handleClick(object);
    };

    // display with different case
    const valueCase = () => {
        const type = typeof value;
        if (type === "number") {
            return <div className="value">{value}</div>;
        } else if (type === "boolean") {
            return <div className="value">{value ? "known" : "unknown"}</div>;
        } else {
            if (Array.isArray(value)) {
                if (
                    object?.type === enumSegmentDataType.text ||
                    object?.type === enumSegmentDataType.textIncluded
                ) {
                    return value.map((item: string, index: number) => (
                        <div key={index} className="value">
                            {item}
                        </div>
                    ));
                } else if (object?.type === enumSegmentDataType.date) {
                    return value.map((item: string, index: number) => {
                        if (index === 1) {
                            return (
                                <>
                                    <div className="sub-key">to</div>
                                    <div key={index} className="value">
                                        {t("format.date", {
                                            date: new Date(item),
                                        })}
                                    </div>
                                </>
                            );
                        } else
                            return (
                                <div key={index} className="value">
                                    {t("format.date", {
                                        date: new Date(item),
                                    })}
                                </div>
                            );
                    });
                }
            }
        }
    };

    return (
        <StyledContainer onClick={clickElement}>
            <div className="title">{title}</div>
            <div className="sub-key">{t("page." + subKey)}</div>
            {valueCase()}
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 90%;
`;
