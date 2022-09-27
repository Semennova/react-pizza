import React from 'react'
// import './App.css';
import './app.scss'
import Categories from './components/Categories';
import Header from './components/Header';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';



function App() {

  const [items, setItems] = React.useState([])

  React.useEffect(() => {
    fetch('https://6332bc21573c03ab0b4f552f.mockapi.io/items')
      .then((res) => {
        return res.json()
      })
      .then((arr) => {
        setItems(arr)
      })
  }, [])
  console.log(items);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map(pizza => {
              return <PizzaBlock
                key={pizza.id}
                {...pizza}
              />
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
