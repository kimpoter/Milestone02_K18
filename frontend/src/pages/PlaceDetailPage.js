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

  useEffect(() => {
    fetch("http://localhost:8000/tempatMakan") // ini nanti harusnya ada url yang bakal langsung nge fetch data tempat makan sesuai id nya
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((element) => {
          if (element.id == id) {
            setPlaceData(element);
            return;
          }
        });
      });
  }, []);

  return (
    <>
      {placeData && (
        <div>
          <div className="mt-12">
            <DetailCard
              place={placeData}
              category={["Fast Food", "Ayam", "Sapi", "Burger"]} // masih hard code, nanti ganti
            />
          </div>
          <div className="flex flex-row space-x-20 mt-8">
            <div className="space-y-2">
              <h2>Cara Pembayaran</h2>
              <div className="flex flex-row space-x-2">
                {Object.keys(placeData.paymentMethods).map((method, index) => {
                  if (placeData.paymentMethods[method]) {
                    return (
                      <div key={index} className="chips-secondary">
                        {method}
                      </div>
                    );
                  } else {
                    return <></>;
                  }
                })}
              </div>
            </div>
            <div className="space-y-2">
              <h2>Platform Pembelian</h2>
              <div className="flex flex-row space-x-2">
                {Object.keys(placeData.platform).map((item, index) => {
                  if (placeData.platform[item]) {
                    return (
                      <div key={index} className="chips-secondary">
                        {item}
                      </div>
                    );
                  } else {
                    return <></>;
                  }
                })}
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
          <div className="flex flex-col gap-3 mt-8 space-y-2">
            <h2>Review</h2>
            <ReviewForm/>
            <ReviewDisplay id={id}/>
          </div>
        </div>
      )}
    </>
  );
}

export default PlaceDetailPage;
