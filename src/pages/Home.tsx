import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import qs from 'qs'
import { Link, useNavigate } from 'react-router-dom'
import Categories from '../components/Categories'
import Pagination from '../components/Pagination'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Sort, { list } from '../components/Sort'
import {
  selectCategory,
  setSelectedType,
  setCurrentPage,
  setFilters
} from '../redux/slices/filterSlice'
import { fetchPizzas } from '../redux/slices/pizzasSlice'

const Home: React.FC = () => {
  //@ts-ignore
  const { categoryIdx, sortType, currentPage, searchValue } = useSelector(state => state.filter)


  //@ts-ignore
  const { items, status } = useSelector(state => state.pizzas)

  const dispatch = useDispatch()
 

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
      //@ts-ignore
      fetchPizzas({
        category,
        sortBy,
        order,
        search,
        currentPage
      })
    )
  }

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))

      const sort = list.find(obj => obj.property === params.sortProperty)
      dispatch(
        setFilters({
          ...params,
          sort
        })
      )
      isSearch.current = true
    }
  }, [])

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
  }, [categoryIdx, currentPage, sortType.propert])

  const onChangeCategory = (id: number) => {
    dispatch(selectCategory(id))
  }

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const skeleton = [...new Array(6)].map((_, idx) => <Skeleton key={idx} />)
  const pizzas = items.map((pizza: any) => {
    return <Link to={`/pizza/${pizza.id}`} key={pizza.id}><PizzaBlock {...pizza} /></Link>
  })
  return (
    <div className='container'>
      <div className='content__top'>
        <Categories onChangeCategory={onChangeCategory} />
        <Sort
          selected={sortType}
          setSelected={name => {
            dispatch(setSelectedType(name))
          }}
        />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      {status === 'error' ? (
        <div className='content__error-info'>
          <h2>Произошла ошибка 😕</h2>
          <p>Не удалось получить данные. Повторите попытку позже.</p>{' '}
        </div>
      ) : (
        <div className='content__items'>
          {status === 'loading' ? skeleton : pizzas}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        pagesCount={2}
        onChangePage={onChangePage}
      />
    </div>
  )
}


export default Home
