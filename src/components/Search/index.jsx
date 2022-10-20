import React from "react";
import s from "./Search.module.scss";
import search from "../assets/img/search.png";
import clear from "../assets/img/clear.png";
import { SearchContext } from "../../App";
import debounce from "lodash.debounce";

export default function Search() {
  const [value, setValue] = React.useState('')
  const { searchValue, setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef();

  const debounceSearchValue = React.useCallback(
    debounce((str)=> {
      setSearchValue(str)
    }, 1000), []
  )

  const onSearchValueChange = (e) => {
    setValue(e.target.value);
    debounceSearchValue(e.target.value)
  };

  const clearInput = () => {
    setSearchValue("")
    setValue("");
    inputRef.current.focus();
  };

  return (
    <div className={s.root}>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onSearchValueChange(e)}
        className={s.input}
        placeholder="Поиск пиццы..."
      />
      <img className={s.icon} src={search} />
      {searchValue && (
        <img className={s.clearIcon} src={clear} onClick={clearInput} />
      )}
    </div>
  );
}
