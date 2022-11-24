import { ISegmentCondition, ISegmentConditionType, IPagination } from "@interfaces";
import { enumGainIcon, enumSegmentDataType } from "./enum";

export const PAGINATION = 10;
export const PAGE_START = 1;
export const DEFAULT_LANGUAGE = process.env.REACT_APP_LANGUAGE || "th";
export const IMAGE_TYPE = ["image/jpeg", "image/jpg", "image/png"];
export const ROCKET_CALENDLY = process.env.REACT_APP_ROCKET_CALENDLY;
export const ROCKET_LINE = process.env.REACT_APP_ROCKET_LINE;
export const ROCKET_LANDING_PAGE = process.env.REACT_APP_LANDING_PAGE;
export const LOU_ID = process.env.REACT_APP_LOU_ID;
export const MENU_BANNER_WIDTH = 1200;
export const MENU_BANNER_HEIGHT = 450;
export const PERMISSION_TITLE = [
    { title: "manage_contacts_edit_points", type: "merchant_manage_contact_and_edit_point" },
    { title: "create_loyalty_items", type: "merchant_create_loyalty" },
    { title: "change_account_settings", type: "merchant_change_account_setting" },
    { title: "manage_roles", type: "merchant_manage_role" },
];

export const MONTH_EXPIRY = [
    // { name: "_no_expiry", value: -1 },
    { name: "_1_month", value: 1 },
    { name: "_2_months", value: 2 },
    { name: "_3_months", value: 3 },
    { name: "_4_months", value: 4 },
    { name: "_5_months", value: 5 },
    { name: "_6_months", value: 6 },
    { name: "_7_months", value: 7 },
    { name: "_8_months", value: 8 },
    { name: "_9_months", value: 9 },
    { name: "_10_months", value: 10 },
    { name: "_11_months", value: 11 },
    { name: "_12_months", value: 12 },
];

export const BIRTH_MONTH = [
    { name: "Jan", value: "1" },
    { name: "Feb", value: "2" },
    { name: "Mar", value: "3" },
    { name: "Apr", value: "4" },
    { name: "May", value: "5" },
    { name: "Jun", value: "6" },
    { name: "Jul", value: "7" },
    { name: "Aug", value: "8" },
    { name: "Sep", value: "9" },
    { name: "Oct", value: "10" },
    { name: "Nov", value: "11" },
    { name: "Dec", value: "12" },
];

export const FACEBOOK_GRAPH_URL = "https://graph.facebook.com/v12.0/oauth";
export const LINE_URL = "https://api.line.me/v2";
export const LINE_AUTH_URL = "https://api.line.me/oauth2/v2.1";
export const LINE_ACCESS_URL = "https://access.line.me/oauth2/v2.1";
export const LINE_SCOPE = "profile%20openid%20email";

// ------------------------------------- segment module -----------------------------------------

export const INITIAL_LIST_PARAMS: IPagination = {
    page: 1,
    limit: PAGINATION,
};

export const SEGMENT_VALUES: ISegmentCondition = {
    // string: 1, date: 2, number: 3
    basicInfo: [
        { title: "name", key: "fullName", type: enumSegmentDataType.text },
        { title: "date_of_birth", key: "dateOfBirth", type: enumSegmentDataType.date },
        { title: "email", key: "email", type: enumSegmentDataType.text },
        { title: "contact_add_date", key: "createdAt", type: enumSegmentDataType.date },
        {
            title: "member_registration_date",
            key: "user.createdAt",
            type: enumSegmentDataType.date,
        },
        {
            title: "traffic_source",
            key: "user.traffic.name",
            type: enumSegmentDataType.textIncluded,
        },
        { title: "last_activity_date", key: "user.lastActive", type: enumSegmentDataType.date },
    ],
    membership: [
        {
            title: "membership_tier",
            key: "user.memberTier.tierName",
            type: enumSegmentDataType.textIncluded,
        },
        {
            title: "points_to_next_tier",
            key: "point.pointsToNextTier",
            type: enumSegmentDataType.number,
        },
    ],
    LINEProperties: [
        { title: "LINE_ID", key: "user.lineId", type: enumSegmentDataType.text },
        { title: "LINE_User_ID", key: "user.lineUserId", type: enumSegmentDataType.text },
        { title: "LINE_chat_tags", key: "user.lineChatTags", type: enumSegmentDataType.text },
    ],
    points: [
        { title: "points_balance", key: "point.balance", type: enumSegmentDataType.number },
        {
            title: "points_to_expire_in_1_month",
            key: "point.expriedDateInMonth",
            type: enumSegmentDataType.number,
        },
        {
            title: "last_points_collection_date",
            key: "point.lastPointsCollectionDate.createdAt",
            type: enumSegmentDataType.date,
        },
        {
            title: "last_points_redemption_date",
            key: "point.lastPointsRedemptionDate.createdAt",
            type: enumSegmentDataType.date,
        },
    ],
    coupons: [
        { title: "coupons_balance", key: "usedCoupon.balance", type: enumSegmentDataType.number },
        { title: "coupons_used", key: "usedCoupon.used", type: enumSegmentDataType.number },
        {
            title: "coupons_to_expire_in_1_month",
            key: "usedCoupon.expiredDate",
            type: enumSegmentDataType.number,
        },
        {
            title: "last_coupon_collection_date",
            key: "usedCoupon.lastCouponsDate",
            type: enumSegmentDataType.date,
        },
        {
            title: "last_coupon_used_date",
            key: "usedCoupon.lastUsedDate",
            type: enumSegmentDataType.date,
        },
    ],
    sales: [
        { title: "sales_amount", key: "point.sale", type: enumSegmentDataType.number },
        {
            title: "last_sales_date",
            key: "point.lastSaleDate.createdAt",
            type: enumSegmentDataType.date,
        },
    ],
    form: [
        {
            title: "field_1_tag_values",
            key: "form.tags1Values",
            type: enumSegmentDataType.textIncluded,
        },
        { title: "field_2_tag_values", key: "form.tags2Values", type: enumSegmentDataType.text },
        { title: "field_3_tag_values", key: "form.tags3Values", type: enumSegmentDataType.text },
    ],
};

