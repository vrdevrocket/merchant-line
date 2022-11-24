import { combineReducers } from "redux";
import { AnyAction, Reducer } from "@reduxjs/toolkit";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// import appReducer from "./auth";
import appReducer from "./app";
import themeReducer from "./theme";
import toastReducer from "./toast";
import authReducer from "./auth";
import timeResendEmailReducer from "./resendEmail";
import loyaltyReducer from "./loyalty";
import contactReducer from "./contact";
// const persistConfig = {
//     key: "root",
//     storage,
// };

// const authPersistedReducer = persistReducer(persistConfig, appReducer);
export * from "./app";
export * from "./theme";
export * from "./toast";
export * from "./auth";
export * from "./resendEmail";
export * from "./loyalty";
export * from "./contact";

const productReducer = combineReducers({
    app: appReducer,
    theme: themeReducer,
    toast: toastReducer,
    auth: authReducer,
    timeResendEmail: timeResendEmailReducer,
    loyalty: loyaltyReducer,
    contact: contactReducer,
});

export type RootState = ReturnType<typeof productReducer>;

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
    if (action.type === "RESET") {
        // reset state
        state = {} as RootState;
        // reset local storage
        localStorage.clear();
    }
    return productReducer(state, action);
};
export default rootReducer;
