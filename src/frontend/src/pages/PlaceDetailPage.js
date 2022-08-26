import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { MenuContainer, MenuModal } from "../components/Menu";
import { DetailCard } from "../components/PlaceCard";
import ReviewDisplay from "../components/ReviewCard";
import { ReviewForm } from "../components/ReviewForm";

function PlaceDetailPage() {
  const { id } = useParams();
  const [placeData, setPlaceData] = useState(null);
  const [modalState, setModalState] = useState({ url: null });
  const [placeReview, setPlaceReview] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuUrl, setMenuUrl] = useState("placeholder.jpg");

  function getReview() {
    axios
      .get(`/review/${id}`)
      .then((res) => {
        console.log(res);
        setPlaceReview(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getMenuUrl() {
    axios
      .get(`/menu/${id}`)
      .then((res) => {
        console.log(res);
        setMenuUrl(res.data.data[0].imageUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/tempat-makan/${id}`)
      .then((res) => {
        console.log(res);
        setPlaceData(res.data.data);
        getReview();
        getMenuUrl();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {!loading ? (
        <div className="my-24">
          <div className="mt-12">
            <DetailCard place={placeData} />
          </div>

          <div className="flex flex-row flex-wrap">
            <div className="space-y-2 mr-20 mt-8">
              <h2>Cara Pembayaran</h2>
              <div className="flex flex-row space-x-2">
                {placeData.paymentMethods.map((method) => {
                  return <div className="chips-secondary">{method.name}</div>;
                })}
              </div>
            </div>
            <div className="space-y-2 mt-8">
              <h2>Platform Pembelian</h2>
              <div className="flex flex-row space-x-2">
                {placeData.platforms.length !== 0 ? (
                  placeData.platforms.map((platform) => {
                    return (
                      <div className="chips-secondary">{platform.name}</div>
                    );
                  })
                ) : (
                  <p>Tidak ada data</p>
                )}
              </div>
            </div>
          </div>

          {/* view menu */}
          {modalState.url && (
            <MenuModal
              closeModal={() => setModalState({ url: null })}
              menuImageUrl={modalState.url}
            />
          )}

          <div className="mt-8 space-y-2">
            <h2>Menu</h2>
            <button
              onClick={() =>
                setModalState({
                  url: menuUrl,
                })
              }
            >
              <MenuContainer menuImageUrl={menuUrl} />
            </button>
          </div>
          <div className="flex flex-col gap-3 mt-8 space-y-2">
            <h2>Review</h2>
            <ReviewForm id={id} />
            {placeReview.length !== 0 ? (
              <ReviewDisplay placeReview={placeReview} />
            ) : (
              <p>Tidak ada review</p>
            )}
          </div>
        </div>
      ) : (
        <div className="h-[80vh] flex flex-col justify-center items-center space-y-6">
          <div className="loading-spinner" />
          <p>Fetching data...</p>
        </div>
      )}
    </>
  );
}

export default PlaceDetailPage;
