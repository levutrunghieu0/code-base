import { apiClient } from './axios';
import type { ApiResponse } from '@/types';

export interface DashboardSummary {
  totalSales: number;
  totalGrossProfit: number;
  forecastDemand: number;
  forecastAccuracy: { mape: number; mae: number; rmse: number; samples: number };
  inventoryRisk: number;
}

export interface SalesHistory {
  id: string;
  storeCode: string;
  productCode: string;
  categoryCode?: string;
  saleDate: string;
  quantity: number;
  salesAmount?: number;
  grossProfit?: number;
}

export interface SalesForecast {
  id: string;
  storeCode: string;
  productCode: string;
  forecastDate: string;
  forecastQuantity: number;
  modelName: string;
  mape?: number;
}

export interface PurchaseRecommendation {
  id: string;
  storeCode: string;
  productCode: string;
  recommendationDate: string;
  forecastQuantity: number;
  currentInventory: number;
  safetyStock: number;
  recommendedQuantity: number;
}

export const forecastingApi = {
  dashboardSummary: async () => {
    const { data } = await apiClient.get<ApiResponse<DashboardSummary>>('/dashboard/summary');
    return data.data;
  },
  salesHistory: async () => {
    const { data } = await apiClient.get<ApiResponse<SalesHistory[]>>('/sales/history');
    return data.data;
  },
  forecastResults: async () => {
    const { data } = await apiClient.get<ApiResponse<SalesForecast[]>>('/forecast/results');
    return data.data;
  },
  recommendations: async () => {
    const { data } = await apiClient.get<ApiResponse<PurchaseRecommendation[]>>('/recommendations');
    return data.data;
  },
  runForecast: async (payload: {
    storeCode: string;
    productCode: string;
    forecastDays: 7 | 30 | 90;
  }) => {
    const { data } = await apiClient.post<ApiResponse<SalesForecast[]>>('/forecast/run', payload);
    return data.data;
  },
};
