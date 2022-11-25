import React from 'react'
import { useSelector } from 'react-redux'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import Categories from '../components/Categories'
import Pagination from '../components/Pagination'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Sort, { list } from '../components/Sort'
import { useAppDispatch } from '../redux/store'
import { selectCategory, setCurrentPage, setFilters, setSelectedType } from '../redux/filter/slice'
import { fetchPizzas } from '../redux/pizza/asyncActions'



const Home: React.FC = () => {
  //@ts-ignore
  const { categoryIdx, sortType, currentPage, searchValue } = useSelector(state => state.filter)

  //@ts-ignore
  const { items, status } = useSelector(state => state.pizzas)

  const dispatch = useAppDispatch()

  // const { searchValue } = React.useContext(SearchContext)
  const navigate = useNavigate()
  // const [isLoading, setIsLoading] = React.useState(true)
  const isSearch = React.useRef(false)
  const isMounted = React.useRef(false)

  const getPizzas = async () => {
    // setIsLoading(true)

    const category = categoryIdx > 0 ? `category=${categoryIdx}` : ''
    const sortBy = sortType.property.replace('-', '')
    const order = sortType.property.includes('-') ? 'desc' : 'asc'
    const search = searchValue ? `&search=${searchValue}` : ''

    dispatch(
      fetchPizzas({
        category,
        sortBy,
        order,
        search,
        currentPage
      })
    )
  }

  // React.useEffect(() => {
  //   if (!window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1))

  //     const sort = list.find(obj => obj.property === params.sortProperty)
  //     dispatch(
  //       setFilters({
  //         ...params,
  //         //@ts-ignore
  //         sort
  //       })
  //     )
  //     isSearch.current = true
  //   }
  // }, [])

  React.useEffect(() => {
    window.scrollTo(0, 0)
    if (!isSearch.current) {
      getPizzas()
    }
    isSearch.current = false
  }, [categoryIdx, sortType, currentPage, searchValue])

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.property,
        categoryIdx,
        currentPage
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryIdx, currentPage, sortType.property])

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(selectCategory(id))
  }, [])

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const setSelectedCategory = React.useCallback((name: any) => {
    dispatch(setSelectedType(name))
  }, [])
  
  const skeleton = [...new Array(6)].map((_, idx) => <Skeleton key={idx} />)
  const pizzas = items.map((pizza: any) => {
    return <PizzaBlock key={pizza.id} {...pizza} />
  })

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories onChangeCategory={onChangeCategory} />
        <Sort
          selected={sortType}
          // setSelected={name => {
          //   dispatch(setSelectedType(name))

          // }}
          setSelected={setSelectedCategory}
        />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      {status === 'error' ? (
        <div className='content__error-info'>
          <h2>Произошла ошибка 😕</h2>
          <p>Не удалось получить данные. Повторите попытку позже.</p>{' '}
        </div>
      ) : (
        <div className='content__items'>{status === 'loading' ? skeleton : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} pagesCount={2} onChangePage={onChangePage} />
    </div>
  )
}

export default Home
