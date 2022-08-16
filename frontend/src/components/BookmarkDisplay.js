import { PreviewCard } from "./PlaceCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";

function BookmarkDisplay() {
  const [placeData, setPlaceData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setPlaceData([]);
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await axios.get("/bookmark", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
          },
          withCredentials: true,
        });
        console.log(res.data.data);
        setPlaceData(res.data.data);
        setLoading(false);
      } catch (err) {
        console.log(err.res?.status);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {placeData.length > 0 && !loading ? (
        <ul className="flex flex-row flex-wrap justify-center">
          {placeData.map((place) => {
            console.log(place.tempatMakan);
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
        <div className="w-full text-center mt-64">
          {loading ? <h3>Loading...</h3> : <h3>No Data Available Right Now</h3>}
        </div>
      )}
    </>
  );
}

export default BookmarkDisplay;
