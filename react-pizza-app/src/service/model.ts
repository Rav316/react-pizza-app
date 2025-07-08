export interface Pizza {
  id: number;
  title: string;
  imageUrl: string;
  items: PizzaItem[];
  category: PizzaCategory;
  rating: number;
  minPrice: number;
}

export interface PizzaDetails {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  items: PizzaItem[];
  category: PizzaCategory;
  rating: number;
  ingredients: Ingredient[];
}

export interface PizzaItem {
  id: number;
  pizzaId: number;
  type: PizzaType;
  size: PizzaSize;
  price: number;
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

interface Ingredient {
  id: number;
  title: string;
}

export interface CartItem {
  pizzaId: number;
  title: string;
  itemId: number;
  imageUrl: string;
  type: PizzaType;
  size: PizzaSize;
  price: number;
  count: number;
}