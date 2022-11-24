import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
    ScanIcon,
    SharedButtonDefault,
    SharedInput,
    StyledCard,
    StyledSmallCard,
    StyledSubmitButton,
    StyledTable,
    ComponentInfoBox,
} from "@components";
import ScrollContainer from "react-indiana-drag-scroll";
import { Avatar, Input, Tabs } from "antd";
import { ModuelEmptyState } from "./EmptyState";
import { ModuleMemberCard } from "./Card";
import { ModuleModalQRMobile } from "./Modal";
import { ModuleModalQRWeb } from "./ModalQR";
import { getCurrentId, getCurrentPoints, setLoading } from "@redux";
import { contactAPI } from "@api";
import { showErrorMessage, theme, useNotify } from "@utils";
import { enumActivityType, IActivity, IContactDetail, IPagination } from "@interfaces";
import {
    dateFormatHM,
    enumDisableInput,
    enumTypePoints,
    enumValidation,
    INITIAL_LIST_PARAMS,
    enumPlacement,
} from "@configs";
import { selectContact } from "@redux";
import { ModuleAttachImageUpload } from "./ImageUpload";
import { ModuleConfirmModal } from "./ConfirmModal";
import { useMediaQuery } from "react-responsive";
import { ModuleMobilePopup } from "./MobilePopup";
import { ModuleAlertSuccess } from "./AlertSuccess";
import moment from "moment";
import { ModuleDetailActivity } from "./DetailActivity";

const { Search } = Input;
const { TabPane } = Tabs;

