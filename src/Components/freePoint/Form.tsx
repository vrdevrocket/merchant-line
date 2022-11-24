import { memo } from "react";
import { useTranslation } from "react-i18next";
import { FormikErrors, FormikTouched } from "formik";
import { Col, Row } from "antd";

import { IFreePoint, IHandleBlur, IHandleChange, IMembershipTier, ISelect } from "@interfaces";
import { SharedInput, SharedSelect, ComponentPeriod, StyledCard, ComponentInfoBox } from "../";
import { ALL_SELECT, enumPlacement } from "@configs";
interface IProps {
    freePoint: IFreePoint;
    handleBlur: IHandleBlur;
    handleChange: IHandleChange;
    errors: FormikErrors<IFreePoint>;
    touched: FormikTouched<IFreePoint>;
    dataMemberShip: IMembershipTier[];
    handleChangeSelect: (value: Array<string>) => void;
    handleChangeDateFrom: (date: Date | null) => void;
    handleChangeDateTo: (date: Date | null | null) => void;
}

export const ComponentFreePointForm = memo((props: IProps) => {
    //props
    const {
        freePoint,
        handleBlur,
        handleChange,
        errors,
        touched,
        dataMemberShip,
        handleChangeSelect,
        handleChangeDateFrom,
        handleChangeDateTo,
    } = props;
    //hooks
    const { t } = useTranslation();
    const membershipSelect: ISelect[] = [
        ...dataMemberShip.map((item) => ({ id: item._id, label: item.membershipName })),
        {
            id: ALL_SELECT,
            label: t("page.all_member"),
        },
    ];

    return (
        <StyledCard>
            <div className="title">{t("page.free_points_settings")}</div>
            <SharedInput
                label={t("page.free_point_name")}
                // descLabel={t("page._2_100_characters")}
                style={{ width: "100%" }}
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={freePoint.name}
                errors={errors.name}
                touched={touched.name}
                parentClassName="mb-6"
            />
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12}>
                    <SharedInput
                        label={
                            <span className="label">
                                {t("page.points")}{" "}
                                <ComponentInfoBox
                                    title={t("page.box_info.point")}
                                    body={[t("page.box_info.point_body")]}
                                    placement={enumPlacement.RIGHT}
                                />
                            </span>
                        }
                        name="point"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={freePoint.point}
                        errors={errors.point}
                        touched={touched.point}
                        parentClassName="mb-6 eng"
                    />
                </Col>
                <Col xs={12} sm={12} md={12}>
                    <SharedSelect
                        label={
                            <span className="label">
                                {t("page.membership")}{" "}
                                <ComponentInfoBox
                                    title={t("page.box_info.benefit_membershipt")}
                                    body={[
                                        t("page.box_info.benefit_body_1"),
                                        t("page.box_info.benefit_body_2"),
                                    ]}
                                    placement={enumPlacement.RIGHT}
                                />
                            </span>
                        }
                        data={membershipSelect}
                        value={freePoint.levelIds}
                        onChange={handleChangeSelect}
                        errors={errors.levelIds || ""}
                        name="levelIds"
                        touched={touched.levelIds}
                        className="mb-22"
                    />
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={12} sm={12} md={12}>
                    <SharedInput
                        label={
                            <span className="label">
                                {t("page.quantity_limit")}{" "}
                                <ComponentInfoBox
                                    title={t("page.box_info.benefit_quantity")}
                                    body={[t("page.box_info.benefit_quantity_body_1")]}
                                    placement={enumPlacement.RIGHT}
                                />
                            </span>
                        }
                        name="quantity"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={freePoint.quantity}
                        errors={errors.quantity}
                        touched={touched.quantity}
                        parentClassName="mb-6 eng"
                    />
                </Col>
                <Col xs={12} sm={12} md={12}>
                    <SharedInput
                        label={
                            <span className="label">
                                {t("page.quantity_limit_user")}{" "}
                                <ComponentInfoBox
                                    title={t("page.box_info.benefit_quantity_user")}
                                    body={[t("page.box_info.benefit_quantity_body_2")]}
                                    placement={enumPlacement.RIGHT}
                                />
                            </span>
                        }
                        name="limit"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={freePoint.limit}
                        errors={errors.limit}
                        touched={touched.limit}
                        parentClassName="mb-6 eng"
                    />
                </Col>
            </Row>

            {/* period */}
            <ComponentPeriod
                dateFrom={freePoint.startDate}
                dateTo={freePoint.endDate}
                // limitDate={{ minDate: new Date() }}
                handleDateFrom={handleChangeDateFrom}
                handleDateTo={handleChangeDateTo}
            />
        </StyledCard>
    );
});
