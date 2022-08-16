import { FaSearch } from "react-icons/fa";
import FilterTab from "../components/FilterTab";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CampusContext from "../CampusContext";

const PLACE_URL = {
  GANESHA: `/tempat-makan/campus/ganesha?sort_status=asc&sort_data=rating`,
  JATINAGOR: `/tempat-makan/campus/jatinagor?sort_status=asc&sort_data=rating`,
};

function SearchFilter() {
  const [filterDisplay, setFilterDisplay] = useState(false);
  const { campus } = useContext(CampusContext);
  const searchValue = useRef();
  const navigate = useNavigate();

  function handleFilterClick() {
    if (!filterDisplay) {
      window.scrollTo({
        top: 800,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    setFilterDisplay(!filterDisplay);
  }

  function handleSubmit() {
    navigate(`${PLACE_URL[campus]}&search=${searchValue.current.value}`);
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center space-x-4 w-[70vw]">
        <FaSearch />
        <form disabled={filterDisplay} onSubmit={handleSubmit}>
          <input
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

      {filterDisplay && <FilterTab />}
    </div>
  );
}

export default SearchFilter;
