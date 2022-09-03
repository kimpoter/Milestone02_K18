import { showNotification } from "@mantine/notifications";
import { Modal } from "@mantine/core";
import { FaStar, FaTrash } from "react-icons/fa";
import axios from "../api/axios";
import { useState } from "react";

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
export function ReviewCard({ review, user, getReview }) {
  const [opened, setOpened] = useState(false);
  function deleteReview() {
    axios
      .delete(`/review/${review.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        },
      })
      .then((res) => {
        showNotification({
          title: "Success",
          message: "Your review has been deleted",
          styles: () => ({
            root: {
              "&::before": { backgroundColor: "green" },
            },
          }),
        });
        setOpened(false);
        window.location.reload();
      })
      .catch((err) => {
        showNotification({
          title: "Error",
          message: "Something went wrong. Failed to delete review",
          styles: () => ({
            root: {
              "&::before": { backgroundColor: "red" },
            },
          }),
        });
      });
  }
  return (
    <div className="card py-6 sm:text-base text-sm flex flex-col w-full mt-6">
      <Modal opened={opened} onClose={() => setOpened(false)} centered>
        <h2 className="text-center mb-8">Delete Review?</h2>
        <p className="text-center mb-8">
          Are you sure you want to delete your review? WARNING This action can't
          be undone
        </p>
        <div className="flex justify-between">
          <button className="btn-secondary">Cancel</button>
          <button
            className="btn-primary bg-red-500"
            onClick={() => {
              deleteReview();
            }}
          >
            Delete
          </button>
        </div>
      </Modal>
      {user && (
        <button
          onClick={() => setOpened(true)}
          className="flex justify-end mb-4 text-greyscale"
        >
          <FaTrash />
        </button>
      )}
      <div className="flex flex-row justify-between">
        <p>{formatTimeToDate(review.createdAt)}</p>
        <Rating rating={review.rating} />
      </div>
      <h2 className="sm:text-base text-sm mt-1">{review.user.username}</h2>
      <p>{review.content}</p>
    </div>
  );
}

function ReviewDisplay({ placeReview, userReview, getReview }) {
  return (
    <ul className="flex flex-col">
      {userReview !== null && (
        <div>
          <ReviewCard review={userReview} user getReview={getReview} />
        </div>
      )}
      {placeReview.map((review) => {
        if (userReview == null || review.id !== userReview.id) {
          return (
            <div key={review.id}>
              <ReviewCard review={review} />
            </div>
          );
        } else {
          return <></>;
        }
      })}
    </ul>
  );
}

export default ReviewDisplay;
