import { useQuery } from "@tanstack/react-query"
import { getAdminDashBoardStats } from "../api/dashboardApi"
import { DashboardData } from "../types/dashboard"

export const useDashboard = ()=>{
    const {data:dashboardData,isError,error,isPending} = useQuery<DashboardData,Error>({
        queryKey:["dashboard-data"],
        queryFn:getAdminDashBoardStats,
        staleTime:3000
    })
    
    return {dashboardData,isError,error,isPending};
}