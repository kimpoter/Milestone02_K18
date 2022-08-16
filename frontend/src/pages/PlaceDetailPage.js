import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MenuContainer, MenuModal } from "../components/Menu";
import { DetailCard } from "../components/PlaceCard";
import ReviewDisplay from "../components/ReviewCard";
import { ReviewForm } from "../components/ReviewForm";

function PlaceDetailPage() {
  const { id } = useParams();
  const [placeData, setPlaceData] = useState(null);
  const [modalState, setModalState] = useState({ url: null });
  const [placeReview, setPlaceReview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [menuUrl, setMenuUrl] = useState("placeholder.jpg");

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_SERVER_URL}/tempat-makan/${id}`) // ini nanti harusnya ada url yang bakal langsung nge fetch data tempat makan sesuai id nya
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.status === "success") {
          setPlaceData(res.data);
        } else {
          window.alert(res.status);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/review/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.status === "success") {
          setPlaceReview(res.data);
        } else {
          window.alert(res.status);
        }
      });
  }, [id]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/menu/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        if (res.status === "success") {
          setMenuUrl(res.data[0].imageUrl);
        } else {
          window.alert(res.status);
        }
      });
  });

  return (
    <>
      {placeData && !loading ? (
        <div className="my-24">
          <div className="mt-12">
            <DetailCard place={placeData} />
          </div>
          <div className="flex flex-row space-x-20 mt-8">
            <div className="space-y-2">
              <h2>Cara Pembayaran</h2>
              <div className="flex flex-row space-x-2">
                {placeData.paymentMethods.length !== 0 ? (
                  placeData.paymentMethods.forEach((method) => {
                    return <div className="chips-secondary">{method}</div>;
                  })
                ) : (
                  <p>Tidak ada data</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <h2>Platform Pembelian</h2>
              <div className="flex flex-row space-x-2">
                {placeData.platforms.length !== 0 ? (
                  placeData.platforms.forEach((platform) => {
                    return <div className="chips-secondary">{platform}</div>;
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
            <ReviewForm />
            {placeReview.length !== 0 ? (
              <ReviewDisplay placeReview={placeReview} />
            ) : (
              <p>Tidak ada review</p>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full text-center mt-64">
          {loading ? <h3>Loading...</h3> : <h3>No Data Available Right Now</h3>}
        </div>
      )}
    </>
  );
}

export default PlaceDetailPage;
