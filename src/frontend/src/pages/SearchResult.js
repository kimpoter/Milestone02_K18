import { useLocation } from "react-router-dom";
import PlaceDisplay from "../components/PlaceDisplay";
import { CgSortZa } from "react-icons/cg";
import SearchFilter from "../components/SearchFilter";

export default function SearchResult() {
  return (
    <div className="flex flex-col items-center text-lg text-primary mt-24">
      {/* Filter Search */}
      <SearchFilter preventDefault />

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
