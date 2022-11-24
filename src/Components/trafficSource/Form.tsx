import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FormikErrors, FormikTouched } from "formik";

import { IHandleBlur, IHandleChange, ITrafficSource } from "@interfaces";
import { SharedInput, IconCopy, StyledCard } from "..";
import { copyText } from "@utils";
import { Tooltip } from "antd";

interface IProps {
    trafficSource: ITrafficSource;
    handleBlur: IHandleBlur;
    handleChange: IHandleChange;
    errors: FormikErrors<ITrafficSource>;
    touched: FormikTouched<ITrafficSource>;
    trafficSourceLink: string;
    isCopy: { status: boolean; value: number };
    reUpdateState: (value: number) => void;
}

export const ComponentTrafficSourceForm = memo((props: IProps) => {
    //props
    const {
        trafficSource,
        handleBlur,
        handleChange,
        errors,
        touched,
        trafficSourceLink,
        isCopy,
        reUpdateState,
    } = props;
    //hooks
    const { t } = useTranslation();

    const handleCopyText = useCallback(() => {
        copyText(trafficSourceLink, () => reUpdateState(1));
    }, [trafficSourceLink]);

    return (
        <StyledCard>
            <div className="title">{t("page.link")}</div>
            <SharedInput
                label={t("page.traffic_source_name")}
                descLabel={t("page._2_100_characters")}
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={trafficSource.name}
                errors={errors.name}
                touched={touched.name}
            />

            <SharedInput
                label={t("page.traffic_source_url")}
                placeholder={t("page.enter_URL")}
                name="url"
                onBlur={handleBlur}
                onChange={handleChange}
                value={trafficSource.url}
                errors={errors.url}
                touched={touched.url}
            />
            {/* link */}
            <div className="group_link">
                <SharedInput styleParent={{ flex: 1 }} value={trafficSourceLink} disable={true} />
                <Tooltip
                    title={
                        isCopy.status && isCopy.value === 1
                            ? t("message.copied")
                            : t("message.copy")
                    }
                >
                    <div className="copy" onClick={handleCopyText}>
                        <IconCopy />
                    </div>
                </Tooltip>
            </div>
            <div className="desc_link">{t("page.desc_link")}</div>
        </StyledCard>
    );
});
