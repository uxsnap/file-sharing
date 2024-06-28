export enum AuthType {
  LOGIN = "Login",
  REGISTER = "Register",
  FORGOT_PASSWORD = "Forgot Password",
  CODE = "Code",
}

export type ErrorResponse<T> = {
  error: T;
};

export type ErrorField = {
  field: string;
  message: string;
};

export type TokenResponse = {
  token: string;
};

export type LoginErrorResponse<T> = ErrorResponse<T> & {
  is_active: boolean;
};