const initFormikVal = {
    add: {
        points: undefined,
        sales: undefined,
    },
    use: {
        points: undefined,
        sales: undefined,
    },
    note: "",
    image_url: [],
};
const defaultAvatar = "/images/newUser/default-user.png";
export const PagePointList = () => {
    //page hook
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { error, success } = useNotify();
    const [customer, setCustomer] = useState<IContactDetail>();
    const [userData, setUserData] = useState<IContactDetail>();
    const [searchValue, setSearchValue] = useState("");
    const [disableInput, setDisableInput] = useState(1);
    const [params, setParams] = useState<IPagination>(INITIAL_LIST_PARAMS);
    const [activity, setActivity] = useState<IActivity[]>([]);
    const currentPoints = useSelector(selectContact).currentPoints;
    const id = useSelector(selectContact).currentUserId;
    const [isVisibleMobileQr, setVisibleMobileQr] = useState(false);
    const [isVisibleWebQr, setVisibleWebQr] = useState(false);
    const [isConfirm, setConfirm] = useState(false);
    const [isUpdate, setUpdate] = useState(false);
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [nextPage, setNextPage] = useState(1);
    const [detailActivity, setViewDetail] = useState<IActivity>();
    const [isViewDetail, setViewDetailPopup] = useState<boolean>(false);

    const isMobile = useMediaQuery({ query: `(max-width: ${theme.breakPoints.breakTablet})` });
    const handleUploadImage = (images: string[]) => {
        setFieldValue("image_url", [...images]);
    };
    const handleClickQr = () => {
        setVisibleMobileQr(!isVisibleMobileQr);
        setVisibleWebQr(!isVisibleWebQr);
    };
    const editPointSchema = Yup.object().shape({
        add: Yup.object().shape({
            points: Yup.number()
                .typeError(
                    t("validation.must_number", {
                        returnObjects: true,
                        name: t("object.points"),
                    })
                )
                .max(
                    enumValidation.MAX_NUMBER,
                    t("validation.max_number", {
                        returnObjects: true,
                        name: t("object.points"),
                        number: enumValidation.MAX_NUMBER,
                    })
                )
                .min(
                    enumValidation.MIN_NUMBER,
                    t("validation.max_number", {
                        returnObjects: true,
                        name: t("object.points"),
                        number: enumValidation.MIN_NUMBER,
                    })
                ),
            sales: Yup.number()
                .typeError(
                    t("validation.must_number", {
                        returnObjects: true,
                        name: t("object.points"),
                    })
                )
                .min(
                    enumValidation.MIN_NUMBER,
                    t("validation.min_number", {
                        returnObjects: true,
                        name: t("object.sales"),
                        number: enumValidation.MIN_NUMBER,
                    })
                ),
        }),
        use: Yup.object().shape({
            points: Yup.number()
                .typeError(
                    t("validation.must_number", {
                        returnObjects: true,
                        name: t("object.points"),
                    })
                )
                .max(
                    currentPoints,
                    t("validation.max_number", {
                        returnObjects: true,
                        name: t("object.points"),
                        number: currentPoints,
                    })
                )
                .min(
                    enumValidation.MIN_NUMBER,
                    t("validation.min_number", {
                        returnObjects: true,
                        name: t("object.points"),
                        number: enumValidation.MIN_NUMBER,
                    })
                ),
            sales: Yup.number()
                .typeError(
                    t("validation.must_number", {
                        returnObjects: true,
                        name: t("object.points"),
                    })
                )
                .min(
                    enumValidation.MIN_NUMBER,
                    t("validation.min_number", {
                        returnObjects: true,
                        name: t("object.sales"),
                        number: enumValidation.MIN_NUMBER,
                    })
                ),
        }),
    });
    const handleSearch = async (value) => {
        if (value) {
            try {
                dispatch(setLoading(true));
                const res = await contactAPI.getClientByMemberCode(value);
                setCustomer(res.data);
                if (res.data) {
                    fetchPointActivity(res.data._id);
                    const detail = await contactAPI.detail(res.data.contactId);
                    setUserData(detail.data);
                    dispatch(getCurrentPoints(detail.data.user?.points.totalPoints));
                    dispatch(getCurrentId(detail.data.user?._id));
                }
            } catch (err: any) {
                if (err.response) {
                    error(showErrorMessage(err.response));
                } else error(t("message.customer_not_found"));
            } finally {
                dispatch(setLoading(false));
            }
        }
    };
    const handleClearCustomer = () => {
        setCustomer(undefined);
        setSearchValue("");
        setActivity([]);
    };
    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };
    const handleSearchFromQr = (value) => {
        setSearchValue(value);
        setVisibleMobileQr(false);
        setVisibleWebQr(false);
    };
    const sendSubmit = async () => {
        const userId = customer?._id;
        if (
            !values.add?.points &&
            !values.add?.sales &&
            !values.use?.points &&
            !values.use?.sales
        ) {
            switch (disableInput) {
                case enumDisableInput.ADD_POINTS: {
                    setFieldError(
                        "add.points",
                        t("validation.required", {
                            returnObjects: true,
                            name: t("object.points"),
                        })
                    );
                    break;
                }
                case enumDisableInput.ADD_SALES: {
                    setFieldError(
                        "add.sales",
                        t("validation.required", {
                            returnObjects: true,
                            name: t("object.sales"),
                        })
                    );
                    break;
                }
                case enumDisableInput.USE_POINTS: {
                    setFieldError(
                        "use.points",
                        t("validation.required", {
                            returnObjects: true,
                            name: t("object.points"),
                        })
                    );
                    break;
                }
                case enumDisableInput.USE_SALES: {
                    setFieldError(
                        "use.sales",
                        t("validation.required", {
                            returnObjects: true,
                            name: t("object.sales"),
                        })
                    );
                    break;
                }
                default:
                    break;
            }
        } else {
            let params;
            switch (disableInput) {
                case enumDisableInput.ADD_POINTS: {
                    params = {
                        userId: id || userId,
                        type: enumTypePoints.POINT,
                        isAdd: true,
                        amount: values.add?.points,
                        note: values.note,
                        image_url: values.image_url,
                    };
                    break;
                }
                case enumDisableInput.ADD_SALES: {
                    params = {
                        userId: id || userId,
                        type: enumTypePoints.SALES,
                        isAdd: true,
                        amount: values.add?.sales,
                        note: values.note,
                        image_url: values.image_url,
                    };
                    break;
                }
                case enumDisableInput.USE_POINTS: {
                    params = {
                        userId: id || userId,
                        type: enumTypePoints.POINT,
                        isAdd: false,
                        amount: values.use?.points,
                        note: values.note,
                        image_url: values.image_url,
                    };
                    break;
                }
                case enumDisableInput.USE_SALES: {
                    params = {
                        userId: id || userId,
                        type: enumTypePoints.SALES,
                        isAdd: false,
                        amount: values.use?.sales,
                        note: values.note,
                        image_url: values.image_url,
                    };
                    break;
                }
                default:
                    break;
            }
            await updatePoints(
                params as {
                    userId: string;
                    amount: number;
                    isAdd?: boolean;
                    type: string;
                    image_url: string[];
                    note: string;
                }
            );
            await handleSearch(searchValue);
            await fetchInitPointActivity(customer?._id);
            resetForm();
        }
    };
    const handleFetchingPagination = (id) => {
        if (nextPage !== null) {
            fetchPointActivity(id);
        }
    };
    const fetchInitPointActivity = async (id) => {
        try {
            dispatch(setLoading(true));
            const res = await contactAPI.getClientHistoryPointByUserId(id, params);
            setActivity(res.data.docs);
            setNextPage(res.data.nextPage);
            if (res.data.nextPage !== null && res.data.nextPage > 0) {
                setParams({ ...params, page: res.data.page + 1 });
            }
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.customer_not_found"));
        } finally {
            dispatch(setLoading(false));
        }
    };
    const fetchPointActivity = async (id) => {
        try {
            dispatch(setLoading(true));
            const res = await contactAPI.getClientHistoryPointByUserId(id, params);
            setActivity([...activity, ...res.data.docs]);
            setNextPage(res.data.nextPage);
            if (res.data.nextPage !== null && res.data.nextPage > 0) {
                setParams({ ...params, page: res.data.page + 1 });
            }
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.customer_not_found"));
        } finally {
            dispatch(setLoading(false));
        }
    };
    const updatePoints = async (params: {
        userId: string;
        amount: number;
        isAdd?: boolean;
        type: string;
        image_url: string[];
        note: string;
    }) => {
        try {
            const res = await contactAPI.updatePoint(params);
            if (res.data) {
                resetForm();
                setUpdate(true);
                setConfirm(false);
                setAlertSuccess(true);
                success(t("message.update.success"));
            }
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.update.fail"));
        }
    };
    const handleConfirmModal = () => {
        if (values.add.points || values.use.points || values.add.sales || values.use.sales) {
            setConfirm(!isConfirm);
        } else {
            setConfirm(false);
            setUpdate(false);
            error(t("page.member_points.pls_fill_form"));
        }
    };
    const handleAlertSuccess = () => {
        setAlertSuccess(false);
        setUpdate(false);
    };
    const handleViewDetail = (item) => {
        setViewDetail(item);
        setViewDetailPopup(true);
    };
    const handleCloseDetail = () => {
        setViewDetailPopup(false);
    };
    const {
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldError,
        setFieldValue,
        resetForm,
    } = useFormik({
        initialValues: initFormikVal,
        validationSchema: editPointSchema,
        onSubmit: sendSubmit,
    });

    return (
        <StyledTable>
            <ModuleAlertSuccess isVisible={alertSuccess} handleCancel={handleAlertSuccess} />
            {isMobile ? (
                <ModuleModalQRMobile
                    handleOk={handleClickQr}
                    isVisible={isVisibleMobileQr}
                    handleSearchFromQr={handleSearchFromQr}
                />
            ) : (
                <ModuleModalQRWeb
                    handleOk={handleClickQr}
                    isVisible={isVisibleWebQr}
                    handleSearchFromQr={handleSearchFromQr}
                />
            )}
            <ModuleDetailActivity
                isVisible={isViewDetail}
                detail={detailActivity || undefined}
                handleCancel={handleCloseDetail}
                customer={customer || undefined}
            />
            {isMobile ? (
                <ModuleMobilePopup
                    isVisible={isConfirm}
                    values={values}
                    isSubmitting={isSubmitting}
                    customerName={customer?.fullName || ""}
                    handleCancel={handleConfirmModal}
                    handleOk={sendSubmit}
                    userData={userData || undefined}
                    isUpdate={isUpdate}
                />
            ) : (
                <ModuleConfirmModal
                    handleOk={sendSubmit}
                    isVisible={isConfirm}
                    values={values}
                    isSubmitting={isSubmitting}
                    customerName={customer?.fullName || ""}
                    userData={userData || undefined}
                    isUpdate={isUpdate}
                    handleCancel={handleConfirmModal}
                />
            )}
            <StyledPageWraper>
                <div className="page-layout">
                    <div className="page-header">
                        <h3>{t("page.member_points.edit_points_member")}</h3>
                        <ComponentInfoBox
                            videoUrl="abc"
                            title={t("page.box_info.edit_point_title")}
                            body={[
                                t("page.box_info.edit_point_body"),
                                t("page.box_info.edit_point_body_1"),
                                t("page.box_info.edit_point_body_2"),
                                t("page.box_info.edit_point_body_3"),
                            ]}
                            placement={enumPlacement.RIGHT}
                        />
                    </div>
                    <ScrollContainer vertical={true}>
                        <div className="member-layout">
                            <StyledLayout>
                                <div className="left-col">
                                    <div className="card-element">
                                        <StyledCard maxWidth="unset">
                                            <h3>{t("page.member_points.search_customer")}</h3>
                                            <div>
                                                <div className="search-member">
                                                    <Search
                                                        className="search-input"
                                                        onSearch={handleSearch}
                                                        onChange={handleSearchChange}
                                                        value={searchValue}
                                                        placeholder={t(
                                                            "page.member_points.search_placeholder"
                                                        )}
                                                    />
                                                    <SharedButtonDefault
                                                        style={btnStyle}
                                                        text={t("page.member_points.qr_code")}
                                                        type="default"
                                                        size="default"
                                                        className="search-btn"
                                                        onClick={handleClickQr}
                                                        // disable={isSubmitting}
                                                        customIcon={<ScanIcon />}
                                                    ></SharedButtonDefault>
                                                </div>
                                                <div className="search-result">
                                                    {customer ? (
                                                        <ModuleMemberCard
                                                            customer={customer}
                                                            callBack={handleClearCustomer}
                                                        />
                                                    ) : (
                                                        <ModuelEmptyState />
                                                    )}
                                                </div>
                                            </div>
                                        </StyledCard>
                                    </div>
                                    {customer && (
                                        <div className="edit-point-layout">
                                            <form onSubmit={handleSubmit}>
                                                <div className="card-element">
                                                    <StyledCard maxWidth="unset">
                                                        <h3>
                                                            {t("page.member_points.edit_points")}
                                                        </h3>
                                                        <div>
                                                            <Tabs defaultActiveKey="1">
                                                                <TabPane
                                                                    tab={t(
                                                                        "page.member_points.add_points"
                                                                    )}
                                                                    key="1"
                                                                >
                                                                    <div className="add-point-field">
                                                                        <div
                                                                            className="input-col"
                                                                            onClick={() =>
                                                                                setDisableInput(
                                                                                    enumDisableInput.ADD_SALES
                                                                                )
                                                                            }
                                                                        >
                                                                            <SharedInput
                                                                                disable={
                                                                                    !(
                                                                                        disableInput ===
                                                                                        enumDisableInput.ADD_SALES
                                                                                    )
                                                                                }
                                                                                value={
                                                                                    values.add.sales
                                                                                }
                                                                                onChange={
                                                                                    handleChange
                                                                                }
                                                                                onBlur={handleBlur}
                                                                                type="number"
                                                                                placeholder={t(
                                                                                    "page.sales"
                                                                                )}
                                                                                name="add.sales"
                                                                                onClick={resetForm}
                                                                                touched={
                                                                                    touched.add
                                                                                        ?.sales
                                                                                }
                                                                                errors={
                                                                                    errors.add
                                                                                        ?.sales
                                                                                }
                                                                            />
                                                                            <span className="float-label">
                                                                                {t(
                                                                                    "page.member_points.baht"
                                                                                )}
                                                                            </span>
                                                                        </div>
                                                                        <p className="middle-or">
                                                                            {t("page.or")}
                                                                        </p>

                                                                        <div
                                                                            className="input-col"
                                                                            onClick={() =>
                                                                                setDisableInput(
                                                                                    enumDisableInput.ADD_POINTS
                                                                                )
                                                                            }
                                                                        >
                                                                            <SharedInput
                                                                                disable={
                                                                                    !(
                                                                                        disableInput ===
                                                                                        enumDisableInput.ADD_POINTS
                                                                                    )
                                                                                }
                                                                                value={
                                                                                    values.add
                                                                                        ?.points
                                                                                }
                                                                                onChange={
                                                                                    handleChange
                                                                                }
                                                                                onBlur={handleBlur}
                                                                                touched={
                                                                                    touched.add
                                                                                        ?.points
                                                                                }
                                                                                errors={
                                                                                    errors.add
                                                                                        ?.points
                                                                                }
                                                                                type="number"
                                                                                name="add.points"
                                                                                onClick={resetForm}
                                                                                placeholder={t(
                                                                                    "page.points"
                                                                                )}
                                                                            />
                                                                            <span className="float-label">
                                                                                {/* {t(
                                                                                    "page.member_points.baht"
                                                                                )} */}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </TabPane>
                                                                <TabPane
                                                                    tab={t(
                                                                        "page.member_points.use_points"
                                                                    )}
                                                                    key="2"
                                                                >
                                                                    <div className="use-point-field">
                                                                        <div
                                                                            className="w-90 point-input"
                                                                            onClick={() =>
                                                                                setDisableInput(
                                                                                    enumDisableInput.USE_POINTS
                                                                                )
                                                                            }
                                                                        >
                                                                            <SharedInput
                                                                                disable={
                                                                                    !(
                                                                                        disableInput ===
                                                                                        enumDisableInput.USE_POINTS
                                                                                    )
                                                                                }
                                                                                value={
                                                                                    values.use
                                                                                        .points
                                                                                }
                                                                                label={t(
                                                                                    "page.member_points.use_points"
                                                                                )}
                                                                                onChange={
                                                                                    handleChange
                                                                                }
                                                                                onBlur={handleBlur}
                                                                                type="number"
                                                                                placeholder={t(
                                                                                    "page.points"
                                                                                )}
                                                                                name="use.points"
                                                                                onClick={resetForm}
                                                                                touched={
                                                                                    touched.use
                                                                                        ?.points
                                                                                }
                                                                                errors={
                                                                                    errors.use
                                                                                        ?.points
                                                                                }
                                                                            />
                                                                            <span className="float-label">
                                                                                {t(
                                                                                    "page.member_points.points"
                                                                                )}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </TabPane>
                                                            </Tabs>
                                                        </div>
                                                    </StyledCard>
                                                </div>
                                                <div className="card-element">
                                                    <StyledCard maxWidth="unset">
                                                        <h3>{t("page.member_points.notes")}</h3>
                                                        <div>
                                                            <SharedInput
                                                                label={t(
                                                                    "page.member_points.notes"
                                                                )}
                                                                placeholder={t(
                                                                    "page.member_points.specail_birthday"
                                                                )}
                                                                onChange={handleChange}
                                                                value={values.note}
                                                                name="note"
                                                            />
                                                        </div>
                                                        <StyledImageUpload>
                                                            <ModuleAttachImageUpload
                                                                images={values.image_url}
                                                                handleGetImage={handleUploadImage}
                                                            />
                                                        </StyledImageUpload>
                                                    </StyledCard>
                                                </div>
                                                <StyledSubmitButton
                                                    type="default"
                                                    text={t("page.member_points.send_points")}
                                                    htmlType="button"
                                                    onClick={handleConfirmModal}
                                                />
                                            </form>
                                        </div>
                                    )}
                                </div>
                                <div className="right-col">
                                    <StyledSmallCard maxWidth="unset">
                                        <h3>{t("page.member_points.activity_edit_points")}</h3>
                                        <StyledTableLayout>
                                            <tr className="tr-header">
                                                <th>{t("page.member_points.user")}</th>
                                                <th>{t("page.member_points.activity")}</th>
                                                <th>{t("page.member_points.time")}</th>
                                                <th className="point">
                                                    {t("page.member_points.points")}
                                                </th>
                                            </tr>
                                            <tbody>
                                                {activity.length > 0 ? (
                                                    <ScrollContainer
                                                        className="table-container"
                                                        vertical={true}
                                                        hideScrollbars={false}
                                                        onEndScroll={() =>
                                                            handleFetchingPagination(customer?._id)
                                                        }
                                                    >
                                                        {activity.map((item) => (
                                                            <StyledTableRow
                                                                key={item._id}
                                                                onClick={() =>
                                                                    handleViewDetail(item)
                                                                }
                                                            >
                                                                <td className="user-info">
                                                                    <Avatar
                                                                        src={
                                                                            item.userImage ||
                                                                            defaultAvatar
                                                                        }
                                                                        className="avatar"
                                                                    />
                                                                    <div className="user-name">
                                                                        <p>{customer?.fullName}</p>
                                                                        <p>
                                                                            {customer?.phoneNumber}
                                                                        </p>
                                                                        <div className="id">
                                                                            {t(
                                                                                "page.member_points.id",
                                                                                {
                                                                                    id: customer?.memberCode,
                                                                                }
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    {item.type ===
                                                                    enumActivityType.GIVEN
                                                                        ? t(
                                                                              "page.member_points.add_points"
                                                                          )
                                                                        : t(
                                                                              "page.member_points.use_points"
                                                                          )}
                                                                </td>
                                                                <td>
                                                                    {moment(
                                                                        item.createdAt || ""
                                                                    ).format(dateFormatHM)}
                                                                </td>
                                                                {item.type ===
                                                                enumActivityType.GIVEN ? (
                                                                    <td className="number green">
                                                                        {t(
                                                                            "page.member_points.plus",
                                                                            {
                                                                                point: item.point,
                                                                            }
                                                                        )}
                                                                    </td>
                                                                ) : (
                                                                    <td className="number red">
                                                                        {t(
                                                                            "page.member_points.minute",
                                                                            {
                                                                                point: item.point,
                                                                            }
                                                                        )}
                                                                    </td>
                                                                )}
                                                            </StyledTableRow>
                                                        ))}
                                                    </ScrollContainer>
                                                ) : (
                                                    <StyledImptyActivity>
                                                        <p>{t("page.member_points.no_activity")}</p>
                                                    </StyledImptyActivity>
                                                )}
                                            </tbody>
                                        </StyledTableLayout>
                                    </StyledSmallCard>
                                </div>
                            </StyledLayout>
                        </div>
                    </ScrollContainer>
                </div>
            </StyledPageWraper>
        </StyledTable>
    );
};
const btnStyle = {
    background: "#0263E0",
    width: 145,
    color: "white",
    fontSize: 16,
    fontWeight: 600,
    height: 49,
};
const StyledPageWraper = styled.div`
    .page-layout {
        .page-header {
            display: flex;
            flex-wrap: wrap;
            justify-content: initial;
            padding: 1.5rem 0 14px 0;
            .add-btn {
                background-color: ${(p) => p.theme.colors.danger};
                color: white;
                justify-content: space-evenly;
            }

            h3 {
                margin-right: 10px;
                font-weight: 700;
                font-size: 35px;
                margin-bottom: 0;
                color: black;
            }
            p {
                color: ${(p) => p.theme.colors.fadedText};
                font-size: 16px;
                font-weight: 600;
            }
            @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
                /* flex-direction: column;
                align-items: flex-start; */
                align-items: center;
                div {
                    justify-content: flex-start;
                }
                div:nth-child(2) {
                    margin-top: 12px;
                }
                h3 {
                    font-style: normal;
                    font-weight: 700;
                    font-size: 16px;
                    line-height: 22px;
                    color: #000000;
                    margin: 0;
                }
            }
        }
    }
`;
const StyledImptyActivity = styled.div`
    height: 124px;
    background: #f7f7f8;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const StyledImageUpload = styled.div`
    .image-upload-title {
        display: flex;
        align-items: center;
        h4,
        p {
            margin: 0;
        }
        h4 {
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            color: #000000;
        }
        p {
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 16px;
            color: #6c7084;
            margin-left: 10px;
        }
    }
`;
const StyledTableLayout = styled.table`
    width: 100%;
    .tr-header {
        display: flex;
        padding: 0 20px 16px 20px;
        th {
            flex: 1;
            font-style: normal;
            font-weight: 800;
            font-size: 12px;
            line-height: 16px;
            color: #a5a5a5;
        }
        th:first-child {
            flex: 2;
        }
        th.point {
            padding-left: 10px;
        }
    }
    tbody {
        .table-container {
            overflow-y: scroll;
            padding: 4px;
            max-height: 100vh;
        }
    }
`;
const StyledTableRow = styled.tr`
    display: flex;
    align-items: initial;
    background: #ffffff;
    border: 1px solid #e1e1e1;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 8px;
    &:hover {
        box-shadow: 0px 0px #1e7cf5, 0px 0 5px #1e7cf5;
    }
    p {
        margin: 0;
    }
    td {
        flex: 1;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #000000;
    }
    td:first-child {
        flex: 2;
    }
    td.number {
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 22px;
        padding-left: 10px;
        &.green {
            color: #6cd14e;
        }
        &.red {
            color: #f22f46;
        }
    }
    .user-info {
        display: flex;
        justify-content: flex-start;
        .avatar {
            width: 32px;
            height: 32px;
            display: flex;
            justify-content: center;
            padding: 4px;
            background: #f0f0f0;
            min-width: 32px;
            img {
                padding: 0px;
                border-radius: 22px;
                width: 100%;
                height: 100%;
            }
        }
        img {
            width: 43px;
            height: 43px;
            border-radius: 50%;
        }

        .user-name {
            padding-left: 10px;

            p {
                font-weight: 700;
                font-size: 16px;
                line-height: 22px;
                color: #000000;
                white-space: nowrap;
                text-overflow: ellipsis;
                max-width: 132px;
            }
            .id {
                font-weight: 400;
                font-size: 12px;
                line-height: 16px;
                color: #646464;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                max-width: 102px;
            }
        }
    }
`;
const StyledLayout = styled.div`
    display: flex;
    column-gap: 34px;
    .left-col {
        flex: 4;
        .card-element {
            margin-bottom: 19px;
            .add-point-field {
                p {
                    margin: 0;
                }
                display: flex;
                align-items: center;
                justify-content: space-between;
                .input-col {
                    flex: 4;
                    position: relative;
                    .float-label {
                        position: absolute;
                        top: 15px;
                        right: 14px;
                        font-style: normal;
                        font-weight: 400;
                        font-size: 12px;
                        line-height: 16px;
                        color: #646464;
                    }
                }
                input {
                    height: 48px;
                }
                .middle-or {
                    margin: 0 12px 14px 12px;
                    text-align: center;
                    /* margin-bottom: 14px; */
                    font-style: normal;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 22px;
                }
            }
            .use-point-field {
                width: 50%;

                .w-90 {
                    width: 100%;
                }
                .point-input {
                    position: relative;
                    .float-label {
                        position: absolute;
                        top: 56px;
                        right: 14px;
                        font-style: normal;
                        font-weight: 400;
                        font-size: 12px;
                        line-height: 16px;
                        color: #646464;
                    }
                }
            }
            .ant-tabs-bar.ant-tabs-top-bar {
                border-bottom: 0;
            }
            .ant-tabs-nav .ant-tabs-tab-active {
                font-weight: 700;
                color: #f22f46;
            }
            .ant-tabs-nav .ant-tabs-tab {
                padding: 0;
                padding-bottom: 6px;
            }
            .ant-tabs-nav .ant-tabs-tab:hover {
                color: #f22f46;
            }
            .ant-tabs-nav .ant-tabs-tab:focus-visible {
                outline: 0;
            }
            .ant-tabs-ink-bar {
                background-color: #f22f46;
                width: 72px;
            }
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
            .card-element {
                h3 {
                    font-style: normal;
                    font-weight: 700;
                    font-size: 14px;
                    line-height: 19px;
                    color: #000000;
                }
            }
        }
    }
    .right-col {
        flex: 3;
        @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
            display: none;
        }
    }
    .search-result {
        background: #f7f7f8;
        padding: 8px;
    }
    .search-member {
        display: flex;
        column-gap: 16px;
        margin-bottom: 28px;
        .search-input {
            height: 48px;
            background: #ffffff;
            border: 0.5px solid #a5a5a5;
            border-radius: 5px;
            &:hover {
                border: 0;
            }
        }
        .ant-input-suffix {
            i {
                font-size: 24px;
            }
        }
        .search-btn {
            border-radius: 4px;

            .btn-text {
                margin-left: 5px;
            }
            @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
                width: 49px !important;
                .btn-text {
                    display: none;
                }
            }
        }
    }
`;
