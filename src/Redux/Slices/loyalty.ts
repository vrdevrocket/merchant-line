import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from ".";

interface IInitialState {
    images: string[];
    benefit: [];
}

const initialState: IInitialState = {
    images: [],
    benefit: [],
};

const loyalty = createSlice({
    name: "loyalty",
    initialState,
    reducers: {
        getLoyaltyRuleImage: (state, action : PayloadAction<string[]>)=>{
            state.images = action.payload;
        },
        addLoyaltyRuleImage: (state, action : PayloadAction<string[]>) => {
            state.images = [...state.images, ...action.payload];
        },
        removeLoyaltyRuleImage: (state, action: PayloadAction<number>) => {
            const reducedArr = [...state.images];
            reducedArr.splice(action.payload, 1);
            state.images = reducedArr;
        }
    },
});

export const selectLoyalty = (state: RootState) => state.loyalty;

export const { addLoyaltyRuleImage, removeLoyaltyRuleImage, getLoyaltyRuleImage } = loyalty.actions;

export default loyalty.reducer;
