import { PreviewCard } from "./PlaceCard";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "../api/axios";

function PlaceDisplay() {
  const [placeData, setPlaceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const location = useLocation();
  const { campus, page } = useParams();
  const navigate = useNavigate();

  function handlePageChange({ selected }) {
    setCurrentPage(selected);
    navigate({
      pathname: `/${campus}/${selected + 1}`,
      search: location.search,
    });
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/tempat-makan/campus/${campus}/${page}${location.search}`)
      .then((res) => {
        setPlaceData(res.data.data.dataTempatMakan);
        setPageCount(res.data.data.totalPages);
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  }, [currentPage, campus, location.search, location.pathname, page]);

  return (
    <>
      {placeData.length !== 0 && !loading ? (
        <div>
          <ul className="flex flex-row flex-wrap justify-center">
            {placeData.map((place) => {
              return (
                <Link to={`/place-detail/${place.id}`} key={place.id}>
                  <PreviewCard place={place} />
                </Link>
              );
            })}
          </ul>
          <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={5}
            forcePage={currentPage}
            previousLabel="Prev"
            nextLabel="Next"
            breakLabel="..."
            onPageChange={handlePageChange}
            containerClassName="flex space-x-8 justify-center items-center mt-[60px]"
            disabledClassName="invisible"
            nextClassName="btn-primary"
            previousClassName="btn-secondary"
            activeClassName="text-primary font-extrabold"
          />
        </div>
      ) : (
        <div className="w-full text-center min-h-[50vh] flex justify-center">
          {loading ? (
            <div className="flex flex-col justify-center items-center space-y-6">
              <div className="loading-spinner" />
              <p>Fetching data...</p>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center space-y-6">
              <h3>No Data Available Right Now</h3>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default PlaceDisplay;