export const SEGMENT_TOTAL_VALUES = [
    ...SEGMENT_VALUES.basicInfo,
    ...SEGMENT_VALUES.LINEProperties,
    ...SEGMENT_VALUES.coupons,
    ...SEGMENT_VALUES.form,
    ...SEGMENT_VALUES.membership,
    ...SEGMENT_VALUES.points,
    ...SEGMENT_VALUES.sales,
];

export const SEGMENT_TYPE: ISegmentConditionType = {
    text: {
        isEqualToAnyOf: 1,
        containsAnyOf: 2,
        isKnown: 3,
        isUnknown: 4,
    },
    date: {
        isEqualTo: 1,
        isBefore: 2,
        isAfter: 3,
        isBetween: 4,
    },
    number: {
        isEqualTo: 1,
        isGreaterThan: 2,
        isLessThan: 3,
    },
};

export const SEGMENT_ITEM_COMPARISONS = {
    isEqualToAnyOf: "_is_equal_to_any_of",
    containsAnyOf: "_contains_any_of",
    isKnown: "_is",
    isEqualTo: "_is_equal_to",
    isBefore: "_is_before",
    isAfter: "_is_after",
    isBetween: "_is_between",
    isGreaterThan: "_is_greater_than",
    isLessThan: "_is_less_than",
    isEqualToNumber: "_is_equal_to",
    isEqualToDate: "_is_equal_to",
};
export const SEGMENT_ITEM_KEY = {
    name: "name",
    dob: "dob",
    email: "email",
    contactAddDate: "contactAddDate",
    memberRegistrationDate: "memberRegistrationDate",
    trafficSource: "trafficSource",
    lastActivityDate: "lastActivityDate",
    membershipTier: "membershipTier",
    pointsToNextTier: "pointsToNextTier",
    LINEId: "LINEId",
    LINEUserId: "LINEUserId",
    LINEChatTags: "LINEChatTags",
    pointsBalance: "pointsBalance",
    pointsToExpireIn1Month: "pointsToExpireIn1Month",
    lastPointsCollectionDate: "lastPointsCollectionDate",
    lastPointsRedemptionDate: "lastPointsRedemptionDate",
    couponsBalance: "couponsBalance",
    couponsUsed: "couponsUsed",
    couponsToExpireIn1Month: "couponsToExpireIn1Month",
    lastCouponCollectionDate: "lastCouponCollectionDate",
    lastCouponUsedDate: "lastCouponUsedDate",
    salesAmount: "salesAmount",
    lastSalesDate: "lastSalesDate",
    field1TagValues: "field1TagValues",
    field2TagValues: "field2TagValues",
    field3TagValues: "field3TagValues",
};

export const INVALID_DATE = "Invalid Date";

export const BLANK_IMAGE_URL = "/images/initImage.png";

// coupon unit
export const FIXED = "BAHT";
export const PERCENTAGE = "PERCENTAGE";
export const ALL_SELECT = "all";

export const COLOR_BENEFITS = [
    "#D2E1F2",
    "#A2A1A1",
    "#716A62",
    "#FFE25F",
    "#D79D6D",
    "#B99128",
    // "#AEAEAE",
    // "#80807E",ComponentTheme√In order : theme, first, silver, black iron, yellow, bronze, gold
];
export const FAMILY_COLOR_BENEFITS = {
    "#B99128": ["#F8E568", "#CFA831", "#B99128", "#936B10"],
    "#FFE25F": ["#FAEB60", "#FFE25F", "#F08B13"],
    "#D2E1F2": ["#D6E9F9", "#D2E1F2", "#62739A"],
    "#A2A1A1": ["#EAEAEA", "#A2A1A1", "#808080"],
    "#716A62": ["#CAC1B9", "#716A62", "#4B443E"],
    "#D79D6D": ["#FECCA1", "#D79D6D", "#8E5B26"],
    "#EF281C": ["#EF281C", "#EF281C"],
};

