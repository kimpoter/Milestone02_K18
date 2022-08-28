import PlaceDisplay from "../components/PlaceDisplay";
import SearchFilter from "../components/SearchFilter";

function LandingPage() {
  return (
    <div className="flex flex-col items-center text-lg text-primary">
      <div className="my-28 bg-gradient-to-r from-greyscale w-[220px] h-[220px] rounded-[48px] px-8 py-8 flex justify-center">
        <img src="logo.svg" alt="ITBFood logo" />
      </div>

      <SearchFilter />
      <div className="flex justify-center w-[70vw] bg-greyscale mt-12 py-12 rounded-t-[36px]">
        <div className="w-full px-12">
          <div className="flex justify-start">
            <h1 className="text-3xl font-semibold">Rekomendasi Kami</h1>
          </div>
          <PlaceDisplay />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
