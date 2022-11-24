import React from "react";
import {  useSelector } from "react-redux";
import  useWhyDidYouUpdate  from 'ahooks/lib/useWhyDidYouUpdate'

type CategoriesProps = {
  onChangeCategory: (id: number)=> void
}

type FilterType = {
  filter: InitialState
}

type InitialState = {
  searchValue: string
  categories: string[],
  categoryIdx: number,
  sortType: {
    name: string
    property: string
  },
  currentPage: number
}


const Categories: React.FC<CategoriesProps> = React.memo(({onChangeCategory}: CategoriesProps) => {
  const categories = useSelector((state: FilterType) => state.filter.categories);
  const categoryIdx = useSelector((state: FilterType) => state.filter.categoryIdx);

  useWhyDidYouUpdate('Categories', {onChangeCategory})


  return (
    <div className="categories">
      <ul>
        {categories.map((category, idx) => {
          return (
            <li
              key={idx}
              onClick={() => onChangeCategory(idx)}
              // onClick={() => dispatch(selectCategory(idx))}
              className={categoryIdx === idx ? "active" : ""}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
}) 

export default Categories;
