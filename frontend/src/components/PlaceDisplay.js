import { PreviewCard } from "./PlaceCard"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


function PlaceDisplay({ place_data_url }) {
    const [ placeData, setPlaceData ] = useState([])

    useEffect(() => {
        fetch(place_data_url)
        .then((res) => {
            return res.json()
        }).then((data) => {
            setPlaceData(data)
        })
    }, [place_data_url])

    return (
        <ul className="flex flex-row flex-wrap justify-center">
            {placeData.map((place) => {
                return (
                    <Link to={`/place-detail/${place.id}`} key={place.id}>
                        {/* TODO: change category, masih hardcode, harusnya nanti untuk get category
                            dari tempat makan udah ada urlnya dari be 
                        */}
                        <PreviewCard
                        place={place}
                        category={["Fast Food", "Ayam", "Sapi", "Burger"]}
                        />
                    </Link>
                )
            })}
        </ul>
    )
};

export default PlaceDisplay;