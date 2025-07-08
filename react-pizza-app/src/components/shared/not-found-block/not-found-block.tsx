import styles from "./not-found-block.module.scss";
import { Link } from "react-router";

export const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={"description"}>
        К сожалению данная страница отсутствует в нашем интернет-магазине
      </p>
      <Link to={'/'}>
        <button>Вернуться на главную</button>
      </Link>
    </div>
  );
};
