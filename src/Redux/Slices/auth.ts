import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
    IAuth,
    IInfo,
    ILogin,
    ILineLogin,
    IFBLogin,
    IGGLogin,
    ILineSignup,
    IFBSignup,
    IGGSignup,
    IMembershipTier,
    ICartPlanResponse,
    IChooseMerchant,
    ICreateMerchant,
} from "@interfaces";
import { authApi } from "@api";
import { RootState } from ".";
import { enumExternalMethod } from "@configs";

export const login = createAsyncThunk<IAuth, ILogin>(
    "auth/login",
    async (values: ILogin, { rejectWithValue }) => {
        try {
            const res = await authApi.login(values);
            return res.data.data as IAuth;
        } catch (err: any) {
            return rejectWithValue(err);
        }
    }
);
export const chooseLoginMerchant = createAsyncThunk<IAuth, IChooseMerchant>(
    "auth/chooseLoginMerchant",
    async (values, { rejectWithValue }) => {
        try {
            const res = await authApi.adminMerchantChooseMerchant(values);
            return res.data as IAuth;
        } catch (err: any) {
            return rejectWithValue(err);
        }
    }
);
export const getCreateToken = createAsyncThunk<IAuth, ICreateMerchant>(
    "auth/getCreateToken",
    async (values, { rejectWithValue }) => {
        try {
            const res = await authApi.getCreateToken(values);
            return res.data.data as IAuth;
        } catch (err: any) {
            return rejectWithValue(err);
        }
    }
);
export const lineLogin = createAsyncThunk<IAuth, ILineLogin>(
    "auth/lineLogin",
    async (values, { rejectWithValue }) => {
        try {
            const res = await authApi.lineLogin(values);
            return res.data.data as IAuth;
        } catch (err: any) {
            return rejectWithValue(err);
        }
    }
);

export const lineSignup = createAsyncThunk<IAuth, ILineSignup>(
    "auth/lineSignup",
    async (values, { rejectWithValue }) => {
        try {
            const res = await authApi.lineSignup(values);
            return res.data as IAuth;
        } catch (err: any) {
            return rejectWithValue(err);
        }
    }
);

export const fbLogin = createAsyncThunk<IAuth, IFBLogin>(
    "auth/fbLogin",
    async (values, { rejectWithValue }) => {
        try {
            const res = await authApi.fbLogin(values);
            return res.data.data as IAuth;
        } catch (err: any) {
            return rejectWithValue(err);
        }
    }
);

export const fbSignup = createAsyncThunk<IAuth, IFBSignup>(
    "auth/fbSignup",
    async (values, { rejectWithValue }) => {
        try {
            const res = await authApi.fbSignup(values);
            return res.data as IAuth;
        } catch (err: any) {
            return rejectWithValue(err);
        }
    }
);

export const ggLogin = createAsyncThunk<IAuth, IGGLogin>(
    "auth/ggLogin",
    async (values, { rejectWithValue }) => {
        try {
            const res = await authApi.ggLogin(values);
            return res.data.data as IAuth;
        } catch (err: any) {
            return rejectWithValue(err);
        }
    }
);

export const ggSignup = createAsyncThunk<IAuth, IGGSignup>(
    "auth/ggSignup",
    async (values, { rejectWithValue }) => {
        try {
            const res = await authApi.ggSignup(values);
            return res.data as IAuth;
        } catch (err: any) {
            return rejectWithValue(err);
        }
    }
);

export const getInfo = createAsyncThunk<IInfo>(
    "auth/userInfo",
    async (values, { rejectWithValue }) => {
        try {
            const res = await authApi.getInfo();
            return res.data as IInfo;
        } catch (err: any) {
            return rejectWithValue(err);
        }
    }
);

interface ILine {
    code: string | null;
    state: string;
}
interface IState {
    auth: IAuth | null;
    isRemember: boolean;
    isLoading: boolean;
    error: string;
    tokenInfoAuth: string;
    userInfo: IInfo | null;
    line?: ILine | null;
    externalLogin: enumExternalMethod | null;
    plan: ICartPlanResponse | null;
    editLineToken: string;
    firstTimeUser: boolean;
    productUser: boolean;
}

interface ISetExternalLogin {
    line?: ILine;
    type: enumExternalMethod;
}

