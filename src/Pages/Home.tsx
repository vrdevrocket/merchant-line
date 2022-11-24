import styled from "styled-components";
import {
    useEffect,
    useState,
    // KeyboardEvent
} from "react";
// import { Search } from "react-feather";
import { useTranslation } from "react-i18next";
import // Col,
// Row,
// Divider,
// Avatar,
// Button
"antd";
import {
    // Swiper,
    SwiperSlide,
} from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import {
    // useDispatch,
    useSelector,
} from "react-redux";
// import { useHistory } from "react-router";
import { Skeleton } from "@mui/material";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";

import {
    ComponentCardStat,
    ModuelBenefitCarousel,
    ModuleCircularProgress,
    // SharedInputDefault,
} from "@components";
// import { ModuleCart } from "@modules";
import { dashboardAPI } from "@api";
import {
    // getParamSearchContact,
    selectAuth,
} from "@redux";
import { INavigationBox, IChartData, IPoster } from "@interfaces";
import {
    enumLanuage,
    enumStatus,
    LOU_ID,
    // PATH_CONTACTS
} from "@configs";
import { ModuleProductGuideModal, ModuleUserGuideModal } from "@modules";

export const PageHome = () => {
    // page hook
    const { t } = useTranslation();
    // redux state
    const { userInfo } = useSelector(selectAuth);
    const merchantId = useSelector(selectAuth)?.userInfo?.merchantId;
    // page state
    const [posters, setPosters] = useState<{ data: IPoster[]; isLoading: boolean }>({
        data: [],
        isLoading: true,
    });
    const [pointsGiven, setPointsGiven] = useState<{ data: IChartData[]; isLoading: boolean }>({
        data: [],
        isLoading: true,
    });
    const [pointsRedeemed, setPointsRedeemed] = useState<{
        data: IChartData[];
        isLoading: boolean;
    }>({
        data: [],
        isLoading: true,
    });
    const [salesRedeemed, setSalesRedeemed] = useState<{ data: IChartData[]; isLoading: boolean }>({
        data: [],
        isLoading: true,
    });
    const [totalContacts, setTotalContacts] = useState<{ data: IChartData[]; isLoading: boolean }>({
        data: [],
        isLoading: true,
    });
    const [totalMembers, setTotalMembers] = useState<{ data: IChartData[]; isLoading: boolean }>({
        data: [],
        isLoading: true,
    });
    const [visible, setVisible] = useState<boolean>(false);

    const getPosters = async () => {
        const response = await dashboardAPI.getPosters();
        setPosters({ data: response.data, isLoading: false });
    };
    const getPointsGiven = async () => {
        const response = await dashboardAPI.getPointsGiven();
        setPointsGiven({ data: response.data, isLoading: false });
    };
    const getPointsRedeemed = async () => {
        const response = await dashboardAPI.getPointsRedeemed();
        setPointsRedeemed({ data: response.data, isLoading: false });
    };
    const getSalesRedeemed = async () => {
        const response = await dashboardAPI.getSalesRedeemed();
        setSalesRedeemed({ data: response.data, isLoading: false });
    };
    const getTotalContacts = async () => {
        const response = await dashboardAPI.getTotalContacts();
        setTotalContacts({ data: response.data, isLoading: false });
    };
    const getTotalMembers = async () => {
        const response = await dashboardAPI.getTotalMembers();
        setTotalMembers({ data: response.data, isLoading: false });
    };
    const [navigationBoxs, setNavigationBoxs] = useState<INavigationBox[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const getDashboard = () => {
        getPointsGiven();
        getPointsRedeemed();
        getSalesRedeemed();
        getTotalContacts();
        getTotalMembers();
        getPosters();
    };
    const handleShowDropdown = () => {
        setVisible(!visible);
    };

    useEffect(() => {
        if (userInfo?.merchant?.status === enumStatus.ACTIVE) getDashboard();
        if (userInfo) {
            getListPaginationBoxs();
        }
    }, [userInfo, merchantId]);
    const getListPaginationBoxs = async () => {
        setIsLoading(true);
        try {
            const response = await dashboardAPI.getListNavigationBoxs();
            setNavigationBoxs(response.data);
        } finally {
            setIsLoading(false);
        }
    };
    const loadingCarousel = <Skeleton variant="rectangular" width={390} height={524} />;
    const loadingComponent = (
        <>
            <SwiperSlide>
                <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
            </SwiperSlide>
            <SwiperSlide>
                <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
            </SwiperSlide>
            <SwiperSlide>
                <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
            </SwiperSlide>
            <SwiperSlide>
                <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
            </SwiperSlide>
            <SwiperSlide>
                <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
            </SwiperSlide>
        </>
    );
    // const handleStartTour = () => {
    //     // @ts-ignore
    //     LOU.startTour(LOU_ID, false);
    // };
    return (
        <StyledContainer scrollable={visible}>
            {/* <TopField
                visibleDropdown={visible}
                handleShowDropdown={handleShowDropdown}
                handleCloseDropDown={() => {
                    if (visible) setVisible(false);
                }}
            /> */}
            <ModuleUserGuideModal />
            <ModuleProductGuideModal />
            <div className="body-field">
                <div className="title">
                    <h4>{t("page.dashboard.welcome_to_loyalty")}</h4>
                    <small>{t("page.dashboard.deshboard_samll")}</small>
                </div>
                {/* <button onClick={handleStartTour}>start tour</button> */}
                <div className="dashboard-layout">
                    <div className="benefit">
                        {posters.isLoading ? (
                            loadingCarousel
                        ) : (
                            <ModuelBenefitCarousel posters={posters.data} />
                        )}
                    </div>
                    <div className="services">
                        {isLoading
                            ? loadingComponent
                            : navigationBoxs &&
                              navigationBoxs.length > 0 &&
                              navigationBoxs?.map((item) => <ActivityCard data={item} />)}
                    </div>
                </div>
            </div>
            <div className="body-field">
                <div className="title">
                    <h4>{t("page.dashboard.dashboard")}</h4>
                    <small>{t("page.dashboard.deshboard_samll")}</small>
                </div>
                <div className="point-layout">
                    {/* <Row type="flex" gutter={16}> */}
                    <div className="progress-card">
                        <ModuleCircularProgress
                            title={t("page.total_members")}
                            color="#0263E0"
                            countValue={userInfo?.merchant?.clientCount || 0}
                            percentage={userInfo?.merchant?.clientCountPercent || 0}
                            limit={
                                userInfo?.merchant?.plan?.membership?.status === true
                                    ? userInfo?.merchant?.plan?.membership?.limit
                                    : "-"
                            }
                        />
                    </div>
                    <div className="progress-card">
                        <ModuleCircularProgress
                            title={t("page.total_transication")}
                            color="#FFD97A"
                            countValue={userInfo?.merchant?.allTransactionCurrentMonth || 0}
                            percentage={userInfo?.merchant?.allTransactionCurrentMonthPercent || 0}
                            limit={
                                userInfo?.merchant?.plan?.limitTransaction?.status === true
                                    ? userInfo?.merchant?.plan?.limitTransaction?.limit
                                    : "-"
                            }
                        />
                    </div>
                    {/* <Col className="marginX-8" span={12} md={{ span: 3 }} xl={{ span: 4 }}>
                        <ComponentCardStat
                            icon={{ type: "total_contact" }}
                            data={totalContacts.data}
                            title={t("page.total_contacts")}
                            isLoading={totalContacts.isLoading}
                        />
                    </Col> */}
                    <div className="point-card">
                        <ComponentCardStat
                            icon={{ type: "point_given" }}
                            data={pointsGiven?.data}
                            title={t("page.points_given")}
                            isLoading={pointsGiven?.isLoading}
                            units={t("page.points")}
                        />
                    </div>
                    <div className="point-card">
                        <ComponentCardStat
                            icon={{ type: "point_redeem" }}
                            data={pointsRedeemed.data}
                            isLoading={pointsRedeemed.isLoading}
                            title={t("page.points_redeemed")}
                            units={t("page.times")}
                        />
                    </div>
                    <div className="point-card">
                        <ComponentCardStat
                            icon={{ type: "total_contact" }}
                            data={totalContacts.data}
                            title={t("page.total_contacts")}
                            isLoading={totalContacts.isLoading}
                            units={t("page.points")}
                        />
                    </div>
                    {/* <Col className="marginX-8" span={12} md={{ span: 3 }} xl={{ span: 4 }}>
                        <ComponentCardStat
                            icon={{ type: "total_member" }}
                            data={totalMembers.data}
                            isLoading={totalMembers.isLoading}
                            title={t("page.total_members")}
                        />
                    </Col> */}
                    <div className="point-card">
                        <ComponentCardStat
                            icon={{ type: "total_sale" }}
                            data={salesRedeemed.data}
                            isLoading={salesRedeemed.isLoading}
                            title={t("page.total_sales")}
                            units={t("page.points")}
                        />
                    </div>
                    {/* </Row> */}
                </div>
            </div>
        </StyledContainer>
    );
};
SwiperCore.use([Navigation]);

// interface ITopProps {
//     handleShowDropdown: () => void;
//     handleCloseDropDown: () => void;
//     visibleDropdown: boolean;
// }

// const TopField = (props: ITopProps) => {
//     //props
//     const { handleShowDropdown, visibleDropdown, handleCloseDropDown } = props;
//     //page hook
//     const { t } = useTranslation();
//     const dispatch = useDispatch();
//     const history = useHistory();
//     //redux state
//     const user = useSelector(selectAuth).userInfo;
//     // page state
//     const [searchVal, setSearchVal] = useState("");
//     const [navigationBoxs, setNavigationBoxs] = useState<INavigationBox[]>();
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [index, setIndex] = useState<string>("");

//     const showDropDown = (index: string) => {
//         handleShowDropdown();
//         setIndex(index);
//     };

//     const getListPaginationBoxs = async () => {
//         setIsLoading(true);
//         try {
//             const response = await dashboardAPI.getListNavigationBoxs();
//             setNavigationBoxs(response.data);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleSearch = (event: KeyboardEvent<HTMLInputElement>) => {
//         if (event.key === "Enter") {
//             dispatch(getParamSearchContact(searchVal));
//             history.push(PATH_CONTACTS);
//         }
//     };
//     useEffect(() => {
//         getListPaginationBoxs();
//     }, []);

//     const loadingComponent = (
//         <>
//             <SwiperSlide>
//                 <Skeleton variant="rectangular" width={"100%"} height={160} />
//             </SwiperSlide>
//             <SwiperSlide>
//                 <Skeleton variant="rectangular" width={"100%"} height={160} />
//             </SwiperSlide>
//             <SwiperSlide>
//                 <Skeleton variant="rectangular" width={"100%"} height={160} />
//             </SwiperSlide>
//             <SwiperSlide>
//                 <Skeleton variant="rectangular" width={"100%"} height={160} />
//             </SwiperSlide>
//             <SwiperSlide>
//                 <Skeleton variant="rectangular" width={"100%"} height={160} />
//             </SwiperSlide>
//             <SwiperSlide>
//                 <Skeleton variant="rectangular" width={"100%"} height={160} />
//             </SwiperSlide>
//             <SwiperSlide>
//                 <Skeleton variant="rectangular" width={"100%"} height={160} />
//             </SwiperSlide>
//             <SwiperSlide>
//                 <Skeleton variant="rectangular" width={"100%"} height={160} />
//             </SwiperSlide>
//         </>
//     );

//     return (
//         <div className="top-field" id="dropdown-container">
//             <Row gutter={16} type="flex" justify="space-between" align="bottom">
//                 <Col span={24} md={{ span: 12 }} className="user-info">
//                     <div className="avatar">
//                         <Avatar size={98} src={user?.avatar || "/user-avatar.png"} />
//                     </div>
//                     <div className="name-position">
//                         <h3 className="user-name">{user?.fullName || t("page.empty_text")}</h3>
//                         <div className="user-position">
//                             {user?.role?.name || t("page.empty_text")}
//                         </div>
//                     </div>
//                 </Col>
//                 <Col span={24} md={{ span: 12 }} className="search-input">
//                     <SharedInputDefault
//                         suffixIcon={<Search size={18} color="#646464" />}
//                         name="Search"
//                         value={searchVal}
//                         onChange={(e: React.ChangeEvent<any>) => setSearchVal(e.target.value)}
//                         placeholder={t("page.search_phone_number")}
//                         notErr={true}
//                         onKeyDown={handleSearch}
//                     />
//                 </Col>
//             </Row>
//             <Divider />

//             <Row type="flex" justify="space-between" align="middle">
//                 <Col span={12}>
//                     <h4>{t("page.select_options")}</h4>
//                 </Col>
//                 <Col span={12} style={{ display: "flex", justifyContent: "flex-end" }}>
//                     <Button className="swiper-button swiper-prev" icon="caret-left" />
//                     <div style={{ padding: "0 5px" }}></div>
//                     <Button className="swiper-button swiper-next" icon="caret-right" />
//                 </Col>
//             </Row>
//             <div>
//                 <Swiper
//                     onActiveIndexChange={handleCloseDropDown}
//                     navigation={{
//                         prevEl: ".swiper-prev",
//                         nextEl: ".swiper-next",
//                     }}
//                     breakpoints={{
//                         "576": {
//                             slidesPerView: 1,
//                             spaceBetween: 14,
//                         },
//                         "768": {
//                             slidesPerView: 2,
//                             spaceBetween: 14,
//                         },
//                         "1024": {
//                             slidesPerView: 3,
//                             spaceBetween: 14,
//                         },
//                         "1440": {
//                             slidesPerView: 4,
//                             spaceBetween: 14,
//                         },
//                         "1660": {
//                             slidesPerView: 5,
//                             spaceBetween: 14,
//                         },
//                     }}
//                 >
//             {isLoading
//                 ? loadingComponent
//                 : navigationBoxs &&
//                   navigationBoxs.length > 0 &&
//                   navigationBoxs?.map((item) => (
//                       <SwiperSlide key={item._id}>
//                           <div onClick={() => showDropDown(item._id)}>
//                               <ModuleCart
//                                   index={index}
//                                   visibleDropdown={visibleDropdown}
//                                   data={item}
//                               />
//                           </div>
//                       </SwiperSlide>
//                   ))}
//             </Swiper>
//             </div>
//         </div>
//     );
// };
const ActivityIcon = () => (
    <svg
        width="116"
        height="118"
        viewBox="0 0 116 118"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M69.2031 81.7634L64.2465 83.4269C63.7712 81.9671 62.2095 81.2202 60.7497 81.6955C59.2898 82.1708 58.509 83.7324 59.0182 85.1923L54.0276 86.8558C53.5523 85.396 51.9907 84.6151 50.5308 85.1244C49.071 85.5997 48.3241 87.1614 48.7994 88.6212L43.8088 90.2847C43.4353 89.1644 42.4169 88.4514 41.2965 88.4175C40.991 88.4175 40.6515 88.4514 40.312 88.5533C38.8521 89.0286 38.0713 90.5903 38.5805 92.0501L33.6239 93.7136C32.1641 89.3681 27.479 87.0256 23.1334 88.4854C22.9977 88.5193 22.8958 88.5872 22.76 88.6212L0.590881 22.7928C0.72668 22.7589 0.862478 22.7249 0.964327 22.691C5.30988 21.2311 7.65241 16.5121 6.19257 12.2005L11.1492 10.537C11.6245 11.9968 13.1862 12.7777 14.646 12.2684C16.1059 11.7931 16.8528 10.2315 16.3775 8.77162L21.3341 7.10809C21.8094 8.56792 23.405 9.34876 24.8309 8.83952C26.2908 8.36422 27.0716 6.80254 26.5624 5.34271L31.519 3.67917C31.9943 5.13901 33.556 5.8859 35.0158 5.4106C36.4757 4.93531 37.2226 3.37363 36.7473 1.91379L41.7718 0.216309C43.2316 4.56186 47.9167 6.87044 52.2622 5.4106L56.4211 17.7683L60.5799 30.1259L74.4314 71.2729C70.0858 72.7328 67.7433 77.4178 69.2031 81.7634Z"
            fill="white"
        />
        <path
            d="M62.6511 71.8501L32.4699 82.001C31.078 82.4763 29.5502 81.7294 29.0749 80.3036L10.6742 25.6446C10.1989 24.2527 10.9458 22.725 12.3717 22.2497L42.5529 12.0987C43.9449 11.6234 45.4726 12.3703 45.9479 13.7962L64.3486 68.4551C64.8239 69.8471 64.0431 71.3748 62.6511 71.8501Z"
            fill="white"
            stroke="#EF814F"
            strokeWidth="2"
            strokeMiterlimit="10"
        />
        <path
            d="M13.5933 34.3697L48.901 22.4873"
            stroke="#EF814F"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinejoin="round"
        />
        <path
            d="M23.7105 24.9657L35.1515 21.1294"
            stroke="white"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M26.1212 71.5103L61.3948 59.6279"
            stroke="#EF814F"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinejoin="round"
        />
        <path
            d="M45.4904 42.0649L43.1819 46.5123C43.0461 46.7839 43.0461 47.0895 43.1819 47.3271L45.5583 51.7406C45.796 52.1819 45.6262 52.6912 45.1849 52.9288C45.0151 53.0307 44.8114 53.0646 44.6077 53.0307L39.6511 52.2498C39.3455 52.2159 39.0739 52.2838 38.8703 52.5214L35.4074 56.154C35.0679 56.4935 34.5247 56.5275 34.1512 56.188C34.0155 56.0522 33.9136 55.8824 33.8797 55.6787L33.0988 50.7221C33.0649 50.4505 32.8612 50.1789 32.6235 50.077L28.1082 47.9043C27.6669 47.7006 27.4971 47.1574 27.7008 46.716C27.7687 46.5463 27.9385 46.4105 28.1082 46.3086L32.5896 44.034C32.8612 43.8982 33.0309 43.6606 33.0649 43.355L33.7439 38.3984C33.8118 37.9231 34.2531 37.5836 34.7284 37.6515C34.9321 37.6854 35.1018 37.7533 35.2376 37.8891L38.7684 41.4199C38.9721 41.6236 39.2776 41.7254 39.5492 41.6575L44.5059 40.7409C44.9812 40.639 45.4565 40.9785 45.5244 41.4538C45.6262 41.6915 45.5923 41.8952 45.4904 42.0649Z"
            fill="#8A76D5"
        />
        <path
            d="M39.837 72.8348L51.2441 68.9985"
            stroke="white"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M106.174 41.5672L97.9246 110.553C93.3753 110.01 89.2674 113.269 88.7242 117.784L83.5299 117.173C83.6997 115.645 82.6133 114.287 81.1195 114.118C79.5918 113.948 78.2338 115.034 78.064 116.528L72.8697 115.917C73.0395 114.389 71.9531 113.031 70.4593 112.861C68.9316 112.692 67.5736 113.778 67.4039 115.272L62.2096 114.661C62.3793 113.133 61.2929 111.775 59.7991 111.605C58.2714 111.436 56.9134 112.522 56.7437 114.016L51.5494 113.405C52.0926 108.855 48.8334 104.747 44.3181 104.204C44.1823 104.204 44.0465 104.17 43.9107 104.17L52.1605 35.1846C52.2963 35.2186 52.4321 35.2186 52.5679 35.2525C57.1171 35.7957 61.225 32.5365 61.7682 28.0212L66.9625 28.6323C66.7928 30.1601 67.8792 31.5181 69.3729 31.6878C70.8667 31.8575 72.2587 30.7712 72.4284 29.2774L77.6227 29.8885C77.4529 31.4162 78.5393 32.7742 80.0331 32.9439C81.5609 33.1137 82.9188 32.0273 83.0886 30.5335L88.2829 31.1446C88.1131 32.6723 89.1995 34.0303 90.6933 34.2001C92.221 34.3698 93.579 33.2834 93.7488 31.7897L98.9431 32.4007C98.3659 36.916 101.625 41.024 106.174 41.5672Z"
            fill="white"
        />
        <path
            d="M87.0607 106.004L55.4196 102.235C53.9598 102.065 52.9074 100.707 53.0771 99.2476L59.9349 41.9745C60.1047 40.5147 61.4627 39.4622 62.9225 39.632L94.5636 43.4004C96.0234 43.5701 97.0758 44.9281 96.9061 46.388L90.0822 103.661C89.8785 105.121 88.5205 106.173 87.0607 106.004Z"
            fill="white"
            stroke="#EF814F"
            strokeWidth="2"
            strokeMiterlimit="10"
        />
        <path
            d="M58.815 51.1069L95.7862 55.5204"
            stroke="#EF814F"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinejoin="round"
        />
        <path
            d="M71.9874 46.9653L83.9716 48.3912"
            stroke="white"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M66.0123 97.1428L77.9625 98.5687"
            stroke="white"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M54.1636 90.0476L91.1348 94.4611"
            stroke="#EF814F"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinejoin="round"
        />
        <path
            d="M84.3289 71.7368L80.3229 74.7923C80.0852 74.962 79.9494 75.2336 79.9834 75.5391L80.255 80.5297C80.2889 81.005 79.9155 81.4464 79.4063 81.4464C79.2026 81.4464 79.0328 81.4124 78.8631 81.2766L74.7212 78.4249C74.4835 78.2551 74.178 78.2212 73.9064 78.323L69.2214 80.1224C68.78 80.2921 68.2368 80.0884 68.0671 79.6131C67.9992 79.4434 67.9992 79.2397 68.0331 79.036L69.459 74.2491C69.5269 73.9775 69.4929 73.6719 69.2893 73.4343L66.1319 69.5301C65.8264 69.1566 65.8943 68.6134 66.2677 68.2739C66.4035 68.1381 66.6072 68.0702 66.8109 68.0702L71.8355 67.9344C72.141 67.9344 72.3787 67.7647 72.5484 67.527L75.2983 63.3512C75.5699 62.9438 76.1131 62.842 76.5205 63.0796C76.6903 63.1815 76.7921 63.3512 76.86 63.521L78.5236 68.24C78.6254 68.5116 78.8631 68.7153 79.1346 68.7832L83.9895 70.0733C84.4647 70.2091 84.7363 70.6843 84.6345 71.1596C84.6005 71.4652 84.4987 71.6349 84.3289 71.7368Z"
            fill="#8A76D5"
        />
        <path
            d="M103.968 28.5986L105.36 25.1018"
            stroke="#8A76D5"
            strokeWidth="3"
            strokeMiterlimit="10"
            strokeLinecap="round"
        />
        <path
            d="M107.397 31.9594L113.202 27.4441"
            stroke="#8A76D5"
            strokeWidth="3"
            strokeMiterlimit="10"
            strokeLinecap="round"
        />
        <path
            d="M110.181 36.1355L113.508 35.5923"
            stroke="#8A76D5"
            strokeWidth="3"
            strokeMiterlimit="10"
            strokeLinecap="round"
        />
    </svg>
);
interface IProps {
    data: INavigationBox;
    // onclick?: (title: string, idData?: string) => void;
    // onTogglePopup?: (idItem: string | undefined) => void;
    // visibleDropdown: boolean;
    // index: string | undefined;
}
const ActivityCard = (props: IProps) => {
    const { data } = props;
    const i18nextLng = window.localStorage.i18nextLng;
    const title = i18nextLng === enumLanuage.TH ? data.title_th : data.title;
    const text = i18nextLng === enumLanuage.TH ? data.text_th : data.text;
    return (
        <StyledCard onClick={() => window.open(data.link, "_self")}>
            <div className="image">
                {data.iconUrl ? (
                    <img className="iconUrl" src={data.iconUrl} alt="Icon" />
                ) : (
                    <ActivityIcon />
                )}
            </div>
            <h5>{title}</h5>
            <p className="visible-md">{text}</p>
        </StyledCard>
    );
};
const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    gap: 16px;
    /* height: 258px; */
    background: #ffffff;
    border-radius: 8px;
    &:hover {
        cursor: pointer;
    }
    .image {
        width: 100%;
        display: flex;
        justify-content: center;
        background: #f7f7f8;
        border-radius: 8px;
        padding: 16px;
        img {
            width: 108.5px;
            height: 114.72px;
        }
    }
    h5,
    p {
        margin: 0;
    }
    h5 {
        font-style: normal;
        font-weight: 800;
        font-size: 20px;
        line-height: 27px;
        text-align: center;
        color: #000000;
    }
    p {
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        text-align: center;
        color: #a5a5a5;
    }
    .visible-md {
        display: block;
    }
    @media screen and (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        .visible-md {
            display: none;
        }
        text-align: center;
        .image {
            svg {
                height: 58px;
            }
        }
        h5 {
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            text-align: center;
            color: #000000;
        }
        p {
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 19px;
            text-align: center;
            color: #a5a5a5;
        }
        .image {
            img {
                width: 82px;
                height: 57px;
            }
        }
    }
`;
const StyledContainer = styled.div<{ scrollable: boolean }>`
    height: 86vh;
    overflow-y: ${(p) => (p.scrollable ? "hidden" : "auto")};
    padding-right: ${(p) => (p.scrollable ? "6px" : "0")};
    overflow-x: hidden;
    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
            display: none;
        }
    }

    ::-webkit-scrollbar-track {
        display: none;
    }

    ::-webkit-scrollbar-thumb {
        background: ${(p) => p.theme.colors.fadedText};
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
        cursor: grab;
    }
    .marginX-8 {
        margin: 8px 0;
    }
    .top-field {
        background-color: white;
        padding: 5rem;
        h4 {
            color: ${(p) => p.theme.colors.black};
            font-weight: 600;
            font-size: 25px;
            padding: 14px 0;
        }
        .ant-divider-horizontal {
            margin: 2.5rem 0;
        }
        .swiper-button {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .search-input {
            display: flex;
            justify-content: flex-end;

            input {
                height: 49px;
                width: 331px;
                min-width: 300px;
                max-width: 340px;
                font-size: 16px;
                color: #646464;
            }
            @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
                margin-top: 20px;
                justify-content: flex-start;
            }
        }
        .user-info {
            display: flex;
            .avatar {
                margin-right: 26px;
            }
            .name-position {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
            .user-name {
                font-weight: 700;
                font-size: 35px;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .user-position {
                padding: 7px 23px;
                background-color: #e1e1e1;
                border-radius: 40px;
                width: fit-content;
                max-width: 300px;
                font-size: 16px;
                font-weight: 600;
                color: black;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
    .body-field {
        padding: 5rem;
        padding-top: 2.5rem;
        .title {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            h4 {
                font-style: normal;
                font-weight: 700;
                font-size: 35px;
                line-height: 48px;
                color: #000000;
                padding-right: 14px;
            }
            small {
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
                color: #a5a5a5;
            }
            h4,
            small {
                margin: 0;
            }
        }
        @media screen and (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
            .title {
                flex-direction: column;
                align-items: baseline;
                margin-bottom: 10px;
                h4 {
                    font-style: normal;
                    font-weight: 700;
                    font-size: 20px;
                    line-height: 27px;
                    color: #000000;
                }
                small {
                    font-style: normal;
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 19px;
                    color: #a5a5a5;
                }
            }
        }
    }
    @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
        .top-field,
        .body-field {
            padding: 1.5rem 1.5rem 4rem 1.5rem;
        }
    }
    .dashboard-layout {
        display: flex;
        column-gap: 16px;
        .benefit {
            flex: 1;
        }
        .services {
            flex: 3;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-gap: 16px;
        }
    }
    .point-layout {
        display: flex;
        column-gap: 16px;
        .progress-card {
            flex: 3;
        }
        .point-card {
            flex: 2;
        }
    }
    @media screen and (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        .dashboard-layout {
            flex-direction: column-reverse;
            row-gap: 16px;
            .benefit {
            }
            .services {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        .point-layout {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 10px;
            .progress-card {
                flex: 3;
            }
            .point-card {
                flex: 2;
            }
        }
    }
`;
