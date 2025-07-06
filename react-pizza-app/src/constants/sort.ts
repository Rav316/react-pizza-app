export interface SortType {
  label: string;
  value: string;
}

export const sortCategories: SortType[] = [
  { label: "популярности", value: "popularity" },
  { label: "цене", value: "price" },
  { label: "Алфавиту", value: "alphabet" },
];
