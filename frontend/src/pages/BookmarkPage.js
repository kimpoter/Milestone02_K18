import CampusContext from "../CampusContext";
import { useContext } from "react";
import PlaceDisplay from "../components/PlaceDisplay";
import SearchFilter from "../components/SearchFilter";

const PLACE_URL = {
  GANESHA: `${process.env.REACT_APP_SERVER_URL}/tempat-makan/campus/ganesha?sort_status=asc&sort_data=rating`,
  JATINAGOR: `${process.env.REACT_APP_SERVER_URL}/tempat-makan/campus/jatinagor?sort_status=asc&sort_data=rating`,
};

export default function BookmarkPage() {
  const { campus } = useContext(CampusContext);

  return (
    <div className="flex flex-col items-center text-lg text-primary">
      {/* Filter Search */}
      <SearchFilter />

      {/* Main Bookmark */}
      <div className="bg-[#EFEFEF] w-full p-8 pb-20 rounded-3xl">
        <div className="flow-root">
          <div className="float-left ml-32 mt-10">
            <h1>Bookmark</h1>
          </div>
          <div className="float-right mr-32 mt-10 ">
            <button className="btn-primary rounded-2xl px-8 py-2 flex items-center">
              <h3>Sort</h3>
              <img src="sort.svg" className="ml-3 w-[16px]" alt="sort logo" />
            </button>
          </div>
        </div>
        {/* <h1 className='ml-16 my-3'>
                    Bookmark
                </h1> */}
        <div className="flex flex-wrap justify-center w-full">
          <PlaceDisplay place_data_url={PLACE_URL[campus]} />
        </div>
      </div>
    </div>
  );
}
