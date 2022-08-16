import { FaStar } from "react-icons/fa";

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

function Rating({ rating, position }) {
  return (
    <div
      className={`flex flex-row items-center space-x-2 bg-[#F2BE22] w-fit px-3 text-white rounded-lg font-semibold h-fit ${position}`}
    >
      <h3>
        <FaStar />
      </h3>
      <h3>{rating}</h3>
    </div>
  );
}
export function ReviewCard({ reviews }) {
  return (
    <div className="card py-6 sm:text-base text-sm flex flex-col w-full mt-6">
      <div className="flex flex-row justify-between">
        <p>{formatTimeToDate(reviews.createdAt)}</p>
        <Rating rating={reviews.rating} />
      </div>
      <h2 className="sm:text-base text-sm mt-1">{reviews.user.username}</h2>
      <p>{reviews.content}</p>
    </div>
  );
}

function ReviewDisplay({ placeReview }) {
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
