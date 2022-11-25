import { axiosInstance } from ".";

//login user
export const LoginUser = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", payload);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const RegisterUser = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/auth/register", payload);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const GetUserInfo = async () => {
  try {
    const { data } = await axiosInstance.post("/auth/get-user-info");
    return data;
  } catch (error) {
    return error.response.data;
  }
};
