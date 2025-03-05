import { useQuery } from "@tanstack/react-query"
import { DashboardData } from "../../types/dashboard";
import { getAdminDashBoardStats } from "../../api/Admin/dashboardApi";


export const useDashboard = ()=>{
    const {data:dashboardData,isError,error,isPending} = useQuery<DashboardData,Error>({
        queryKey:["dashboard-data"],
        queryFn:getAdminDashBoardStats,
        staleTime:3000
    })
    
    return {dashboardData,isError,error,isPending};
}