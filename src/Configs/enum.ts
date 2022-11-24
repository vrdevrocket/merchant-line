export enum enumPermission {
    MANAGE_CONTACT = "merchant_manage_contact_and_edit_point",
    MANAGE_LOYALTY = "merchant_create_loyalty",
    MANAGE_SETTING = "merchant_change_account_setting",
    MANAGE_ROLE = "merchant_manage_role",
}

export enum enumSortFields {
    FULL_NAME = "fullName",
    TEL = "phoneNumber",
    MEMBER_ID = "member_id",
    POINTS = "user.points",
    SALES = "user.totalSales",
    TIER = "user.memberTier",
    CREATED_AT = "createdAt",
}

export enum enumContactEditType {
    NAME = "fullName",
    TEL = "phoneNumber",
    EMAIL = "email",
    DOB = "dateOfBirth",
}
// enum sort
export enum enumContactSortFields {
    FULL_NAME = "fullName",
    TEL = "phoneNumber",
    MEMBER_ID = "member_id",
    POINTS = "user.points",
    SALES = "user.totalSales",
    TIER = "user.memberTier",
    CREATED_AT = "createdAt",
    LINK = "link",
    URL = "url",
}
export enum enumBenefitLimit {
    ALLTIME = "ALLTIME",
    MONTH = "MONTH",
}
export enum enumMergeSortFields {
    FULL_NAME = "fullName",
    MERGE_INTO = "mergeInto",
    MERGE_METRICS = "mergeMetrics",
    MATCH_DATE = "matchDate",
}
export enum enumDefaultSortFields {
    POINTS = "points",
    POINT = "point",
}

export enum enumSegmentSortFields {
    VOLUME = "contacts",
}
export enum enumTrafficSortFields {
    URL = "url",
}
//
export enum enumStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}
export enum enumStaffAmount {
    ONETO49 = "1TO49",
    FIVE0TO199 = "50TO199",
    TWO00MORE = "200MORE",
}
export enum enumExpLoyaltyHub {
    NEW_LOYALTY = "NEW_LOYALTY",
    CRM_LOYALTY = "CRM_LOYALTY",
}
export enum enumDisableInput {
    CHANGE_POINTS = 1,
    ADD_POINTS = 2,
    ADD_SALES = 3,
    USE_POINTS = 4,
    USE_SALES = 5,
}

export enum enumTypePoints {
    POINT = "points",
    SALES = "sales",
}

export enum enumExternalAuthType {
    LOGIN = "login",
    SIGNUP = "signup",
}

export enum enumRole {
    OWNER = "Owner",
}

export enum enumClientIdEnum {
    ADMIN = "rewarding-admin-site",
    MERCHANT = "rewarding-merchant-site",
    USER = "rewarding-user-site",
}

export enum enumExternalMethod {
    LINE = "LINE",
    FACEBOOK = "FACEBOOK",
    GOOGLE = "GOOGLE",
}

export enum enumHttpHeader {
    AccessToken = "access-token",
    ClientId = "client-id",
}

export enum enumSortBy {
    DESC = "DESC",
    ASC = "ASC",
}

export enum enumValidation {
    MAX_LENGTH_INPUT = 255,
    MIN_NUMBER = 0,
    MAX_NUMBER = 99999999,
    MAX_PASSWORD = 32,
    MIN_PHONE_NUMBER = 9,
    MAX_PHONE_NUMBER = 15,
    LENGTH_100 = 100,
    LENGTH_2 = 2,
    LENGTH_2000 = 2000,
    MAX_DESC = 2000,
    MIN_DESC = 2,
    NUMBER_ONE = 1,
    MIN_LENGTH_CKEDITOR = 9,
    MIN_NUMBER_PHONE = 100000000,
    MAX_NUMBER_PHONE = 999999999999999,
    MAX_50 = 50,
    MAX_15 = 15,
    MAX_FILE_SIZE = 10485760,
}

//------------------------ permission role ------------------------------------------------
export enum enumPermissionRole {
    MODAL_PERMISSION_ADD = 1,
    MODAL_PERMISSION_EDIT = 2,
    MODAL_PERMISSION_INFO = 3,
}

