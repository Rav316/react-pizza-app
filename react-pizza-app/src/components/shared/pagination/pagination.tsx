import styles from './pagination.module.scss';

import ReactPaginate from "react-paginate";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../redux/store.ts";
import { setCurrentPage } from "../../../redux/slice/pagination-slice.ts";

interface Props {
  pageCount: number;
  pageSize: number;
}

export const Pagination: React.FC<Props> = ({pageCount, pageSize}) => {
  const currentPage = useSelector((state: RootState) => state.pagination.currentPage);
  const dispatch = useDispatch();
  return (
    <ReactPaginate
      className={styles.root}
      forcePage={currentPage}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={e => dispatch(setCurrentPage(e.selected))}
      pageRangeDisplayed={pageSize}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
    />
  )
}