import styles from "./pizza-info.module.scss";
import { usePizzaSelector } from "../../../hooks/usePizzaSelector.ts";
import * as React from "react";
import { CartItem, PizzaDetails } from "../../../service/model.ts";
import { AddToCartButton, PizzaSelector } from "../../ui";
import { addItem } from "../../../redux/slice/cart-slice.ts";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store.ts";

interface Props {
  pizza: PizzaDetails;
}

export const PizzaInfo: React.FC<Props> = ({ pizza }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedItem, types, sizes, selectType, selectSize, itemCount } =
    usePizzaSelector(pizza.items);
  const onClickAdd = () => {
    const item: CartItem = {
      pizzaId: pizza.id,
      title: pizza.title,
      itemId: selectedItem.id,
      imageUrl: pizza.imageUrl,
      type: selectedItem.type,
      size: selectedItem.size,
      price: selectedItem.price,
      count: 1,
    };
    dispatch(addItem(item));
  };
  return (
    <div className={styles.root}>
      <div className={styles.imgWrapper}>
        <img src={pizza.imageUrl} alt={"pizza image"} />
      </div>
      <div className={styles.pizzaInfo}>
        <h3>{pizza.title}</h3>
        <h4>
          <span>
            {pizza.ingredients
              .map((item) => item.title)
              .map((title) => title.toLowerCase())
              .join(", ")}
          </span>
        </h4>
        <p className={styles.pizzaTypeSize}>
          {selectedItem.size.value} см, {selectedItem.type.title} тесто
        </p>
        <p>{pizza.description.toLowerCase()}</p>
        <div className={styles.selectorWrapper}>
          <PizzaSelector
            selectSize={selectSize}
            selectType={selectType}
            selectedItem={selectedItem}
            sizes={sizes}
            types={types}
          />
        </div>
        <div className={styles.addButtonWrapper}>
          <AddToCartButton itemCount={itemCount} onClickAdd={onClickAdd} />
        </div>
      </div>
    </div>
  );
};
