import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// types
import {
  AuthState,
  SignUpBasicInfoPaylodType,
  SignUpUserTypePaylodType,
  SignUpUserTypes,
  NormalUserInfoPayloadType,
  NGOCompanyUserInfoPayloadType,
  SignUpVerficationPayloadType,
} from 'src/@types/auth';
import { RootState } from 'src/redux/store';

// ----------------------------------------------------------------------

const initialState: AuthState = {
  signUpValues: {
    userType: SignUpUserTypes.NONE,
    verificationCode: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    fullName: '',
  },
  forgotPasswordValues: {
    username: '',
    verificationCode: '',
  },
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signUpUserTypeDefined(state, action: PayloadAction<SignUpUserTypePaylodType>) {
      state.signUpValues = { ...state.signUpValues, ...action.payload };
    },
    updateSignUpBasicInfo(state, action: PayloadAction<SignUpBasicInfoPaylodType>) {
      state.signUpValues = { ...state.signUpValues, ...action.payload };
    },
    normalUsreInfoUpdated(state, action: PayloadAction<NormalUserInfoPayloadType>) {
      state.signUpValues = { ...state.signUpValues, ...action.payload };
    },
    NGOCompanyUserInfoUpdated(state, action: PayloadAction<NGOCompanyUserInfoPayloadType>) {
      state.signUpValues = { ...state.signUpValues, ...action.payload };
    },
    verificationUpdated(state, action: PayloadAction<SignUpVerficationPayloadType>) {
      state.signUpValues = { ...state.signUpValues, ...action.payload };
    },
  },
});

export const basicInfoSelector = (state: RootState) => ({
  username: state.auth.signUpValues.username,
  password: state.auth.signUpValues.password,
});
export const signUpUserTypeSelector = (state: RootState) => state.auth.signUpValues.userType;
export const normalUserInfoSelector = (state: RootState) => ({
  firstName: state.auth.signUpValues.firstName,
  lastName: state.auth.signUpValues.lastName,
});
export const ngoCompanyUserInfoSelector = (state: RootState) => ({
  fullName: state.auth.signUpValues.fullName,
});

// Reducer
export default slice.reducer;

// Actions
export const {
  signUpUserTypeDefined,
  updateSignUpBasicInfo,
  normalUsreInfoUpdated,
  NGOCompanyUserInfoUpdated,
  verificationUpdated,
} = slice.actions;
