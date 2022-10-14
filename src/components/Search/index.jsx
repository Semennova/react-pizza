import React from "react";
import s from "./Search.module.scss";
import search from "../assets/img/search.png";
import clear from "../assets/img/clear.png";
import { SearchContext } from "../../App";

export default function Search() {
  const { searchValue, setSearchValue } = React.useContext(SearchContext)

  const onSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const clearInput = () => {
    setSearchValue("");
  };
  return (
    <div className={s.root}>
      <input
        value={searchValue}
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
