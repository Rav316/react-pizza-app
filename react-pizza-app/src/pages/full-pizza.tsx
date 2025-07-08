import { useParams } from "react-router";
import { PizzaInfo } from "../components/shared/pizza-info";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store.ts";
import { useEffect } from "react";
import { fetchPizzaDetails } from "../redux/slice/pizza-details-slice.ts";
import { PizzaInfoSkeleton } from "../components/shared/pizza-info/pizza-info-skeleton.tsx";
import { NotFoundBlock } from "../components/shared";

export const FullPizza = () => {
  const {id: idStr} = useParams<{ id: string }>();
  const id = Number(idStr);
  const dispatch = useDispatch<AppDispatch>();
  const {item, loading, error} = useSelector((state: RootState) => state.pizzaDetails);
  useEffect(() => {
    dispatch(fetchPizzaDetails(id));
  }, [id, dispatch]);
  if(error) {
    return <NotFoundBlock/>;
  }
  return (
    <>
      {
        loading ? (
          <PizzaInfoSkeleton/>
        ) : (
          <PizzaInfo pizza={item}/>
        )
      }
    </>
  );
}