export const mapPizzaType = {
  0: 'традиционное',
  1: 'тонкое'
} as const;

export type PizzaType = keyof typeof mapPizzaType;