export const MEMBERSHIP_ICONS = ["star", "diamond", "crown"];
// plan feature
export const PLAN_FEATURES = [
    { key: "loyaltyPoints", name: "loyalty_points" },
    { key: "coupons", name: "coupons" },
    { key: "benefits", name: "member_benefits" },
    { key: "membershipTiering", name: "Membership tiering" },
    { key: "customForm", name: "custom_form" },
    { key: "multiSignupMethod", name: "multi_signup_method" },
    { key: "landingPage", name: "landing_page" },
];
// loyalty rules setting
export const SPECIFIC_MONTHS = [
    { name: "january", value: "January" },
    { name: "february", value: "February" },
    { name: "march", value: "March" },
    { name: "april", value: "April" },
    { name: "may", value: "May" },
    { name: "june", value: "June" },
    { name: "july", value: "July" },
    { name: "august", value: "August" },
    { name: "september", value: "September" },
    { name: "october", value: "October" },
    { name: "november", value: "Dovember" },
    { name: "december", value: "December" },
];
export const CYCLE_TIME = [
    { name: "cycle_12_months", value: "MONTH_12_CYCLE" },
    { name: "cycle_24_months", value: "MONTH_24_CYCLE" },
    { name: "cycle_real_time", value: "MONTH_0_CYCLE" },
];
export const URL_INTEGRATION_SETTING = {
    webHookURL: `${process.env.REACT_APP_CLIENT_URL}/line-login`,
    callbackURL: `${process.env.REACT_APP_CLIENT_URL}/line-login`,
    LINELoginURL: `${process.env.REACT_APP_CLIENT_URL}/line-login`,
    LIFFEndPointURL: `${process.env.REACT_APP_CLIENT_URL}/line-login`,
};
export const BUSINESS_TYPE = [
    { name: "restaurant_cafe", value: "Restaurant & Cafe" },
    { name: "retails", value: "Retails" },
    { name: "hotel_motel", value: "Hotel & Motel" },
    { name: "spa_massage", value: "Spa & Massage" },
    { name: "salon_beauty", value: "Salon & Beauty" },
    { name: "clinics", value: "Clinics" },
    { name: "others", value: "Others" },
];

// export const REGEX_URL =
//     /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#.-]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;
export const REGEX_URL =
    /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+((\/)[\w#.-]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

export const COMPANY_SIZE = [
    { name: "one_50", value: "1TO49" },
    { name: "fivety_200", value: "50TO199" },
    { name: "more_than_200", value: "200MORE" },
];
export const LEVEL_EXP = [
    { name: "new_to_loyalty_hub", value: "NEW_LOYALTY" },
    { name: "CRM_OR_Have_used_loylaty_hub", value: "CRM_LOYALTY" },
];
export const new_account_step = [0, 1, 2, 3];
export const line_step = [0, 1];
// 1TO49, 50TO199, 200MORE
// NEW_LOYALTY, CRM_LOYALTY
export const dateFormat = "DD/MM/YYYY";
export const dateFormatHM = "DD/MM/YYYY HH:MM";

export const shopThemeColors = [
    "#EF281C",
    "#AB1A31",
    "#003FBA",
    "#9EE4FF",
    "#47267F",
    "#6230E0",
    "#F57700",
    "#F46F91",
    "#6CD2D2",
    "#2DBF3D",
    "#067049",
    "#EBAD0F",
    "#FBF21D",
    "#000000",
    "#924C28",
    "#E5E5E5",
];

export const gainAdvertise = [
    {
        url: "/gain-create-url",
        title: "create_URL",
        description: "share_your_url",
        img: "rectangle.png",
        icon: enumGainIcon.GAIN_URL_ICON,
    },

    {
        url: "/gain-create-menu",
        title: "create_rich_menu",
        description: "create_rich_menu_post",
        img: "rectangle.png",
        icon: enumGainIcon.GAIN_MENU_ICON,
    },
];
export const gainShop = [
    {
        url: "/gain-create-qr",
        title: "create_QR_code",
        description: "create_QR_code_post",
        img: "rectangle.png",
        icon: enumGainIcon.GAIN_QR_ICON,
    },
    {
        url: "/gain-create-poster",
        title: "store_poster",
        description: "download_print",
        img: "rectangle.png",
        icon: enumGainIcon.GAIN_POSTER_ICON,
    },
];

export const gain_banner_text = [
    {
        name: "become_member",
        value: 0,
    },
    {
        name: "earn_point",
        value: 1,
    },
    {
        name: "get_discount",
        value: 2,
    },
    {
        name: "recive_exclusive",
        value: 3,
    },
];

export const banner_ratio = ["2500 × 843", "1200 × 405", "800 × 270"];
