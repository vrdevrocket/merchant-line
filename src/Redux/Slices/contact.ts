import { IContactListParams } from "@interfaces";
import { PAGINATION } from "@configs";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from ".";
interface IInitialState {
    currentPoints: number;
    currentUserId: string;
    paramsContact: IContactListParams;
    checkboxArr: boolean[];
}

const initialState: IInitialState = {
    currentPoints: 0,
    currentUserId: "",
    paramsContact: {
        page: 1,
        limit: PAGINATION,
    },
    checkboxArr: [],
};

const contact = createSlice({
    name: "contact",
    initialState,
    reducers: {
        getCurrentPoints: (state, action: PayloadAction<number>) => {
            state.currentPoints = action.payload;
        },
        getCurrentId: (state, action: PayloadAction<string>) => {
            state.currentUserId = action.payload;
        },
        getParamSearchContact: (state, action: PayloadAction<string>) => {
            state.paramsContact.search = action.payload;
        },
        setCheckedContact: (
            state,
            action: PayloadAction<{ isChecked: boolean; index: number }>
        ) => {
            const { isChecked, index } = action.payload;
            state.checkboxArr[index] = isChecked;
        },
        setCheckboxArray: (state, action: PayloadAction<boolean[]>) => {
            state.checkboxArr = action.payload;
        },
    },
});

export const selectContact = (state: RootState) => state.contact;

export const {
    getCurrentPoints,
    getCurrentId,
    getParamSearchContact,
    setCheckboxArray,
    setCheckedContact,
} = contact.actions;

export default contact.reducer;
