import { axiosInstance } from ".";

export const VerifyRecieverAccount = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/transaction/verify-receiver-account", payload);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const TransferFunds = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/transaction/transfer-funds", payload);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const GetTransactionsOfUser = async () => {
  try {
    const { data } = await axiosInstance.post("/transaction/get-all-transactions-by-user");
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const DepositFunds = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/transaction/deposit-funds", payload);
    return data;
  } catch (error) {
    return error.response.data;
  }
};
