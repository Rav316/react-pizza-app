import styles from './pagination.module.scss';

import ReactPaginate from "react-paginate";

export const Pagination = () => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={console.log}
      pageRangeDisplayed={5}
      pageCount={3}
      renderOnZeroPageCount={null}
    />
  )
}