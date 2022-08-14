import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ReviewRating(props) {
    return (
        <div className="flex flex-row gap-0.5 mt-0.4">
            {[...Array(props.rating)].map((star) => {
                return <FaStar size={20} color={"#ffc107"}/>
            })}
            {[...Array(5-props.rating)].map((star) => {
                return <FaStar size={20} color={"#e4e5e9"}/>
            })}
        </div>
    )
}

function formatTimeToDate(timestamp) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var now = new Date(timestamp);
    return months[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear()
}
export function ReviewCard({reviews}) {
    return(
        <div className="card py-6 sm:text-base text-sm flex flex-col w-full mt-6">
            <div className="flex flex-row justify-between">
                <ReviewRating rating={reviews.rating}/>
                <p>{formatTimeToDate(reviews.createdAt)}</p>
            </div>
            <h2 className="sm:text-base text-sm mt-1">{reviews.userId}</h2>
            <p>{reviews.content}</p>
        </div>
    )
}

function ReviewDisplay(props) {
    const [placeReview, setPlaceReview] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/review")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            data.forEach((element) => {
            if (element.id == props.id) {
                setPlaceReview(element);
                return;
            }
            })
        })
    }, [])
    
    return (
        <ul className="flex flex-col">
            {placeReview.map((review) => {
                return (
                    <ReviewCard reviews={review}/>
            )})}
        </ul>
    )

}

export default ReviewDisplay;