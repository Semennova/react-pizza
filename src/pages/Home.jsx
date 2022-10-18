import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchContext } from "../App";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";
import { selectCategory, setSelectedType } from "../redux/slices/filterSlice";

export default function Home() {
  const { searchValue } = React.useContext(SearchContext);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // const categoryIdx = useSelector((state) => state.filter.categoryIdx);
  // const sortType = useSelector((state) => state.filter.sortType);

  const { categoryIdx, sortType } = useSelector((state) => state.filter);
  const dispatch = useDispatch();


  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 4;

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryIdx > 0 ? `category=${categoryIdx}` : "";
    const sortBy = sortType.property.replace("-", "");
    const order = sortType.property.includes("-") ? "desc" : "asc";
    const search = searchValue ? `&search=${searchValue}` : "";

    fetch(
      `https://6332bc21573c03ab0b4f552f.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}${search}&order=${order}`
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryIdx, sortType, currentPage, searchValue]);

  const onChangeCategory = (id) => {
    dispatch(selectCategory(id))
  };

  const skeleton = [...new Array(6)].map((_, idx) => <Skeleton key={idx} />);
  const pizzas = items.map((pizza) => {
    return <PizzaBlock key={pizza.id} {...pizza} />;
  });

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          onChangeCategory={onChangeCategory}
        />
        <Sort selected={sortType} setSelected={(name)=>{dispatch(setSelectedType(name))}} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>

      <Pagination
        pagesCount={3}
        onChangePage={(number) => setCurrentPage(number)}
      />
    </div>
  );
}
