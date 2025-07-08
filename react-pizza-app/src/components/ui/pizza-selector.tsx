import * as React from "react";
import { PizzaItem, PizzaSize, PizzaType } from "../../service/model.ts";

interface Props {
  types: PizzaType[];
  sizes: PizzaSize[];
  selectedItem: PizzaItem;
  selectType: (typeId: number) => void;
  selectSize: (sizeId: number) => void;
}

export const PizzaSelector: React.FC<Props> = ({types, sizes, selectedItem, selectType, selectSize}) => {
  return (
    <div className="pizza-block__selector">
      <ul>
        {types.map((type) => (
          <li
            key={type.id}
            onClick={() => selectType(type.id)}
            className={selectedItem.type.id === type.id ? "active" : ""}
          >
            {type.title}
          </li>
        ))}
      </ul>
      <ul>
        {sizes.map((size) => (
          <li
            key={size.id}
            onClick={() => selectSize(size.id)}
            className={selectedItem.size.id === size.id ? "active" : ""}
          >
            {size.value} см.
          </li>
        ))}
      </ul>
    </div>
  )
}