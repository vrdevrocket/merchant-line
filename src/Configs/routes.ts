import {
    AccountLayout,
    FullWidthLayout,
    LayoutAuth,
    LayoutDefault,
    LayoutError,
    NewAccount,
} from "@layouts";
import { IRoute } from "@interfaces";
import {
    PageHome,
    PageLogin,
    PageError404,
    PageSignUp,
    PageVerifyEmail,
    PageCreatePassword,
    PageChoosePlan,
    PageContactList,
    PageContactDetail,
    PageMerchantSetting,
    PagePermissionList,
    PageLoyaltyRules,
    PageLineLogin,
    PageForgotPassword,
    PageResetPassword,
    PageProfileUser,
    PageNotCompleted,
    PageUpgradePlan,
    PageCouponCreate,
    PageSegmentList,
    PageSegmentDetail,
    PageCouponList,
    PageMergeSetting,
    PageMergeSuggestion,
    PageRewardList,
    PageFreePointCreate,
    PageFreePointList,
    PageBenefitCreate,
    PageRewardCreate,
    PageBenefitList,
    PageTrafficSourceCreate,
    PageTrafficSourceList,
    PageFeatureSetting,
    PageSettingIntegration,
    PageSettingSignUp,
    PageSettingNotifications,
    // CreateBusiness,
    AccountSettings,
    CreateReward,
    RewardList,
    LoyaltyRules,
    CreateSignupMethod,
    PreparingAccount,
    LineMessaging,
    LineLoginSetting,
    AccountSuccess,
    PageRedeem,
    PageAccountList,
    PageAccountCreate,
    PageEditProfile,
    PageNotiSetting,
    CreateMerchant,
    PageMember,
    PageCreateUrl,
    PageQRCode,
    PagePoster,
    PageMenu,
} from "@pages";
import { enumPermission } from "@configs";
import { PagePointList } from "src/Pages/points";

export const PATH_HOME = "/";
export const PATH_HOME_NEW = "/new-user";
export const PATH_LOGIN = "/login";
export const PATH_SIGN_UP = "/sign-up";
export const PATH_VERIFY_EMAIL = "/verify-email";
export const PATH_CREATE_PASSWORD = "/create-password";
export const PATH_FORGOT_PASSWORD = "/forgot-password";
export const PATH_CHOOSE_PLAN = "/choose-plan";
export const PATH_LINE_LOGIN = "/line-login";
export const PATH_RESET_PASSWORD = "/reset-password";
export const PATH_SIGN_UP_ACCOUNT = "/sign-up/account";
export const PATH_ACCOUNTS = "/accounts";
export const PATH_CREATE_ACCOUNTS = "/create-accounts";

export const PATH_CREATE_BUSINESS = "/create-account-business";
export const PATH_ACCOUNT_SETTINGS = "/create-account-settings";
export const PATH_CREATE_REWARD = "/create-reward";
export const PATH_REWARD_LIST = "/reward-list";
export const PATH_LOYALTY_RULES = "/loyalty-rules";
export const PATH_USER_SIGNUP_METHOD = "/create-sign-up-method";
export const PATH_PREPARING_ACCOUNT = "/preparing-account";
export const PATH_ACCOUNT_SUCCESS = "/acount-auccess";
export const PATH_LINE_MESSAGE = "/line-message";
export const PATH_LINE_LOGIN_SETTING = "/line-login-setting";

