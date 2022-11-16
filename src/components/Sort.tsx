import React from "react";

type SortItemType = {
  name: string
  property: string
}

type SortProps = {
  selected: SortItemType
  setSelected: (obj:SortItemType )=> void
}

type PopupClick = MouseEvent & {
  path: Node[]
}


export const list: SortItemType[] = [
  { name: "популярности(asc)", property: "-rating" },
  { name: "популярности(desc)", property: "rating" },
  { name: "цене(asc)", property: "price" },
  { name: "цене(desc)", property: "-price" },
  { name: "алфавиту(asc)", property: "title" },
  { name: "алфавиту(desc)", property: "-title" },
];

export default function Sort({ selected, setSelected }: SortProps) {
  const [isPopupVisible, setIsPopupVisible] = React.useState(false);
  const sortRef = React.useRef<HTMLDivElement>(null);

  const onClickSelect = (obj:SortItemType) => {
    setSelected(obj);
    setIsPopupVisible(false);
  };

  React.useEffect(()=> {
    const handleOutsideClick = (e: MouseEvent) => {
      const _e = e as PopupClick
        if(sortRef.current && !_e.path.includes(sortRef.current)){
          setIsPopupVisible(false);
        }
    }

    document.body.addEventListener('click', handleOutsideClick)

    return () => {
      document.body.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsPopupVisible(!isPopupVisible)}>
          {selected.name}
        </span>
      </div>
      {isPopupVisible && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, i) => {
              return (
                <li
                  key={i}
                  onClick={() => onClickSelect(obj)}
                  className={selected.property === obj.property ? "active" : ""}
                >
                  {obj.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
