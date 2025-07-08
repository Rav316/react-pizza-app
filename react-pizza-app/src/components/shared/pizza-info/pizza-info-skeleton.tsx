import styles from "./pizza-info.module.scss";
import Skeleton from "react-loading-skeleton";

export const PizzaInfoSkeleton = () => {
  return (
    <div className={styles.root}>
      <div className={styles.imgWrapper}>
        <Skeleton width={300} height={300} circle={true}/>
      </div>
      <div className={styles.pizzaInfo}>
        <Skeleton width={300} height={40}/>
        <h4>
          <span>
            <Skeleton height={10} width={530}/>
          </span>
        </h4>
        <p className={styles.pizzaTypeSize}>
          <Skeleton height={10} width={530}/>
        </p>
        <Skeleton height={30} width={530}/>
        <div className={styles.selectorWrapper}>
          <Skeleton height={105} width={400}/>
        </div>
        <div className={styles.addButtonWrapper}>
          <Skeleton height={50} width={160} borderRadius={20}/>
        </div>
      </div>
    </div>
  );
}