export const PATH_CONTACTS = "/contacts";
export const PATH_PERMISSIONS = "/permissions";
export const PATH_MERGES_SETTING = "/merges-setting";
export const PATH_MERGES_SUGGESTION = "/merges-suggestion";
export const PATH_LOYALTY = "/loyalty/rules";
export const PATH_SEGMENTS = "/segments";
export const PATH_USER_PROFILE = "/user/profile";
export const PATH_NOT_COMPLETED = "/not-completed";
export const PATH_UPGRADE_PLAN = "/upgrade-plan";
export const PATH_EDIT_POINT = "/edit-point";
export const PATH_ACCEPT_REDEEM = "/accept-redeem";
// route setting
export const PATH_FEATURE_SETTING = "/feature-setting";
export const PATH_MERCHANT_SETTING = "/merchant-setting";
export const PATH_INTEGRATION_SETTING = "/integration-setting";
export const PATH_SIGNUP_SETTING = "/signup-method";
export const PATH_NOTIFICATION_SETTING = "/notifications";
export const PATH_NOTIFICATION_SETTINGS = "/notification-settings";
export const PATH_GAIN_FRIENDS = "/gain-member";
export const PATH_GAIN_CREATE_URL = "/gain-create-url";
export const PATH_GAIN_CREATE_QR = "/gain-create-qr";
export const PATH_GAIN_CREATE_MENU = "/gain-create-menu";
export const PATH_GAIN_CREATE_POSTER = "/gain-create-poster";
// route coupon
export const PATH_COUPON_CREATE = "/coupon/create";
export const PATH_COUPON = "/coupon";
// route free point
export const PATH_FREE_POINT_CREATE = "/free-point/create";
export const PATH_FREE_POINT = "/free-point";

// route reward
export const PATH_REWARDS = "/rewards";
export const PATH_REWARDS_CREATE = "/rewards/create";
// route benefit
export const PATH_BENEFITS = "/benefits";
export const PATH_BENEFITS_CREATE = "/benefits/create";
//traffic source
export const PATH_TRAFFIC_SOURCE_CREATE = "/traffic-source/create";
export const PATH_TRAFFIC_SOURCE = "/traffic-source";

export const PATH_CURRENT_PLAN = "/current-plan";
export const PATH_USER_SIGNUP = "/user-signup";

export const PATH_EDIT_PROFILE = "/edit-profile";
export const PATH_SET_THEME = "/set-theme";
export const PATH_LOYALTY_SET_THEME = "/loyalty-set-theme";
export const PATH_LOYALTY_GAIN_FRIENDS = "/loyalty-gain-member";
export const PATH_LOYALTY_GAIN_CREATE_URL = "/loyalty-gain-create-url";
export const PATH_LOYALTY_GAIN_CREATE_QR = "/loyalty-gain-create-qr";
export const PATH_LOYALTY_GAIN_CREATE_MENU = "/loyalty-gain-create-menu";
export const PATH_LOYALTY_GAIN_CREATE_POSTER = "/loyalty-gain-create-poster";
export const PATH_404 = "*";

