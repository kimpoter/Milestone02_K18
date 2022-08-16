import { useLocation } from "react-router-dom";
import PlaceDisplay from "../components/PlaceDisplay";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import FilterTab from "../components/FilterTab";
import { CgSortZa } from "react-icons/cg";

export default function SearchResult() {
  const [filterDisplay, setFilterDisplay] = useState(false);

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

  return (
    <div className="flex flex-col items-center text-lg text-primary mt-24">
      {/* Filter Search */}
      <div className="flex flex-row justify-between items-center space-x-4 w-[70vw]">
        <FaSearch />
        <form disabled={filterDisplay}>
          <input
            placeholder="Telusuri tempat makan di sekitarmu!"
            className="bg-greyscale rounded-2xl w-[60vw] px-6 py-2"
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

      <div className="bg-[#EFEFEF] w-full p-8 pb-20 rounded-3xl min-h-[90vh] mt-12">
        <div className="flow-root">
          <div className="flex justify-between px-40 mt-">
            <h1 className="text-3xl font-semibold">Hasil Penelusuran</h1>
            <button className="btn-primary rounded-2xl px-8 py-2 flex items-center">
              <h3>Sort</h3>
              <CgSortZa />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center w-full">
          <PlaceDisplay
            place_data_url={`${process.env.REACT_APP_SERVER_URL}${
              useLocation().pathname
            }${useLocation().search}`}
          />
        </div>
      </div>
    </div>
  );
}
