import { PreviewCard } from "./PlaceCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function PlaceDisplay({ place_data_url }) {
  const [placeData, setPlaceData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setPlaceData([]);
    setLoading(true);
    console.log(place_data_url);
    fetch(place_data_url)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res.data);
        setPlaceData(res.data);
      })
      .finally(() => setLoading(false));
  }, [place_data_url]);

  return (
    <>
      {placeData && !loading ? (
        <ul className="flex flex-row flex-wrap justify-center">
          {placeData.map((place) => {
            return (
              <Link to={`/place-detail/${place.id}`} key={place.id}>
                {/* TODO: change category, masih hardcode, harusnya nanti untuk get category
                                dari tempat makan udah ada urlnya dari be 
                            */}
                <PreviewCard place={place} />
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

export default PlaceDisplay;