export const routes: Array<IRoute> = [
    { path: PATH_HOME, component: PageHome, exact: true },
    { path: PATH_HOME_NEW, component: PageHome, exact: true },
    { path: PATH_LOGIN, component: PageLogin, exact: true, layout: LayoutAuth },
    { path: PATH_SIGN_UP, component: PageSignUp, exact: true, layout: LayoutAuth },
    { path: PATH_SIGN_UP + "/:id", component: PageSignUp, exact: true, layout: LayoutAuth },
    { path: PATH_ACCOUNTS, component: PageAccountList, exact: true, layout: AccountLayout },
    {
        path: PATH_CREATE_ACCOUNTS,
        component: PageAccountCreate,
        exact: true,
        layout: AccountLayout,
    },
    {
        path: PATH_VERIFY_EMAIL + "/:email",
        component: PageVerifyEmail,
        exact: true,
        layout: LayoutAuth,
    },
    {
        path: PATH_CREATE_BUSINESS,
        component: CreateMerchant,
        exact: true,
        layout: LayoutDefault,
    },
    {
        path: PATH_ACCOUNT_SETTINGS,
        component: AccountSettings,
        exact: true,
        layout: NewAccount,
    },
    {
        path: PATH_CREATE_REWARD,
        component: CreateReward,
        exact: true,
        layout: NewAccount,
    },
    {
        path: PATH_REWARD_LIST,
        component: RewardList,
        exact: true,
        layout: NewAccount,
    },
    {
        path: PATH_LOYALTY_RULES,
        component: LoyaltyRules,
        exact: true,
        layout: NewAccount,
    },
    {
        path: PATH_USER_SIGNUP_METHOD,
        component: CreateSignupMethod,
        exact: true,
        layout: NewAccount,
    },
    {
        path: PATH_PREPARING_ACCOUNT,
        component: PreparingAccount,
        exact: true,
        layout: FullWidthLayout,
    },
    {
        path: PATH_ACCOUNT_SUCCESS,
        component: AccountSuccess,
        exact: true,
        layout: FullWidthLayout,
    },
    {
        path: PATH_LINE_MESSAGE,
        component: LineMessaging,
        exact: true,
        layout: NewAccount,
    },
    {
        path: PATH_LINE_LOGIN_SETTING,
        component: LineLoginSetting,
        exact: true,
        layout: NewAccount,
    },
    {
        path: PATH_CREATE_PASSWORD + "/:resetPasswordId",
        component: PageCreatePassword,
        exact: true,
        layout: LayoutAuth,
    },
    {
        path: PATH_RESET_PASSWORD + "/:resetPasswordId",
        component: PageResetPassword,
        exact: true,
        layout: LayoutAuth,
    },
    { path: PATH_CHOOSE_PLAN, component: PageChoosePlan, exact: true, layout: LayoutDefault },
    { path: PATH_UPGRADE_PLAN, component: PageUpgradePlan, exact: true, layout: LayoutDefault },
    { path: PATH_LINE_LOGIN, component: PageLineLogin, exact: true, layout: LayoutAuth },
    {
        path: PATH_FORGOT_PASSWORD,
        component: PageForgotPassword,
        exact: true,
        layout: LayoutAuth,
    },

    // ---------------------- contact module ------------------------------------------
    {
        path: PATH_CONTACTS,
        component: PageContactList,
        exact: true,
        permission: enumPermission.MANAGE_CONTACT,
    },
    {
        path: PATH_EDIT_POINT,
        component: PagePointList,
        exact: true,
        permission: enumPermission.MANAGE_CONTACT,
    },
    {
        path: PATH_ACCEPT_REDEEM,
        component: PageRedeem,
        exact: true,
        permission: enumPermission.MANAGE_CONTACT,
    },
    {
        path: PATH_CONTACTS + "/:id",
        component: PageContactDetail,
        exact: true,
        permission: enumPermission.MANAGE_CONTACT,
    },
    // merge
    {
        path: PATH_MERGES_SUGGESTION,
        component: PageMergeSuggestion,
        exact: true,
        permission: enumPermission.MANAGE_CONTACT,
    },
    {
        path: PATH_MERGES_SETTING,
        component: PageMergeSetting,
        exact: true,
        permission: enumPermission.MANAGE_CONTACT,
    },
    // segment
    {
        path: PATH_SEGMENTS,
        component: PageSegmentList,
        exact: true,
        permission: enumPermission.MANAGE_CONTACT,
    },
    {
        path: PATH_SEGMENTS + "/:id",
        component: PageSegmentDetail,
        exact: true,
        permission: enumPermission.MANAGE_CONTACT,
    },

    // ------------------------ setting module -----------------------------------------------
    {
        path: PATH_MERCHANT_SETTING,
        component: PageMerchantSetting,
        exact: true,
        permission: enumPermission.MANAGE_SETTING,
    },
    {
        path: PATH_SET_THEME,
        component: PageMerchantSetting,
        exact: true,
        permission: enumPermission.MANAGE_SETTING,
    },
    {
        path: PATH_LOYALTY_SET_THEME,
        component: PageMerchantSetting,
        exact: true,
        permission: enumPermission.MANAGE_SETTING,
    },
    {
        path: PATH_INTEGRATION_SETTING,
        component: PageSettingIntegration,
        exact: true,
        permission: enumPermission.MANAGE_SETTING,
    },
    {
        path: PATH_SIGNUP_SETTING,
        component: PageSettingSignUp,
        exact: true,
        permission: enumPermission.MANAGE_LOYALTY,
    },
    {
        path: PATH_NOTIFICATION_SETTING,
        component: PageSettingNotifications,
        exact: true,
        permission: enumPermission.MANAGE_SETTING,
    },
    {
        path: PATH_EDIT_PROFILE,
        component: PageEditProfile,
        exact: true,
        permission: enumPermission.MANAGE_SETTING,
    },
    {
        path: PATH_GAIN_FRIENDS,
        component: PageMember,
        exact: true,
        permission: enumPermission.MANAGE_SETTING,
    },
    {
        path: PATH_GAIN_CREATE_URL,
        component: PageCreateUrl,
        exact: true,
        permission: enumPermission.MANAGE_SETTING,
    },
    {
        path: PATH_GAIN_CREATE_QR,
        component: PageQRCode,
        exact: true,
        permission: enumPermission.MANAGE_SETTING,
    },
    {
        path: PATH_GAIN_CREATE_MENU,
        component: PageMenu,
        exact: true,
        permission: enumPermission.MANAGE_SETTING,
    },
    {
        path: PATH_GAIN_CREATE_POSTER,
        component: PagePoster,
        exact: true,
        permission: enumPermission.MANAGE_SETTING,
    },
    {
        path: PATH_LOYALTY_GAIN_FRIENDS,
        component: PageMember,
        exact: true,
        permission: enumPermission.MANAGE_SETTING,
    },
    {
        path: PATH_LOYALTY_GAIN_CREATE_URL,
        component: PageCreateUrl,
        exact: true,
        permission: enumPermission.MANAGE_SETTING,
    },
    {
        path: PATH_LOYALTY_GAIN_CREATE_QR,
        component: PageQRCode,
        exact: true,
        permission: enumPermission.MANAGE_SETTING,
    },
    {
        path: PATH_LOYALTY_GAIN_CREATE_MENU,
        component: PageMenu,
        exact: true,
        permission: enumPermission.MANAGE_SETTING,
    },
    {
        path: PATH_LOYALTY_GAIN_CREATE_POSTER,
        component: PagePoster,
        exact: true,
        permission: enumPermission.MANAGE_SETTING,
    },
    {
        path: PATH_NOTIFICATION_SETTINGS,
        component: PageNotiSetting,
        exact: true,
        permission: enumPermission.MANAGE_SETTING,
    },
    // -------------------------- loyalty module --------------------------------------------------
    {
        path: PATH_LOYALTY,
        component: PageLoyaltyRules,
        exact: true,
        permission: enumPermission.MANAGE_LOYALTY,
    },

    {
        path: PATH_USER_PROFILE,
        component: PageProfileUser,
        exact: true,
        permission: enumPermission.MANAGE_LOYALTY,
    },
    //coupon
    {
        path: PATH_COUPON_CREATE,
        component: PageCouponCreate,
        exact: true,
        permission: enumPermission.MANAGE_LOYALTY,
    },
    {
        path: PATH_COUPON,
        component: PageCouponList,
        exact: true,
        permission: enumPermission.MANAGE_LOYALTY,
    },
    {
        path: PATH_COUPON + "/:id",
        component: PageCouponCreate,
        exact: true,
        permission: enumPermission.MANAGE_LOYALTY,
    },
    //traffic source
    {
        path: PATH_TRAFFIC_SOURCE_CREATE,
        component: PageTrafficSourceCreate,
        exact: true,
        permission: enumPermission.MANAGE_LOYALTY,
    },
    {
        path: PATH_TRAFFIC_SOURCE,
        component: PageTrafficSourceList,
        exact: true,
        permission: enumPermission.MANAGE_LOYALTY,
    },
    {
        path: PATH_TRAFFIC_SOURCE + "/:id",
        component: PageTrafficSourceCreate,
        exact: true,
        permission: enumPermission.MANAGE_LOYALTY,
    },
    //free point
    {
        path: PATH_FREE_POINT_CREATE,
        component: PageFreePointCreate,
        exact: true,
        permission: enumPermission.MANAGE_LOYALTY,
    },
    {
        path: PATH_FREE_POINT,
        component: PageFreePointList,
        exact: true,
        permission: enumPermission.MANAGE_LOYALTY,
    },
    {
        path: PATH_FREE_POINT + "/:id",
        component: PageFreePointCreate,
        exact: true,
        permission: enumPermission.MANAGE_LOYALTY,
    },
    // reward
    {
        path: PATH_REWARDS,
        component: PageRewardList,
        exact: true,
        permission: enumPermission.MANAGE_LOYALTY,
    },
    {
        path: PATH_REWARDS + "/:id",
        component: PageRewardCreate,
        exact: true,
        permission: enumPermission.MANAGE_LOYALTY,
    },
    {
        path: PATH_REWARDS_CREATE,
        component: PageRewardCreate,
        exact: true,
        permission: enumPermission.MANAGE_LOYALTY,
    },
    // benefit
    {
        path: PATH_BENEFITS,
        component: PageBenefitList,
        exact: true,
        permission: enumPermission.MANAGE_LOYALTY,
    },
    {
        path: PATH_BENEFITS + "/:id",
        component: PageBenefitCreate,
        exact: true,
        permission: enumPermission.MANAGE_LOYALTY,
    },
    {
        path: PATH_BENEFITS_CREATE,
        component: PageBenefitCreate,
        exact: true,
        permission: enumPermission.MANAGE_LOYALTY,
    },

    // ---------------------------- permission module ----------------------------------------
    // permission
    {
        path: PATH_PERMISSIONS,
        component: PagePermissionList,
        exact: true,
        permission: enumPermission.MANAGE_ROLE,
    },
    {
        path: PATH_FEATURE_SETTING,
        component: PageFeatureSetting,
        exact: true,
    },
    // err
    { path: PATH_NOT_COMPLETED, component: PageNotCompleted, layout: LayoutDefault, exact: true },
    { component: PageError404, exact: false, layout: LayoutError },
];

