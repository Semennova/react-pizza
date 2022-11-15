import React from 'react'
import './app.scss'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import { Routes, Route } from 'react-router-dom'
import Cart from './pages/Cart'
import PizzaItem from './pages/PizzaItem'
import { MainLayout } from './layouts/MainLayout'

// export const SearchContext = React.createContext()

function App() {
  // const [searchValue, setSearchValue] = React.useState("");
  /* <SearchContext.Provider value={{searchValue, setSearchValue}}> */
  /* </SearchContext.Provider> */

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route path='cart' element={<Cart />} />
        <Route path='*' element={<NotFound />} />
        <Route path='pizza/:id' element={<PizzaItem />} />
      </Route>
    </Routes>
  )
}

export default App
