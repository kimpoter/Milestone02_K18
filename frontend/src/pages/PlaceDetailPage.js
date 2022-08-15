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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_SERVER_URL}/tempat-makan/${id}`) // ini nanti harusnya ada url yang bakal langsung nge fetch data tempat makan sesuai id nya
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);

        if (res.status === "success") {
          setPlaceData(res.data);
        } else {
          window.alert(res.status);
        }
      })
      .finally(() => setLoading(true));
  }, [id]);

  return (
    <>
      {placeData && (
        <div>
          <div className="mt-12">
            <DetailCard place={placeData} />
          </div>
          <div className="flex flex-row space-x-20 mt-8">
            <div className="space-y-2">
              <h2>Cara Pembayaran</h2>
              <div className="flex flex-row space-x-2">
                {placeData.paymentMethods ? (
                  placeData.paymentMethods.forEach((method) => {
                    return <div className="chips-secondary">{method}</div>;
                  })
                ) : (
                  <div>Tidak ada data</div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <h2>Platform Pembelian</h2>
              <div className="flex flex-row space-x-2">
                {placeData.platforms ? (
                  placeData.platforms.forEach((platform) => {
                    return <div className="chips-secondary">{platform}</div>;
                  })
                ) : (
                  <div>Tidak ada data</div>
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
                  url: "http://infohargamenu.com/wp-content/uploads/2017/11/Menu-Reguler-McD.jpg",
                })
              }
            >
              <MenuContainer menuImageUrl="http://infohargamenu.com/wp-content/uploads/2017/11/Menu-Reguler-McD.jpg" />
            </button>
          </div>
          {/*<div className="flex flex-col gap-3 mt-8 space-y-2">
            <h2>Review</h2>
            <ReviewForm />
            <ReviewDisplay id={id} />
          </div>*/}
        </div>
      )}
    </>
  );
}

export default PlaceDetailPage;
