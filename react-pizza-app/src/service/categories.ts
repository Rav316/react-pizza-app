import { PizzaCategory } from "./model.ts";
import { ApiRoutes } from "./constants.ts";
import { axiosInstance } from "./instance.ts";

export const findAll = async (): Promise<PizzaCategory[]> => {
  const response = await axiosInstance.get<PizzaCategory[]>(
    ApiRoutes.CATEGORIES,
  );
  return response.data;
};
