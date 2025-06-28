export interface Pizza {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  types: PizzaType[];
  sizes: PizzaSize[];
  category: PizzaCategory;
  rating: number;
}

export interface PageResponse<T> {
  content: T[];
  metadata: Metadata;
}

export interface Metadata {
  page: number;
  size: number;
  totalElements: number;
}

export interface PizzaSize {
  id: number;
  value: number;
}

export interface PizzaCategory {
  id: number;
  title: string;
}

export interface PizzaType {
  id: number;
  title: string;
}

export interface SortType {
  label: string;
  value: string;
}