import { DashboardData } from "../../types/dashboard";
import Axios from "./../axiosInstance";
import { requestConfigWithAuthToken } from "./../axiosConfig";

export const getAdminDashBoardStats = async (): Promise<DashboardData> => {
  const { data } = await Axios.get<DashboardData>(
    "/stats/admin-dashboard",
    requestConfigWithAuthToken
  );
  return data;
};
