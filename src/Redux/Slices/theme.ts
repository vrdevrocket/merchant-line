import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ICon } from "@interfaces";
import { theme } from "@utils";

import { RootState } from ".";

interface IInitialState {
    mainColor: string;
    subColor: string;
    mainIcon: ICon;
    image: string;
    logo: string;
    fullName: string;
    qrInviteLinkImgUrl: string;
}

const initialState: IInitialState = {
    mainColor: "#000000",
    subColor: "#000000",
    mainIcon: {
        key: "",
        value: "",
    },
    image: "",
    logo: "",
    fullName: "",
    qrInviteLinkImgUrl: "",
};
const colorThemes = theme.colors.colorThemes;

const themeColor = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setMainColor: (state, action: PayloadAction<string>) => {
            state.mainColor = action.payload;
            colorThemes.forEach((color) => {
                if (action.payload === color.main) {
                    state.subColor = color.sub;
                }
            });
        },
        setMainIcon: (state, action: PayloadAction<ICon>) => {
            state.mainIcon = action.payload;
        },
        setImage: (state, action: PayloadAction<string>) => {
            state.image = action.payload;
        },
        setLogo: (state, action: PayloadAction<string>) => {
            state.logo = action.payload;
        },
        setQRImage: (state, action: PayloadAction<string>) => {
            state.qrInviteLinkImgUrl = action.payload;
        },
        setFullName: (state, action: PayloadAction<string>) => {
            state.fullName = action.payload;
        },
    },
});

export const selectTheme = (state: RootState) => state.theme;

export const { setMainColor, setMainIcon, setImage, setLogo, setFullName, setQRImage } =
    themeColor.actions;

export default themeColor.reducer;
