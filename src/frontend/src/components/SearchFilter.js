import { FaSearch } from "react-icons/fa";
import FilterTab from "../components/FilterTab";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CampusContext from "../context/CampusContext";

const PLACE_URL = {
  ganesha: `/ganesha?`,
  jatinangor: `/jatinangor?`,
};

function SearchFilter({ preventDefault }) {
  const [filterDisplay, setFilterDisplay] = useState(false);
  const { campus } = useContext(CampusContext);
  const searchValue = useRef();
  const navigate = useNavigate();

  function handleFilterClick() {
    setFilterDisplay(!filterDisplay);
  }

  function handleSubmit(e) {
    if (preventDefault) {
      e.preventDefault();
    }
    navigate(`${PLACE_URL[campus]}search=${searchValue.current.value}`);
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center space-x-4 w-[70vw]">
        <FaSearch />
        <form onSubmit={handleSubmit}>
          <input
            disabled={filterDisplay}
            placeholder="Telusuri tempat makan di sekitarmu!"
            className="bg-greyscale rounded-2xl w-[60vw] px-6 py-2"
            ref={searchValue}
          ></input>
        </form>
        <button
          onClick={handleFilterClick}
          className="btn-primary rounded-2xl px-8 py-2"
        >
          Filter
        </button>
      </div>

      {filterDisplay && <FilterTab searchValue={searchValue.current.value} />}
    </div>
  );
}

export default SearchFilter;
