export interface JWT_Token {
  id_token?: string;
  access_token: string;
  expires_in: number;
  token_type: string;
  refresh_token: string;
  scope: string;
  fullname: string;
}

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthUser = null | Record<string, any>;

export enum SignUpUserTypes {
  Normal = 'NORMAL',
  NGO = 'NGO',
  Company = 'COMPANY',
  NONE = '',
}

type SignUpValuesType = {
  userType: SignUpUserTypes;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  fullName: string;
  verificationCode: string;
};

type ForgotPasswordValues = {
  username: string;
  verificationCode: string;
};

export type AuthState2 = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
};

export type AuthState = {
  signUpValues: SignUpValuesType;
  forgotPasswordValues: ForgotPasswordValues;
  // isAuthenticated: boolean;
  // isInitialized: boolean;
  // user: AuthUser;
};

export type JWTContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
  method: 'jwt';
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => Promise<void>;
};

export type SignUpBasicInfoPaylodType = Pick<SignUpValuesType, 'username' | 'password'>;
export type NormalUserInfoPayloadType = Pick<SignUpValuesType, 'firstName' | 'lastName'>;
export type NGOCompanyUserInfoPayloadType = Pick<SignUpValuesType, 'fullName'>;
export type SignUpUserTypePaylodType = Pick<SignUpValuesType, 'userType'>;
export type SignUpVerficationPayloadType = Pick<SignUpValuesType, 'verificationCode'>;
