export interface LoginFormValues {
    userInfo: object;
    accessToken: string;
    email: string;
    password: string;
}

export interface RegisterFormValues {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}


export interface OtpSendFormValue {
    otp: string;
}
export interface ResendOTPFormValues {
    phoneOrEmail: string;
}

export interface ResetPasswordFormValues {
    otp: string;
    password: string;
    confirmPassword: string;
}
