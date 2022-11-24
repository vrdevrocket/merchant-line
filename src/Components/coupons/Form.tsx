import { memo } from "react";
import { useTranslation } from "react-i18next";
import { FormikErrors, FormikTouched } from "formik";
import { Col, Row, Select, Switch } from "antd";
import styled from "styled-components";

import { ICoupon, IHandleBlur, IHandleChange, IMembershipTier, ISelect } from "@interfaces";
import { SharedInput, SharedSelect, ComponentPeriod, StyledCard, ComponentInfoBox } from "..";
import { ALL_SELECT, enumStatus, enumPlacement } from "@configs";

interface IProps {
    coupon: ICoupon;
    handleBlur: IHandleBlur;
    handleChange: IHandleChange;
    errors: FormikErrors<ICoupon>;
    touched: FormikTouched<ICoupon>;
    dataMemberShip: IMembershipTier[];
    couponUnit: Array<ISelect>;
    handleChangeSelect: (value: Array<string>) => void;
    handleChangeDateFrom: (date: Date | null) => void;
    handleChangeDateTo: (date: Date | null) => void;
    handleChangeCouponUnit: (value: string) => void;
    handleChangeIsDisplay: (status: boolean) => void;
}

export const ComponentCouponsForm = memo((props: IProps) => {
    //props
    const {
        coupon,
        handleBlur,
        handleChange,
        errors,
        touched,
        dataMemberShip,
        couponUnit,
        handleChangeCouponUnit,
        handleChangeSelect,
        handleChangeDateFrom,
        handleChangeDateTo,
        handleChangeIsDisplay,
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
            <div className="title">{t("page.coupon_settings")}</div>
            <SharedInput
                label={t("page.coupon_name")}
                // descLabel={t("page._2_100_characters")}
                style={{ width: "100%" }}
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={coupon.name}
                errors={errors.name}
                touched={touched.name}
                parentClassName="mb-6"
            />

            <Row gutter={16}>
                <Col xs={12} sm={12} md={12}>
                    <SharedInput
                        label={
                            <span className="label">
                                {t("page.coupon_benefit")}{" "}
                                <ComponentInfoBox
                                    title={t("page.box_info.benefit_coupon_title")}
                                    body={[t("page.box_info.benefit_coupon_body")]}
                                    placement={enumPlacement.RIGHT}
                                />
                            </span>
                        }
                        name="benefit"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={coupon.benefit}
                        errors={errors.benefit}
                        touched={touched.benefit}
                        parentClassName="mb-6 eng"
                    />
                </Col>
                <Col xs={12} sm={12} md={12}>
                    {couponUnit && (
                        <StyledSelect>
                            <p className="label">
                                {t("page.unit")}
                                <ComponentInfoBox
                                    title={t("page.box_info.benefit_coupon_title")}
                                    body={[t("page.box_info.unit")]}
                                    placement={enumPlacement.RIGHT}
                                />
                            </p>
                            <Select
                                //@ts-ignore
                                getPopupContainer={(trigger) => trigger.parentNode}
                                onChange={handleChangeCouponUnit}
                                defaultActiveFirstOption={true}
                                value={coupon.unit}
                            >
                                {couponUnit.map((item) => (
                                    <Select.Option key={item.id} value={item.id}>
                                        {item.label}
                                    </Select.Option>
                                ))}
                            </Select>
                        </StyledSelect>
                    )}
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={12} sm={12} md={12}>
                    <SharedInput
                        label={t("page.coupon_code")}
                        name="code"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={coupon.code}
                        errors={errors.code}
                        touched={touched.code}
                        parentClassName="mb-6"
                        disable={true}
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
                        value={coupon.levelIds}
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
                        value={coupon.quantity}
                        errors={errors.quantity}
                        touched={touched.quantity}
                        parentClassName="eng"
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
                        value={coupon.limit}
                        errors={errors.limit}
                        touched={touched.limit}
                        parentClassName="eng"
                    />
                </Col>
            </Row>

            {/* period */}
            <ComponentPeriod
                dateFrom={coupon.startDate}
                dateTo={coupon.endDate}
                limitDate={{ minDate: new Date(Date.now()) }}
                handleDateFrom={handleChangeDateFrom}
                handleDateTo={handleChangeDateTo}
            />
            <Row gutter={16}>
                <Col sm={24} md={12}>
                    <div className="display-coupon">
                        <p className="title">{t("page.display_in_coupon_collection")}</p>
                        <Switch
                            onChange={handleChangeIsDisplay}
                            checked={coupon.isDisplayed === enumStatus.ACTIVE ? true : false}
                        />
                        <p className="sub-title">
                            {t(
                                "page.turn_on_for_users_to_see_coupon_in_their_collection_without_collect_through_link"
                            )}
                        </p>
                    </div>
                </Col>
            </Row>
        </StyledCard>
    );
});

const StyledSelect = styled.div`
    p {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 21px;
        color: #000000;
        margin-bottom: 8px;
    }
    .ant-select-selection--single,
    .ant-select-selection__rendered {
        height: ${(p) => p.theme.heights.input};
        display: flex;
        align-items: center;
    }
`;
