import React from "react";
import { SearchContext } from "../App";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";



export default function Home() {

   const { searchValue } = React.useContext(SearchContext)
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryIdx, setCategoryIdx] = React.useState(0);
  const [selectedType, setSelectedType] = React.useState({
    name: "популярности",
    property: "rating",
  });
  const [currentPage, setCurrentPage] = React.useState(1)
  const itemsPerPage = 4
  const pagesCount = Math.ceil(items.length / itemsPerPage)


  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryIdx > 0 ? `category=${categoryIdx}` : "";
    const sortBy = selectedType.property.replace("-", "");
    const order = selectedType.property.includes("-") ? "desc" : "asc";
    const search = searchValue ? `&search=${searchValue}` : ''

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
  }, [categoryIdx, selectedType, currentPage, searchValue]);

  const skeleton = [...new Array(6)].map((_, idx) => <Skeleton key={idx} />);
  const pizzas = items
  .map((pizza) => {
      return <PizzaBlock key={pizza.id} {...pizza} />;
    });


console.log(searchValue);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryIdx={categoryIdx}
          onClickCategory={(id) => setCategoryIdx(id)}
        />
        <Sort selected={selectedType} setSelected={setSelectedType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>

     <Pagination pagesCount={3} onChangePage={(number)=> setCurrentPage(number)}/>

    </div>
  );
}