// ------------------------------------- segment module -----------------------------------------
export enum enumSegmentSubKey {
    isEqualToDate = "isEqualToDate",
    isEqualToNumber = "isEqualToNumber",
    isBefore = "isBefore",
    isAfter = "isAfter",
    isBetween = "isBetween",
    isGreaterThan = "isGreaterThan",
    isLessThan = "isLessThan",
    isEqualToAnyOf = "isEqualToAnyOf",
    containsAnyOf = "containsAnyOf",
    isKnown = "isKnown",
    isUnknown = "isUnknown",
}
export enum enumSegmentCreateStep {
    step1 = 1,
    step2 = 2,
    step3 = 3,
}
export enum enumSegmentDataType {
    init = 0,
    text = 1,
    date = 2,
    number = 3,
    textIncluded = 4,
}
export enum enumSegmentOpts {
    includeOpts = 1,
    excludeOpts = 2,
    init = 0,
}

export enum enumCopy {
    LINK = "LINK",
    QR_CODE = "QR_CODE",
}
//------------------------------------- merge module
export enum enumMergeSettingMatch {
    and = "and",
    or = "or",
}
export enum enumMergeSetting {
    match = "match",
    isTel = "isTel",
    isEmail = "isEmail",
    isLineId = "isLineId",
    isAutoMerge = "isAutoMerge",
}

export enum enumLength {
    CODE = 10,
}
export enum enumMergeMetrics {
    isTel = "tel",
    isEmail = "email_address",
    isLineId = "LINE_User_ID",
}

export enum enumTypeMerge {
    init = 0,
    single = 1,
    multi = 2,
}

export enum enumSegmentConditionsType {
    init = 0,
    create = 1,
    update = 2,
}

export enum enumSignUpMethods {
    LINEOA = "LINEOA",
    FACEBOOK = "FACEBOOK",
    GOOGLE = "GOOGLE",
    EMAIL = "EMAIL",
    TEL = "TEL",
}
export enum enumNotificationActionText {
    USED = "Used", //"RESOLVED"
    PENDING = "Pending", // PENDING
    CANCEL = "Cancel", //"REJECT"
}
export enum enumNotificationAction {
    RESOLVED = "RESOLVED", //"RESOLVED"
    PENDING = "PENDING", // PENDING
    REJECT = "REJECT", //"REJECT"
}
export enum enumTypeFetchList {
    duplicate = 1,
    delete = 2,
}

export enum enumNotiType {
    NEW_SIGNUP = "NEW_SIGNUP",
    POINT_COLLECTION = "POINT_COLLECTION",
    REWARD_UPDATE = "REWARD_UPDATE",
    REWARD_REDEEM = "REWARD_REDEEM",
    COUPON_UPDATE = "COUPON_UPDATE",
    COUPON_COLLECT = "COUPON_COLLECT",
    COUPON_USE = "COUPON_USE",
    MEMBERSHIP_CHANGE = "MEMBERSHIP_CHANGE",
    BENEFIT_REDEEM = "BENEFIT_REDEEM",
    SALE = "SALE",
    TEST = "TEST",
    LINE_CHAT = "lineChat",
    EMAIL = "email",
    ADMIN_PANE = "adminPanel",
}

export enum enumMessAction {
    NO_MESS = 0,
    DELETE_SUCCESS = 1,
    DELETE_FAIL = 2,
    DUPLICATE_SUCCESS = 3,
    DUPLICATE_FAIL = 4,
    CREATE_SUCCESS = 5,
    CREATE_FAIL = 6,
}

export enum enumLanuage {
    EN = "en",
    TH = "th",
    EN_GB = "en-GB", // default language
}

export enum enumTheme {
    LIGHT = "light",
    MAIN_COLOR = "main_color",
}

export enum enumLoyaltyMenu {
    POINTS = "points",
    LOYALTY = "loyalty",
}

export enum enumDrawerPlacement {
    BOTTOM = "bottom",
    RIGHT = "right",
    LEFT = "left",
}

export enum enumCoverTheme {
    LIGHT = "light",
    DARK = "dark",
}
export enum enumPlacement {
    TOP = "top",
    TOPLEFT = "topLeft",
    TOPRIGHT = "topRight",
    LEFTTOP = "leftTop",
    LEFT = "left",
    LEFTBOTTOM = "leftBottom",
    RIGHTTOP = "rightTop",
    RIGHT = "right",
    RIGHTBOTTOM = "rightBottom",
    BOTTOMLEFT = "bottomLeft",
    BOTTOM = "bottom",
    BOTTOMRIGHT = "bottomRight",
}

export enum enumGainIcon {
    GAIN_URL_ICON = "gain_url_icon",
    GAIN_QR_ICON = "gain_qr_icon",
    GAIN_MENU_ICON = "gain_menu_icon",
    GAIN_POSTER_ICON = "gain_poster_icon",
}

export enum enumMobileSidebar {
    LOYALTY = "loyalty",
    SETTINGS = "settings",
    CONTACTS = "contacts",
}
