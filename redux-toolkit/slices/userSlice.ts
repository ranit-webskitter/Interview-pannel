import { userData } from "@/typescript/types/common.type";
import { createSlice } from "@reduxjs/toolkit";
import { destroyCookie } from "nookies";
import { userSliceData } from "../interfaces/interfaces";
import CookieManager from "@/utils/cookieManager";
import AuthTokenData from "@/utils/AuthTokenData";
import { IUserProfileDetails } from "@/typescript/interface/common.interface";

const initialState: userSliceData = {
  isLoggedIn: false,
  userData: null
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setLoginData: (state, { payload }: { payload: IUserProfileDetails }) => {
      state.userData = payload;
      state.isLoggedIn = true;
    },
    checkLoggedInServer: (state, { payload }) => {
      state.isLoggedIn = payload?.hasToken;
      state.userData = payload?.user;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
      CookieManager.remove(AuthTokenData.key);
      // window.location.href = "/login";
    }
  }
});

export const { setLoginData, checkLoggedInServer, logout } = userSlice.actions;

export default userSlice.reducer;
