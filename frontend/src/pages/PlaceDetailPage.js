import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DetailCard, MenuCard } from "../components/PlaceCard";

function PlaceDetailPage() {
    const { id } = useParams()
    const [ placeData, setPlaceData ] = useState(null)

    useEffect(() => {
        fetch("http://localhost:8000/tempatMakan") // ini nanti harusnya ada url yang bakal langsung nge fetch data tempat makan sesuai id nya
        .then((res) => {
            return res.json()
        }).then((data) => {
            data.forEach(element => {
                if (element.id == id) {
                    setPlaceData(element)
                    return
                }
            });
        })
    }, [])

    // TODO : fetching menu data
    return (
        <div>
            {placeData && 
            <div>
                <div className="mt-12">
                    <DetailCard place={placeData} category={["Fast Food", "Ayam", "Sapi", "Burger"]} />
                </div>
            </div>
            }
        </div>
    )
};

export default PlaceDetailPage;