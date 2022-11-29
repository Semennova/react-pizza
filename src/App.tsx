import React, { Suspense } from 'react'
import './app.scss'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'

const Cart = React.lazy(() =>import(/*webpackChunkName: "Cart"*/ './pages/Cart'))
const NotFound = React.lazy(() => import(/*webpackChunkName: "NotFound"*/  './pages/NotFound'))
const PizzaItem = React.lazy(() => import(/*webpackChunkName: "PizzaItem"*/ './pages/PizzaItem'))

// export const SearchContext = React.createContext()

function App() {
  // const [searchValue, setSearchValue] = React.useState("");
  /* <SearchContext.Provider value={{searchValue, setSearchValue}}> */
  /* </SearchContext.Provider> */

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route
          path='cart'
          element={
            <Suspense fallback='Loading...'>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path='*'
          element={
            <Suspense fallback='Loading...'>
              <NotFound />
            </Suspense>
          }
        />
        <Route
          path='pizza/:id'
          element={
            <Suspense fallback='Loading...'>
              <PizzaItem />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
