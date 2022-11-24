import { YupCoupon } from "./YupCoupon";
import { YupFreePoint } from "./YupFreePoint";
import { YupReward } from "./YupReward";
import { YupTrafficSource } from "./YupTrafficSource";
import { YupContact } from "./YupContact";
import { YupSignUpMethodField } from "./YupSignUpMethod";
import { YupIntegration } from "./YupIntegration";
import { YupBenefit } from "./YupBenefit";
import { YupChangePassword } from "./YupChangePassword";
import { YupMembershipTier } from "./YupMembershipTier";
import { YupCompany } from "./YupCompany";
import { YupNewMembershipTier } from "./YupNewMembershipTier";
import { YupNewMerchant } from "./YupNewMerchant";

export const useYup = () => {
    return {
        YupCoupon: YupCoupon(),
        YupFreePoint: YupFreePoint(),
        YupReward: YupReward(),
        YupTrafficSource: YupTrafficSource(),
        YupContact: YupContact(),
        YupSignUpMethodField: YupSignUpMethodField(),
        YupIntegration: YupIntegration(),
        YupBenefit: YupBenefit(),
        YupChangePassword: YupChangePassword(),
        YupMembershipTier: YupMembershipTier(),
        YupNewMembershipTier: YupNewMembershipTier(),
        YupCompany: YupCompany(),
        YupNewMerchant: YupNewMerchant(),
    };
};
