import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from ".";

interface IInitialState {
    time: string | number;
}

const initialState: IInitialState = {
    time: "Resend email",
};

const timeResendEmail = createSlice({
    name: "timeResendEmail",
    initialState,
    reducers: {
        setTimeResendEmail: (state, action: PayloadAction<string | number>) => {
            state.time = action.payload;
        },
        resetTimeResendEmail: () => {
            return initialState;
        },
    },
});

export const selectTimeResendEmail = (state: RootState) => state.timeResendEmail;

export const { setTimeResendEmail, resetTimeResendEmail } = timeResendEmail.actions;

export default timeResendEmail.reducer;
