import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SearchContext } from "../App";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";
import {
  selectCategory,
  setSelectedType,
  setCurrentPage,
} from "../redux/slices/filterSlice";

export default function Home() {
  const { searchValue } = React.useContext(SearchContext);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const { categoryIdx, sortType, currentPage } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryIdx > 0 ? `category=${categoryIdx}` : "";
    const sortBy = sortType.property.replace("-", "");
    const order = sortType.property.includes("-") ? "desc" : "asc";
    const search = searchValue ? `&search=${searchValue}` : "";

    axios
      .get(
        `https://6332bc21573c03ab0b4f552f.mockapi.io/items?${category}&sortBy=${sortBy}${search}&order=${order}&page=${currentPage}&limit=8`
      )
      .then((response) => {
        setItems(response.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryIdx, sortType, currentPage, searchValue]);

  const onChangeCategory = (id) => {
    dispatch(selectCategory(id));
  };

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const skeleton = [...new Array(6)].map((_, idx) => <Skeleton key={idx} />);
  const pizzas = items.map((pizza) => {
    return <PizzaBlock key={pizza.id} {...pizza} />;
  });

  return (
    <div className="container">
      <div className="content__top">
        <Categories onChangeCategory={onChangeCategory} />
        <Sort
          selected={sortType}
          setSelected={(name) => {
            dispatch(setSelectedType(name));
          }}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>

      <Pagination
        currentPage={currentPage}
        pagesCount={2}
        onChangePage={onChangePage}
      />
    </div>
  );
}
