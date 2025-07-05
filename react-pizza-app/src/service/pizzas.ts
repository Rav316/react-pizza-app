import type { PageResponse, Pizza } from "./model.ts";
import { axiosInstance } from "./instance.ts";
import { ApiRoutes } from "./constants.ts";

interface SearchParams {
  category?: string;
  sort?: string;
  order?: string;
  search?: string;
  query?: string;
  page?: number;
  size?: number;
}

export const findAll = async (params: SearchParams): Promise<PageResponse<Pizza>> => {
  const response = await axiosInstance.get<PageResponse<Pizza>>(ApiRoutes.PIZZAS, {params});
  return response.data;
}