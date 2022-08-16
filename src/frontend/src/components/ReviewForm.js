import { FaStar } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import { useRef, useState } from "react";

function DateToday() {
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
  var today = new Date();
  return (
    months[today.getMonth()] +
    " " +
    today.getDate() +
    ", " +
    today.getFullYear()
  );
}

export function ReviewForm() {
  const [value, setValue] = useState(5);
  const valueRef = useRef();
  valueRef.current = value;

  return (
    <div className="card py-6 sm:text-base text-sm flex flex-col w-full mt-6">
      <h2>Tulis Review</h2>
      <div className="flex flex-row justify-between">
        <div className="mt-2">
          <ReactStars
            activeColor={"#ffc107"}
            color={"#e4e5e9"}
            size={20}
            emptyIcon={<FaStar />}
            filledIcon={<FaStar />}
            onChange={(event, newValue) => {
              setValue(newValue);
              // Get the latest state
              console.log(valueRef.current);
            }}
          />
        </div>
        <p className="mt-3">
          <DateToday />
        </p>
      </div>
      <form className="flex mt-2">
        <textarea
          id="description"
          required
          rows="3"
          placeholder="Tuliskan reviewmu di sini!"
          className="bg-greyscale rounded-2xl w-full px-6 py-3"
        ></textarea>
      </form>
      <div className="flex justify-end mt-3">
        <button className="btn-primary items-end">Kirim</button>
      </div>
    </div>
  );
}
