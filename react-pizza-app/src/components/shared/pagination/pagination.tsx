import styles from './pagination.module.scss';

import ReactPaginate from "react-paginate";
import * as React from "react";

interface Props {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  pageSize: number;
}

export const Pagination: React.FC<Props> = ({pageCount, currentPage, onPageChange, pageSize}) => {
  return (
    <ReactPaginate
      className={styles.root}
      forcePage={currentPage}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={e => onPageChange(e.selected)}
      pageRangeDisplayed={pageSize}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
    />
  )
}