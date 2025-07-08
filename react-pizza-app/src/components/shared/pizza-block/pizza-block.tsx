import * as React from "react";
import { CartItem, Pizza } from "../../../service/model.ts";
import { useDispatch } from "react-redux";
import { addItem } from "../../../redux/slice/cart-slice.ts";
import { usePizzaSelector } from "../../../hooks/usePizzaSelector.ts";
import { Link } from "react-router";
import { AddToCartButton, PizzaSelector } from "../../ui";

interface Props {
  pizza: Pizza;
}

export const PizzaBlock: React.FC<Props> = ({
  pizza: { id, items, title, imageUrl },
}) => {
  const dispatch = useDispatch();
  const { selectedItem, types, sizes, selectType, selectSize, itemCount} =
    usePizzaSelector(items);

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
        <Link to={`/pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        </Link>
        <h4 className="pizza-block__title">{title}</h4>
        <PizzaSelector
          selectSize={selectSize}
          selectType={selectType}
          selectedItem={selectedItem}
          sizes={sizes}
          types={types}
        />
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">{selectedItem.price} ₽</div>
          <AddToCartButton itemCount={itemCount} onClickAdd={onClickAdd} />
        </div>
      </div>
    </div>
  );
};
