import type {PageResponse, Pizza, PizzaDetails} from "./model.ts";
import { axiosInstance } from "./instance.ts";
import { ApiRoutes } from "./constants.ts";
import axios from "axios";

export interface SearchParams {
  category?: string;
  sort?: string;
  order?: string;
  search?: string;
  page?: number;
  size?: number;
}

export const findAll = async (
  params: SearchParams,
): Promise<PageResponse<Pizza>> => {
  const response = await axiosInstance.get<PageResponse<Pizza>>(
    ApiRoutes.PIZZAS,
    { params },
  );
  return response.data;
};

export const findById = async (id: number): Promise<PizzaDetails> => {
  try {
    const response = await axiosInstance.get<PizzaDetails>(
      `${ApiRoutes.PIZZAS}/${id}`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error('Not found');
    }
    throw error;
  }
};
