import React from 'react'
import s from './Search.module.scss'
import search from '../assets/img/search.png'
import clear from '../assets/img/clear.png'
// import { SearchContext } from "../../App";
import debounce from 'lodash.debounce'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/slices/filterSlice'


export default function Search() {
  const [value, setValue] = React.useState('')
  // const { searchValue } = useSelector((state) => state.filter.searchValue)
  // const { searchValue, setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()

  const debounceSearchValue = React.useCallback(
    debounce((str: string) => {
      // setSearchValue(str)
      dispatch(setSearchValue(str))
    }, 1000),
    []
  )

  const onSearchValueChange = (e: any) => {
    setValue(e.target.value)
    debounceSearchValue(e.target.value)
  }

  const clearInput = () => {
    dispatch(setSearchValue(''))
    setValue('')
    // if (inputRef.current) {
    //   inputRef.current.focus()
    // }

    inputRef.current?.focus()
  }

  return (
    <div className={s.root}>
      <input
        ref={inputRef}
        value={value}
        onChange={e => onSearchValueChange(e)}
        className={s.input}
        placeholder='Поиск пиццы...'
      />
      <img className={s.icon} src={search} />
      {value && <img className={s.clearIcon} src={clear} onClick={clearInput} />}
    </div>
  )
}
