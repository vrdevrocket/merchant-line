import { memo } from "react";
import { useTranslation } from "react-i18next";
import { FormikErrors, FormikTouched } from "formik";
import { Col, Row } from "antd";

import {
    IHandleBlur,
    IHandleChange,
    IMembershipTier,
    IRewardData,
    ISelect,
    IVariant,
} from "@interfaces";
import {
    SharedInput,
    SharedSelect,
    ComponentPeriod,
    SharedSelectBirthMonth,
    SharedButtonDefault,
    IconTrash,
    StyledCard,
    ComponentInfoBox,
} from "@components";
import { ALL_SELECT, enumPlacement } from "@configs";

interface IProps {
    reward: IRewardData;
    handleBlur: IHandleBlur;
    handleChange: IHandleChange;
    errors: FormikErrors<IRewardData>;
    touched: FormikTouched<IRewardData>;
    dataMemberShip: IMembershipTier[];
    dataBirthMonth: { name: string; value: string }[];
    changeSelectMembership: (value: Array<string>) => void;
    changeSelectBirthMonth: (value: Array<string>) => void;
    handleChangeDateFrom: (date: Date) => void;
    handleChangeDateTo: (date: Date) => void;
    handleAddVariant: () => void;
    handleRemoveVariant: (value: IVariant) => void;
}

export const ComponentRewardForm = memo((props: IProps) => {
    //props
    const {
        reward,
        handleBlur,
        handleChange,
        errors,
        touched,
        dataMemberShip,
        dataBirthMonth,
        changeSelectMembership,
        changeSelectBirthMonth,
        handleChangeDateFrom,
        handleChangeDateTo,
        handleAddVariant,
        handleRemoveVariant,
    } = props;

    // console.log(reward.startDate, reward.endDate);

    //hooks
    const { t } = useTranslation();
    const membershipSelect: ISelect[] = [
        ...dataMemberShip.map((item) => ({
            id: item._id,
            label: item.membershipName,
        })),
        {
            id: ALL_SELECT,
            label: t("page.all_member"),
        },
    ];
    const birthMonthSelect = [
        ...dataBirthMonth,
        {
            name: t("page.all_month"),
            value: ALL_SELECT,
        },
    ];
    return (
        <StyledCard>
            <div className="title">{t("page.reward_settings")}</div>
            <SharedInput
                label={t("page.reward_name")}
                // descLabel={t("page._2_100_characters")}
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={reward.name}
                errors={errors.name}
                touched={touched.name}
                parentClassName="mb-6"
            />
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12}>
                    <SharedInput
                        label={t("page.points")}
                        name="point"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={reward.point}
                        errors={errors.point}
                        touched={touched.point}
                        type="number"
                        parentClassName="mb-6 eng"
                    />
                </Col>
                <Col xs={12} sm={12} md={12}>
                    <SharedInput
                        label={t("page.reward_code")}
                        name="code"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={reward.code}
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
                                    title={t("page.box_info.reward_membership_title")}
                                    body={[
                                        t("page.box_info.reward_membership_body_1"),
                                        t("page.box_info.reward_membership_body_2"),
                                    ]}
                                    placement={enumPlacement.RIGHT}
                                />
                            </span>
                        }
                        data={membershipSelect}
                        value={reward.levelIds}
                        onChange={changeSelectMembership}
                        className="mb-22"
                    />
                </Col>
                <Col xs={12} sm={12} md={12}>
                    <SharedSelectBirthMonth
                        label={
                            <span className="label">
                                {t("page.birth_month")}
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
                        data={birthMonthSelect}
                        value={reward.birthMonths}
                        onChange={changeSelectBirthMonth}
                        className="mb-22"
                    />
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={12} sm={12} md={12}>
                    <SharedInput
                        label={
                            <span>
                                {t("page.quantity_limit")}
                                <ComponentInfoBox
                                    title={t("page.box_info.reward_quantity_title")}
                                    body={[t("page.box_info.reward_quantity_body")]}
                                    placement={enumPlacement.RIGHT}
                                />
                            </span>
                        }
                        name="quantity"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={reward.quantity}
                        errors={errors.quantity}
                        touched={touched.quantity}
                        type="number"
                        parentClassName="mb-6 eng"
                    />
                </Col>
                <Col xs={12} sm={12} md={12}>
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
                        value={reward.limit}
                        errors={errors.limit}
                        touched={touched.limit}
                        type="number"
                        parentClassName="mb-6 eng"
                    />
                </Col>
            </Row>
            {/* period */}
            <ComponentPeriod
                dateFrom={reward.startDate || new Date()}
                dateTo={reward.endDate || new Date()}
                limitDate={{ minDate: reward.startDate }}
                handleDateFrom={handleChangeDateFrom}
                handleDateTo={handleChangeDateTo}
            />
            <Row>
                <div className="variants-field">
                    <div className="label">
                        <p className="title">
                            {t("page.variants")}
                            <ComponentInfoBox
                                title={t("page.box_info.variant")}
                                body={[t("page.box_info.variant_body")]}
                                placement={enumPlacement.RIGHT}
                            />
                        </p>
                    </div>
                    <div className="variant-layout">
                        <div className="variant-items">
                            {reward.variants.map((item) => (
                                <div className="variant-wrap">
                                    <div className="variant-item">{item.name}</div>
                                    <div className="icon" onClick={() => handleRemoveVariant(item)}>
                                        <IconTrash size={20} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <SharedButtonDefault
                            className="button-variant-add"
                            text={t("page.add")}
                            type="default"
                            icon="plus"
                            onClick={handleAddVariant}
                        />
                    </div>
                </div>
            </Row>
        </StyledCard>
    );
});
