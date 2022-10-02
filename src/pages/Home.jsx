import React from 'react'
import Categories from '../components/Categories'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Sort from '../components/Sort'

export default function Home() {

    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
  
    React.useEffect(() => {
      fetch('https://6332bc21573c03ab0b4f552f.mockapi.io/items')
        .then((res) => {
          return res.json()
        })
        .then((arr) => {
          setItems(arr)
          setIsLoading(false)
        })
    }, [])


  return (
    <div>
        <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              isLoading  
               ? [...new Array(6)].map((_, idx)=> <Skeleton key={idx}/>) :
              items.map(pizza => {
                return <PizzaBlock
                  key={pizza.id}
                  {...pizza}
                />
              })
            }
          </div>
    </div>
  )
}
