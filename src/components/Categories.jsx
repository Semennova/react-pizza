import React from "react";
import { useDispatch, useSelector } from "react-redux";


const Categories = ({onChangeCategory}) => {
  const categories = useSelector((state) => state.filter.categories);
  const categoryIdx = useSelector((state) => state.filter.categoryIdx);
  // const dispatch = useDispatch();

  console.log(categoryIdx);

  // const categories = [
  //   "Все",
  //   "Мясные",
  //   "Вегетарианская",
  //   "Гриль",
  //   "Острые",
  //   "Закрытые",
  // ];

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
};

export default Categories;
