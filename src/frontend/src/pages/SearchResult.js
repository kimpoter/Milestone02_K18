import { useLocation } from "react-router-dom";
import PlaceDisplay from "../components/PlaceDisplay";
import SearchFilter from "../components/SearchFilter";
import CampusContext from "../context/CampusContext";
import { useContext, useState } from "react";

const SORT = {
  DISTANCE: "distance",
  RATING: "rating",
  PRICE: "price",
};

export default function SearchResult() {
  const { campus } = useContext(CampusContext);
  const [sortState, setSortState] = useState({
    status: "desc",
    data: SORT.DISTANCE,
  });
  return (
    <div className="flex flex-col items-center text-lg text-primary mt-24">
      {/* Filter Search */}
      <SearchFilter preventDefault />

      <div className="bg-[#EFEFEF] w-full p-8 pb-20 rounded-3xl mt-12">
        <div className="flex flex-wrap justify-between px-40">
          <h1 className="text-3xl font-semibold mt-4">Hasil Penelusuran</h1>
          <ul className="flex rounded-[69px] mt-4 bg-white shadow-[0_0_4px_0_rgba(0,0,0,0.25)] px-1 py-1">
            <button
              onClick={() =>
                setSortState({ status: "desc", data: SORT.DISTANCE })
              }
              className={
                "px-6 py-1 rounded-[69px] " +
                (sortState.data === SORT.DISTANCE && "bg-secondary text-white")
              }
            >
              Jarak
            </button>
            <button
              onClick={() =>
                setSortState({ status: "desc", data: SORT.RATING })
              }
              className={
                "px-6 py-1 rounded-[69px] " +
                (sortState.data === SORT.RATING && "bg-secondary text-white")
              }
            >
              Rating
            </button>
            <button
              onClick={() => setSortState({ status: "desc", data: SORT.PRICE })}
              className={
                "px-6 py-1 rounded-[69px] " +
                (sortState.data === SORT.PRICE && "bg-secondary text-white")
              }
            >
              Harga
            </button>
          </ul>
        </div>

        <PlaceDisplay
          placeUrl={`/tempat-makan/campus/${campus}${
            useLocation().search
          }&sort_status=${sortState.status}&sort_data=${sortState.data}`}
        />
      </div>
    </div>
  );
}
