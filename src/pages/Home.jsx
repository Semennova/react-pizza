import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../App";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort, { list } from "../components/Sort";
import {
  selectCategory,
  setSelectedType,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

export default function Home() {
  const { categoryIdx, sortType, currentPage } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();

  const { searchValue } = React.useContext(SearchContext);
  const navigate = useNavigate();
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const fetchPizzas = () => {
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
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.property === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryIdx, sortType, currentPage, searchValue]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.property,
        categoryIdx,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true
  }, [categoryIdx, currentPage, sortType.propert]);

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
