import { FaStar } from "react-icons/fa";
import {
  BsLink45Deg,
  BsFillBookmarkPlusFill,
  BsFillBookmarkFill,
} from "react-icons/bs";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import axios from "../api/axios";
import { showNotification } from "@mantine/notifications";

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

export function PreviewCard({ place }) {
  const [placeCategories, setPlaceCategories] = useState([]);

  useEffect(() => {
    place.categories.forEach((element) => {
      if (!placeCategories.includes(element.name)) {
        setPlaceCategories([...placeCategories, element.name]);
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="mx-2 shadow-xl bg-white px-4 py-4 mt-8 sm:w-[270px] w-[200px] sm:min-h-[270px] min-h-[200px] h-fit rounded-3xl relative hover:cursor-pointer">
      <img
        src={place.imageUrl ? place.imageUrl : "placeholder.jpg"}
        alt="placeholder"
        className="rounded-xl aspect-[4/3] object-cover"
      />
      <Rating
        position={"absolute top-6 right-6 z-1"}
        rating={place.rating !== null ? place.rating.toFixed(2) : 0.0}
      />
      <h2 className="mt-4">{place.name}</h2>
      <ul className="opacity-50">
        <li>{placeCategories.join(", ")}</li>
        <li>{place.address}</li>
        <li>
          {place.timeOpen} - {place.timeClose}
        </li>
      </ul>
    </div>
  );
}

export function DetailCard({ place }) {
  const { currentUser } = useContext(AuthContext);
  const [bookmarkState, setBookmarkState] = useState({ bookmarked: false });
  const [loading, setLoading] = useState(true);

  function handleAddBookmark() {
    setLoading(true);
    axios
      .post(
        `/bookmark`,
        { tempatMakanId: place.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setBookmarkState({ bookmarked: true });
        getBookmark();
        showNotification({
          title: "Success",
          message: "Successfully add place to bookmark",
          styles: () => ({
            root: {
              "&::before": { backgroundColor: "green" },
            },
          }),
        });
      })
      .catch((err) => {
        console.log(err);
        showNotification({
          title: "Error",
          message: "Failed to add place to bookmark",
          styles: () => ({
            root: {
              "&::before": { backgroundColor: "red" },
            },
          }),
        });
      })
      .finally(() => setLoading(false));
  }

  function handleDeleteBookmark() {
    setLoading(true);
    axios
      .delete(`/bookmark/${bookmarkState.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setBookmarkState({ bookmarked: false });
        showNotification({
          title: "Success",
          message: "Successfully remove place from bookmark",
          styles: () => ({
            root: {
              "&::before": { backgroundColor: "green" },
            },
          }),
        });
      })
      .catch((err) => {
        console.log(err);
        showNotification({
          title: "Error",
          message: "Failed to remove place from bookmark",
          styles: () => ({
            root: {
              "&::before": { backgroundColor: "red" },
            },
          }),
        });
      })
      .finally(() => setLoading(false));
  }

  function getBookmark() {
    setLoading(true);
    axios
      .get(`/bookmark`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        res.data.data.forEach((item) => {
          if (item.tempatMakanId === place.id) {
            setBookmarkState({ bookmarked: true, id: item.id });
            return;
          }
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    if (currentUser.loggedIn) {
      getBookmark();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="relative card w-full sm:text-base text-sm flex lg:flex-row flex-col">
      <img
        src={place.imageUrl ? place.imageUrl : "placeholder.jpg"}
        alt="placeholder"
        className="rounded-xl aspect-[4/3] object-cover w-[400px] mr-8"
      />
      {currentUser.loggedIn && (
        <button
          disabled={loading}
          onClick={
            bookmarkState.bookmarked ? handleDeleteBookmark : handleAddBookmark
          }
          className="absolute top-0 left-12 text-6xl"
        >
          {bookmarkState.bookmarked ? (
            <BsFillBookmarkFill />
          ) : (
            <BsFillBookmarkPlusFill />
          )}
        </button>
      )}
      <div className="space-y-2 lg:mt-0 mt-4">
        <div className="flex sm:flex-row flex-col sm:space-x-4 sm:space-y-0 space-y-2 sm:items-center">
          <Rating
            rating={place.rating !== null ? place.rating.toFixed(2) : 0.0}
          />
          <h1>{place.name}</h1>
        </div>
        <p>
          {place.timeOpen} - {place.timeClose}
        </p>
        <div className="flex flex-row space-x-2">
          <p>{place.address}</p>
          <p>|</p>
          {place.categories.map((element) => {
            return <p key={place.id}>{element.name}</p>;
          })}
        </div>
        <div className="flex flex-row items-center space-x-4 bg-greyscale px-6 py-2 rounded-lg w-full opacity-50">
          <BsLink45Deg />
          <a
            href={`https://maps.google.com/?q=${place.latitude},${place.longitude}`}
          >{`https://maps.google.com/?q=${place.latitude},${place.longitude}`}</a>
        </div>
        <h2>Deskripsi</h2>
        <p>{place.description}</p>
      </div>
    </div>
  );
}
