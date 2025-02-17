import { DashboardData } from "../types/dashboard";
import Axios from "./axiosInstance";

export const getAdminDashBoardStats = async():Promise<DashboardData>=>{
      const {data} = await Axios.get<DashboardData>('/stats/admin-dashboard');
      return data;
}