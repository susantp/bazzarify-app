type TPathProps = {
  name: string;
  path: string;
};
type TRemotePaths = {
  loginCredentials: TPathProps;
  registerCredentials: TPathProps;
  passwordResetRequest: TPathProps;
  passwordReset: TPathProps;
};
const authRemotePaths: TRemotePaths = {
  loginCredentials: {
    name: "login.credentials",
    path: "/auth/login/credentials",
  },
  registerCredentials: {
    name: "register.credentials",
    path: "/auth/register/credentials",
  },
  passwordResetRequest: {
    name: "password.reset.request",
    path: "/auth/password/reset/request",
  },
  passwordReset: {
    name: "password.reset",
    path: "/auth/password/reset",
  },
};

export default authRemotePaths;
