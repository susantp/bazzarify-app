type TPathProps = {
  name: string;
  path: string;
};
type TRemotePaths = {
  loginCredentials: TPathProps;
  registerCredentials: TPathProps;
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
};

export default authRemotePaths;