const initialState: IState = {
    auth: null,
    isRemember: false,
    isLoading: false,
    error: "",
    tokenInfoAuth: "",
    userInfo: null,
    externalLogin: null,
    plan: null,
    editLineToken: "",
    firstTimeUser: false,
    productUser: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        logout: () => {
            return initialState;
        },
        setAuth: (state, action) => {
            state.auth = action.payload;
        },
        reStoreAuth: (
            state,
            action: PayloadAction<{ accessToken: string; userPermissions: string[] }>
        ) => {
            state.auth = {
                ...action.payload,
                refreshToken: state.auth?.refreshToken || null,
            };
        },
        setInfo: (state, action) => {
            state.userInfo = { ...state.userInfo, ...action.payload };
        },
        setPlan: (state, action) => {
            state.plan = action.payload;
        },
        setRemember: (state, action: PayloadAction<boolean>) => {
            state.isRemember = action.payload;
        },
        setExternalLogin: (state, action: PayloadAction<ISetExternalLogin>) => {
            state.externalLogin = action.payload.type;
            state.line = action.payload.line;
            state.isLoading = true;
        },
        setMemberShipTier: (state, action: PayloadAction<IMembershipTier[]>) => {
            if (state.userInfo) {
                const userInfo = {
                    ...state.userInfo,
                    merchant: { ...state.userInfo.merchant, memberShipTiers: action.payload },
                };
                state.userInfo = userInfo;
            }
        },
        setEditLineToken: (state, action: PayloadAction<string>) => {
            state.editLineToken = action.payload;
        },
        setFirstTimeUser: (state, action: PayloadAction<boolean>) => {
            state.firstTimeUser = action.payload;
            state.auth = { ...state.auth, isFirstLogin: false };
        },
        setProductUser: (state, action: PayloadAction<boolean>) => {
            state.productUser = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action: { payload: IAuth }) => {
            if (action.payload.x_token) {
                //if (action.payload.accessToken) {
                state.auth = action.payload;
            }
            if (!state.isRemember) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                state.auth!.refreshToken = null;
            }
            state.isLoading = false;
        });

        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(login.rejected, (state) => {
            state.auth = null;
            state.isLoading = false;
        });
        builder.addCase(chooseLoginMerchant.fulfilled, (state, action: { payload: IAuth }) => {
            if (action.payload.accessToken) {
                state.auth = { ...state.auth, ...action.payload };
            }
            if (!state.isRemember) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                state.auth!.refreshToken = null;
            }
            state.isLoading = false;
        });

        builder.addCase(chooseLoginMerchant.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(chooseLoginMerchant.rejected, (state) => {
            state.auth = null;
            state.isLoading = false;
        });
        builder.addCase(getCreateToken.fulfilled, (state, action: { payload: IAuth }) => {
            if (action.payload.create_token) {
                state.auth = { ...state.auth, ...action.payload };
            }
            state.isLoading = false;
        });

        builder.addCase(getCreateToken.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(getCreateToken.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(getInfo.fulfilled, (state, action: { payload: IInfo }) => {
            state.userInfo = action.payload;
        });

        builder.addCase(getInfo.rejected, (state) => {
            state.userInfo = null;
        });

        builder.addCase(lineLogin.fulfilled, (state, action: { payload: IAuth }) => {
            if (action.payload.x_token) {
                state.auth = action.payload;
            }
        });

        builder.addCase(lineLogin.rejected, (state) => {
            state.auth = null;
            state.externalLogin = null;
            state.line = null;
            state.isLoading = false;
        });

        builder.addCase(lineSignup.fulfilled, (state, action: { payload: IAuth }) => {
            if (action.payload.accessToken) {
                state.auth = action.payload;
            }
        });

        builder.addCase(lineSignup.rejected, (state) => {
            state.auth = null;
            state.externalLogin = null;
            state.line = null;
            state.isLoading = false;
        });

        builder.addCase(fbLogin.fulfilled, (state, action: { payload: IAuth }) => {
            if (action.payload.x_token) {
                state.auth = action.payload;
            }
        });

        builder.addCase(fbLogin.rejected, (state) => {
            state.auth = null;
            state.externalLogin = null;
            state.isLoading = false;
        });

        builder.addCase(fbSignup.fulfilled, (state, action: { payload: IAuth }) => {
            if (action.payload.accessToken) {
                state.auth = action.payload;
            }
        });

        builder.addCase(fbSignup.rejected, (state) => {
            state.auth = null;
            state.externalLogin = null;
            state.isLoading = false;
        });

        builder.addCase(ggLogin.fulfilled, (state, action: { payload: IAuth }) => {
            if (action.payload.x_token) {
                state.auth = action.payload;
            }
        });

        builder.addCase(ggLogin.rejected, (state) => {
            state.auth = null;
            state.externalLogin = null;
            state.isLoading = false;
        });

        builder.addCase(ggSignup.fulfilled, (state, action: { payload: IAuth }) => {
            if (action.payload.accessToken) {
                state.auth = action.payload;
            }
        });

        builder.addCase(ggSignup.rejected, (state) => {
            state.auth = null;
            state.externalLogin = null;
            state.isLoading = false;
        });
    },
});

export const selectAuth = (state: RootState) => state.auth;

export const {
    logout,
    setAuth,
    setInfo,
    setRemember,
    setExternalLogin,
    setMemberShipTier,
    setPlan,
    reStoreAuth,
    setEditLineToken,
    setFirstTimeUser,
    setProductUser,
} = authSlice.actions;

export default authSlice.reducer;
