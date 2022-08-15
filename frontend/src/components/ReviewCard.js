import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";

function ReviewRating(props) {
  return (
    <div className="flex flex-row gap-0.5 mt-0.4">
      {[...Array(props.rating)].forEach((star) => {
        return <FaStar size={20} color={"#ffc107"} />;
      })}
      {[...Array(5 - props.rating)].forEach((star) => {
        return <FaStar size={20} color={"#e4e5e9"} />;
      })}
    </div>
  );
}

function formatTimeToDate(timestamp) {
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var now = new Date(timestamp);
  return (
    months[now.getMonth()] + " " + now.getDate() + ", " + now.getFullYear()
  );
}
export function ReviewCard({ reviews }) {
  return (
    <div className="card py-6 sm:text-base text-sm flex flex-col w-full mt-6">
      <div className="flex flex-row justify-between">
        <ReviewRating rating={reviews.rating} id={reviews.id} />
        <p>{formatTimeToDate(reviews.createdAt)}</p>
      </div>
      <h2 className="sm:text-base text-sm mt-1">{reviews.userId}</h2>
      <p>{reviews.content}</p>
    </div>
  );
}

function ReviewDisplay({ id }) {
  const [placeReview, setPlaceReview] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/review")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const newPlaceReview = [];
        data.forEach((element) => {
          if (element.tempatMakanId === parseInt(id)) {
            newPlaceReview.push(element);
            return;
          }
        });
        setPlaceReview(newPlaceReview);
      });
  }, [id]);

  return (
    <ul className="flex flex-col">
      {placeReview.map((review) => {
        return (
          <div key={review.id}>
            <ReviewCard reviews={review} />
          </div>
        );
      })}
    </ul>
  );
}

export default ReviewDisplay;
