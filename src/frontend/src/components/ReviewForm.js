import { FaStar } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import { useRef, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";

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

export function ReviewForm({ id, getReview }) {
  const [rating, setRating] = useState(0);
  const contentRef = useRef();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleAddForm(e) {
    e.preventDefault();

    setLoading(true);
    axios
      .post(
        `/review/${id}`,
        JSON.stringify({
          tempatMakanId: id.toString(),
          content: contentRef.current.value,
          rating: rating,
        }),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        getReview();
        showNotification({
          title: "Success",
          message: "Your review has been added",
          styles: () => ({
            root: {
              "&::before": { backgroundColor: "green" },
            },
          }),
        });
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status === 401) {
          navigate(`/signin`);
          return;
        }
        showNotification({
          title: "Error",
          message:
            "You already add a review. Please delete it first before making another review.",
          styles: () => ({
            root: {
              "&::before": { backgroundColor: "red" },
            },
          }),
        });
      })
      .finally(() => setLoading(false));
  }
  return (
    <div className="card py-6 sm:text-base text-sm flex flex-col w-full mt-6">
      {!loading ? (
        <>
          <h2>Tulis Review</h2>
          <div className="flex flex-row justify-between">
            <div className="mt-2">
              <ReactStars
                activeColor={"#ffc107"}
                color={"#e4e5e9"}
                size={20}
                emptyIcon={<FaStar />}
                filledIcon={<FaStar />}
                onChange={(newRating) => {
                  setRating(newRating);
                  console.log(rating);
                }}
              />
            </div>
            <p className="mt-3">
              <DateToday />
            </p>
          </div>
          <form onSubmit={handleAddForm} className="flex mt-2">
            <div className="flex flex-col w-full">
              <textarea
                id="description"
                required
                rows="3"
                placeholder="Tuliskan reviewmu di sini!"
                className="bg-greyscale rounded-2xl w-full px-6 py-3"
                ref={contentRef}
                disabled={loading}
              ></textarea>
              <div className="flex justify-end mt-3">
                <button type="submit" className="btn-primary items-end">
                  Kirim
                </button>
              </div>
            </div>
          </form>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center space-y-6 h-[200px]">
          <div className="loading-spinner" />
        </div>
      )}
    </div>
  );
}
