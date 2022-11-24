import { memo } from "react";
import { useTranslation } from "react-i18next";
import { FormikErrors, FormikTouched } from "formik";
import { Col, Row } from "antd";

import {
    IHandleBlur,
    IHandleChange,
    ISelect,
    IBenefitData,
    IMembershipTier,
    ILimitSelect,
} from "@interfaces";
import {
    SharedInput,
    SharedSelect,
    ComponentPeriod,
    SharedSelectBirthMonth,
    StyledCard,
    SharedSelectTimeUnit,
    ComponentInfoBox,
} from "@components";
import { ALL_SELECT, enumPlacement } from "@configs";

interface IProps {
    benefit: IBenefitData;
    handleBlur: IHandleBlur;
    handleChange: IHandleChange;
    errors: FormikErrors<IBenefitData>;
    touched: FormikTouched<IBenefitData>;
    dataMemberShip: IMembershipTier[];
    dataBirthMonth: Array<{ name: string; value: string }>;
    changeSelectMembership: (value: Array<string>) => void;
    changeSelectQuantityUnit: (value: string) => void;
    changeSelectLimitUnit: (value: string) => void;
    changeSelectBirthMonth: (value: Array<string>) => void;
    handleChangeDateFrom: (date: Date) => void;
    handleChangeDateTo: (date: Date) => void;
}

export const ComponentBenefitForm = memo((props: IProps) => {
    //props
    const {
        benefit,
        handleBlur,
        handleChange,
        errors,
        touched,
        dataMemberShip,
        dataBirthMonth,
        changeSelectMembership,
        changeSelectQuantityUnit,
        changeSelectLimitUnit,
        changeSelectBirthMonth,
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

    const birthMonth = [
        ...dataBirthMonth,
        {
            name: t("page.all_month"),
            value: ALL_SELECT,
        },
    ];
    const limitTimeUnits: ILimitSelect[] = [
        {
            name: "Month",
            value: "MONTH",
        },
        {
            name: "All time",
            value: "ALLTIME",
        },
    ];

    return (
        <StyledCard>
            <div className="title">{t("page.benefit_settings")}</div>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12}>
                    <SharedInput
                        label={t("page.benefit_name")}
                        // descLabel={t("page._2_100_characters")}
                        name="name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={benefit.name}
                        errors={errors.name}
                        touched={touched.name}
                        parentClassName="mb-6"
                    />
                </Col>
                <Col xs={12} sm={12} md={12}>
                    <SharedInput
                        label={t("page.benefit_code")}
                        name="code"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={benefit.code}
                        errors={errors.code}
                        touched={touched.code}
                        parentClassName="mb-6 eng"
                        disable={true}
                    />
                </Col>
            </Row>

            <Row gutter={16}>
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
                        value={benefit.levelIds}
                        onChange={changeSelectMembership}
                        className="mb-22"
                    />
                </Col>
                <Col xs={12} sm={12} md={12}>
                    <SharedSelectBirthMonth
                        label={
                            <span className="label">
                                {t("page.birth_month")}{" "}
                                <ComponentInfoBox
                                    title={t("page.box_info.reward__birth_month")}
                                    body={[
                                        t("page.box_info.reward_birth_body_1"),
                                        t("page.box_info.reward_birth_body_2"),
                                    ]}
                                    placement={enumPlacement.RIGHT}
                                />
                            </span>
                        }
                        data={birthMonth}
                        value={benefit.birthMonths}
                        onChange={changeSelectBirthMonth}
                        className="mb-22"
                    />
                </Col>
            </Row>
            <Row gutter={16} className="visible-md">
                <Col sm={24} md={6}>
                    <SharedInput
                        label={
                            <span>
                                {t("page.quantity_limit")}
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
                        value={benefit.quantity}
                        errors={errors.quantity}
                        touched={touched.quantity}
                        type="number"
                        parentClassName="mb-6 eng"
                    />
                </Col>
                <Col sm={0} md={1}>
                    <div className="devider">/</div>
                </Col>
                <Col sm={24} md={5}>
                    <SharedSelectTimeUnit
                        label={t("page.membership")}
                        data={limitTimeUnits}
                        value={benefit.quantityUnit}
                        onChange={changeSelectQuantityUnit}
                        className="mb-22"
                    />
                </Col>

                <Col sm={24} md={6}>
                    <SharedInput
                        label={
                            <span>
                                {t("page.quantity_limit_user")}
                                <ComponentInfoBox
                                    title={t("page.box_info.reward__quantity_month")}
                                    body={[t("page.box_info.reward__quantity_body")]}
                                    placement={enumPlacement.RIGHT}
                                />
                            </span>
                        }
                        name="limit"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={benefit.limit}
                        errors={errors.limit}
                        touched={touched.limit}
                        type="number"
                        parentClassName="mb-6 eng"
                    />
                </Col>
                <Col sm={0} md={1}>
                    <div className="devider">/</div>
                </Col>
                <Col sm={24} md={5}>
                    <SharedSelectTimeUnit
                        label={t("page.membership")}
                        data={limitTimeUnits}
                        value={benefit.limitUnit}
                        onChange={changeSelectLimitUnit}
                        className="mb-22"
                    />
                </Col>
            </Row>
            {/* for mobile design */}
            <div className="visible-ms">
                <Row gutter={16}>
                    <Col xs={12} sm={12} md={6}>
                        <SharedInput
                            label={t("page.quantity_limit")}
                            name="quantity"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={benefit.quantity}
                            errors={errors.quantity}
                            touched={touched.quantity}
                            type="number"
                            parentClassName="mb-6 eng"
                        />
                    </Col>
                    <Col xs={1} sm={1} md={1}>
                        <div className="devider">/</div>
                    </Col>
                    <Col xs={10} sm={11} md={5}>
                        <SharedSelectTimeUnit
                            label={t("page.membership")}
                            data={limitTimeUnits}
                            value={benefit.quantityUnit}
                            onChange={changeSelectQuantityUnit}
                            className="mb-22"
                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={12} sm={12} md={6}>
                        <SharedInput
                            label={t("page.quantity_limit_user")}
                            name="limit"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={benefit.limit}
                            errors={errors.limit}
                            touched={touched.limit}
                            type="number"
                            parentClassName="mb-6 eng"
                        />
                    </Col>
                    <Col xs={1} sm={1} md={1}>
                        <div className="devider">/</div>
                    </Col>
                    <Col xs={10} sm={11} md={5}>
                        <SharedSelectTimeUnit
                            label={t("page.membership")}
                            data={limitTimeUnits}
                            value={benefit.limitUnit}
                            onChange={changeSelectLimitUnit}
                            className="mb-22"
                        />
                    </Col>
                </Row>
            </div>

            {/* period */}
            <ComponentPeriod
                dateFrom={benefit.startDate}
                dateTo={benefit.endDate}
                limitDate={{ minDate: new Date() }}
                handleDateFrom={handleChangeDateFrom}
                handleDateTo={handleChangeDateTo}
            />
        </StyledCard>
    );
});