export const normalRoutes = [
    PATH_HOME,
    PATH_MERCHANT_SETTING,
    PATH_CONTACTS,
    PATH_PERMISSIONS,
    PATH_LOYALTY,
    PATH_USER_PROFILE,
    PATH_CHOOSE_PLAN,
    PATH_UPGRADE_PLAN,
    PATH_SEGMENTS,
    PATH_COUPON_CREATE,
    PATH_COUPON,
    PATH_FREE_POINT,
    PATH_FREE_POINT_CREATE,
    PATH_REWARDS,
    PATH_REWARDS_CREATE,
    PATH_FEATURE_SETTING,
    PATH_NOTIFICATION_SETTING,
    PATH_INTEGRATION_SETTING,
    PATH_BENEFITS,
    PATH_BENEFITS_CREATE,
    PATH_SIGNUP_SETTING,
    PATH_MERGES_SUGGESTION,
    PATH_MERGES_SETTING,
    PATH_TRAFFIC_SOURCE,
    PATH_CREATE_BUSINESS,
    PATH_ACCOUNT_SETTINGS,
    PATH_BENEFITS_CREATE,
    PATH_CREATE_REWARD,
    PATH_REWARD_LIST,
    PATH_LOYALTY_RULES,
    PATH_PREPARING_ACCOUNT,
    PATH_ACCOUNT_SUCCESS,
    PATH_LINE_MESSAGE,
    PATH_LINE_LOGIN_SETTING,
    PATH_EDIT_POINT,
    PATH_ACCEPT_REDEEM,
];

export const authRoutes = [
    PATH_LOGIN,
    PATH_CREATE_PASSWORD,
    PATH_SIGN_UP,
    PATH_VERIFY_EMAIL,
    PATH_FORGOT_PASSWORD,
    PATH_ACCOUNTS,
    PATH_CREATE_ACCOUNTS,
];
