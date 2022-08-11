import { FaStar, FaHeart } from "react-icons/fa";
import { BsLink45Deg } from "react-icons/bs";

function formatTimeToLocalTime(timestamp) {
    var timestamp_formatter = new Date(timestamp)
    let new_timestamp = timestamp_formatter.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})

    return new_timestamp
}

function Rating({ rating, position }) {
    return (
        <div className={`flex flex-row items-center space-x-2 bg-[#F2BE22] w-fit px-3 text-white rounded-lg font-semibold h-fit ${position}`}>
            <h3>
                <FaStar />
            </h3>
            <h3>{rating}</h3>
        </div>
    )
}

export function PreviewCard({ place, category }) {
    return (
        <div className="mx-2 shadow-xl  bg-white px-4 py-4 mt-8 sm:w-[270px] w-[200px] sm:min-h-[270px] min-h-[200px] rounded-3xl relative hover:cursor-pointer">
            <img src={place.imageUrl ? place.imageUrl : "placeholder.jpg"} alt="placeholder" className="rounded-xl aspect-[4/3] object-cover" />
            <Rating position={"absolute top-6 right-6 z-1"} rating={place.rating}/>
            <h2 className="mt-4">{place.name}</h2>
            <ul className="opacity-50">
                <li>{category.join(', ')}</li>
                <li>{place.address}</li>
                <li>{formatTimeToLocalTime(place.timeOpen)} - {formatTimeToLocalTime(place.timeClose)}</li>
            </ul>
        </div>
    )
};

// TODO: Link to Google Maps and Bookmark
export function DetailCard({ place, category }) {
    return (
        <div className="card sm:text-base text-sm flex lg:flex-row flex-col">
            <img src={place.imageUrl ? place.imageUrl : "placeholder.jpg"} alt="placeholder" className="rounded-xl aspect-[4/3] object-cover w-[400px] mr-8" />
            <div className="space-y-2 lg:mt-0 mt-4">
                <div className="flex sm:flex-row flex-col sm:space-x-4 sm:space-y-0 space-y-2 sm:items-center">
                    <Rating rating={place.rating}/>
                    <h1>{place.name}</h1>
                </div>
                <p>{formatTimeToLocalTime(place.timeOpen)} - {formatTimeToLocalTime(place.timeClose)} | {category.join(', ')}</p>
                <div className="flex flex-row items-center space-x-4 bg-greyscale px-6 py-2 rounded-lg w-full opacity-50">
                    <BsLink45Deg />
                    <a href={place.addressLink}>{place.addressLink}</a>
                </div>
                <h2>Deskripsi</h2>
                <p>{place.description}</p>
            </div>
        </div>
    )
}

export function MenuCard(props) {
    var price_formatter = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" })

    return (
        <div className="card py-6 sm:text-base text-sm flex flex-row justify-between w-full mt-6">
            <div className="flex flex-row">
                <img src={props.menu.image ? props.menu.image : "placeholder.jpg"} alt="placeholder" className="rounded-xl aspect-[4/3] object-cover w-[80px] mr-8" />
                <div>
                    <h2>{props.menu.title}</h2>
                    <p className="opacity-50">{props.menu.detail}</p>
                    <div className="flex flex-row items-center space-x-2 mt-6">
                        <div className="text-[#EE0000]"><FaHeart /></div>
                        <p>{props.menu.likes}</p>
                    </div>
                </div>
            </div>
            <h2>{price_formatter.format(props.menu.price)}</h2>
        </div>
    )
}