export interface ICartPlan {
    _id?: string;
    status: string;
    trialPlan:ITrialPlan;
    price: number;
    name: string;
    planMasterId: string;
    plans: IPlanItem[];
}

export interface ICartPlanResponse {
    _id: string;
    status: string;
    multiLine: IPlanResponse;
    multiRole: IPlanResponse;
    membership: IPlanResponse;
    contact: IPlanResponse;
    benefit: IPlanResponse;
    coupon: IPlanResponse;
    reward: IPlanResponse;
    default: boolean;
    customSignUp: boolean;
    trafficSource: boolean;
    welcomeScreen: boolean;
    segmentation: boolean;
    multiSignUp: boolean;
    memberShipTier: boolean;
    freePoint: boolean;
    trialPlan?: ITrialPlan;
    price: number;
    name: string;
    planMasterId: string;
}

export interface ITrialPlan {
    _id: string;
    status: "DELETED" | "ACTIVE" | "INACTIVE";
}
export interface IPlanResponse {
    status: boolean;
    limit: number | string;
}

export interface IPlanItem {
    status: boolean;
    name: string;
}

export interface IChoosePlan {
    status: boolean;
    title: string;
}
