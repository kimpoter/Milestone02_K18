import PlaceDisplay from "../components/PlaceDisplay";
import SearchFilter from "../components/SearchFilter";
import { useNavigate, useLocation } from "react-router-dom";
import qs from "query-string";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const SORT = {
  DISTANCE: "distance",
  RATING: "rating",
  PRICE: "price",
};

export default function SearchResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParam = qs.parse(location.search);
  function sortResult(data, status) {
    const newQueryParam = {
      ...queryParam,
      sort_data: data,
      sort_status: status,
    };

    console.log(newQueryParam);
    console.log(location.pathname);
    navigate({
      pathname: location.pathname,
      search: qs.stringify(newQueryParam),
    });
  }

  return (
    <div className="flex flex-col items-center text-lg text-primary mt-24">
      {/* Filter Search */}
      <SearchFilter
        preventDefault
        sortData={queryParam.sort_data}
        sortStatus={queryParam.sort_status}
      />

      <div className="bg-[#EFEFEF] w-full p-8 pb-20 rounded-3xl mt-12">
        <div className="flex flex-wrap justify-between px-40">
          <h1 className="text-3xl font-semibold mt-4">Hasil Penelusuran</h1>
          <div className="flex flex-row space-x-2 items-center">
            <ul className="flex rounded-[69px] mt-4 bg-white shadow-[0_0_4px_0_rgba(0,0,0,0.25)] px-1 py-1">
              <button
                onClick={() => sortResult(SORT.RATING, queryParam.sort_status)}
                className={
                  "px-6 py-1 rounded-[69px] " +
                  (queryParam.sort_data === SORT.RATING &&
                    "bg-secondary text-white")
                }
              >
                Rating
              </button>
              <button
                onClick={() =>
                  sortResult(SORT.DISTANCE, queryParam.sort_status)
                }
                className={
                  "px-6 py-1 rounded-[69px] " +
                  (queryParam.sort_data === SORT.DISTANCE &&
                    "bg-secondary text-white")
                }
              >
                Jarak
              </button>
              <button
                onClick={() => sortResult(SORT.PRICE, queryParam.sort_status)}
                className={
                  "px-6 py-1 rounded-[69px] " +
                  (queryParam.sort_data === SORT.PRICE &&
                    "bg-secondary text-white")
                }
              >
                Harga
              </button>
            </ul>
            <button
              className="text-primary text-4xl text-center"
              onClick={() =>
                sortResult(
                  queryParam.sort_data,
                  queryParam.sort_status === "desc" ? "asc" : "desc"
                )
              }
            >
              {queryParam.sort_status === "desc" && <RiArrowDropDownLine />}
              {queryParam.sort_status === "asc" && <RiArrowDropUpLine />}
            </button>
          </div>
        </div>

        <PlaceDisplay />
      </div>
    </div>
  );
}
