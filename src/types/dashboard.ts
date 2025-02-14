export type OverViewCountType = {
  name: string;
  count: number;
  rate: number;
};

export interface GenderRatio {
  male: number;
  female: number;
}

export interface InventoryDataType {
  name: string;
  count: number;
  percentage: number;
}

export type InventoryStatsType = InventoryDataType[];

export interface LastSixMonthsStatsType {
  ordersCreated: number[];
  revenueGenerated: number[];
}
//orders
export interface TransactionType {
  _id: string;
  total: number;
  status: "shipped" | "pending payment" | "delivered" | "processing"|string;//pending payment changes " pending" inorder to match the cell value (for displaying semantic color)
  quantity: number;
  discount: number;
}


export interface DashboardStatsType {
  overviewCount: OverViewCountType[];
  genderRatio: GenderRatio;
  inventoryStats: InventoryStatsType;
  lastSixMnthsStats: LastSixMonthsStatsType;
  latestTransactions: TransactionType[];
  ordersChangeRate: number;
  productsChangeRate: number;
  revenueGrowth: number;
  usersGrowthRate: number;
}

export interface DashboardData {
  stats: DashboardStatsType;
}
