import { PreviewCard } from "./PlaceCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";

function BookmarkDisplay({ placeUrl }) {
  const [placeData, setPlaceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(placeUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        },
      })
      .then((res) => {
        setPlaceData(res.data.data);
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  }, [placeUrl]);

  return (
    <>
      {placeData.length !== 0 && !loading ? (
        <ul className="flex flex-row flex-wrap justify-center">
          {placeData.map((place) => {
            return (
              <Link
                to={`/place-detail/${place.tempatMakan.id}`}
                key={place.tempatMakan.id}
              >
                <PreviewCard place={place.tempatMakan} />
              </Link>
            );
          })}
        </ul>
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

export default BookmarkDisplay;
