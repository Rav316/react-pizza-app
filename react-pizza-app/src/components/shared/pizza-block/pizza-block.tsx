import * as React from "react";
import { useState } from "react";
import { CartItem, Pizza } from "../../../service/model.ts";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../../redux/slice/cart-slice.ts";
import { RootState } from "../../../redux/store.ts";

interface Props {
  pizza: Pizza;
}

export const PizzaBlock: React.FC<Props> = ({
  pizza: { id, items, title, imageUrl },
}) => {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const itemCount = useSelector(
    (state: RootState) =>
      state.cart.items.find((item) => item.itemId === selectedItem.id)?.count ||
      0,
  );
  const types = Array.from(
    new Map(
      items.map((item) => item.type).map((type) => [type.id, type]),
    ).values(),
  );
  const sizes = Array.from(
    new Map(
      items
        .filter((item) => item.type.id === selectedItem.type.id)
        .map((item) => item.size)
        .map((size) => [size.id, size]),
    ).values(),
  );

  const onClickAdd = () => {
    const item: CartItem = {
      pizzaId: id,
      title: title,
      itemId: selectedItem.id,
      imageUrl: imageUrl,
      type: selectedItem.type,
      size: selectedItem.size,
      price: selectedItem.price,
      count: 1,
    };
    dispatch(addItem(item));
  };

  return (
    <div className={"pizza-block-wrapper"}>
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type) => (
              <li
                key={type.id}
                onClick={() =>
                  setSelectedItem(
                    items.find(
                      (item) => item.type.id === type.id && item.size,
                    ) ?? items[0],
                  )
                }
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
                onClick={() =>
                  setSelectedItem(
                    items.find(
                      (item) =>
                        item.type.id === selectedItem.type.id &&
                        item.size.id === size.id,
                    ) ?? items[0],
                  )
                }
                className={selectedItem.size.id === size.id ? "active" : ""}
              >
                {size.value} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">{selectedItem.price} ₽</div>
          <div
            className="button button--outline button--add"
            onClick={onClickAdd}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {itemCount > 0 && <i>{itemCount}</i>}
          </div>
        </div>
      </div>
    </div>
  );
};
