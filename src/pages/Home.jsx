import React from "react";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";

export default function Home() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryIdx, setCategoryIdx] = React.useState(0);
  const [selectedType, setSelectedType] = React.useState({
    name: "популярности",
    property: "rating",
  });

  React.useEffect(() => {
    setIsLoading(true);

    const category =  categoryIdx > 0 ? `category=${categoryIdx}` : ''
    const sortBy = selectedType.property.replace('-', '')
    const order = selectedType.property.includes('-') ? 'desc' : 'asc'

    fetch(
      `https://6332bc21573c03ab0b4f552f.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryIdx, selectedType]);

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
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, idx) => <Skeleton key={idx} />)
          : items.map((pizza) => {
              return <PizzaBlock key={pizza.id} {...pizza} />;
            })}
      </div>
    </div>
  );
}
