import React from "react";
import ReactPaginate from "react-paginate";
import s from "./Pagination.module.scss";

type PaginationProps = {
  pagesCount: number 
  onChangePage: (page: number)=> void 
  currentPage: number
}

export default function Pagination({pagesCount, onChangePage, currentPage}: PaginationProps){
  const handlePageClick = (e: any) => {
    onChangePage(e.selected+1);
  };

//   2) Пагинация. Если бэк не возвращает нужное количество страниц, то мы можем сами посчитать: Math.ceil(Общее количество товаров / Лимит отображения товаров на странице)

//   3) 1:10:13. Mockapi работает корректно. Ты при поиске должен перекидывать пользователя на первую страницу. При поиске тебе надо было пересчитывать количество товара отображаемого и в пагинации показывать нужное количество страниц (Если бы у тебя было, например, 5 сырных пицц, то на второй странице была бы одна пицца).  Данная проблема выкатилась из пункта 2, который я описал выше


  return (
    <ReactPaginate
      className={s.root}
      breakLabel="..."
      nextLabel=" >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pagesCount}
      previousLabel="< "
      forcePage={currentPage - 1}
    />
  );
}
