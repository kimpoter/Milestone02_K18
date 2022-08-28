import PlaceDisplay from "../components/PlaceDisplay";
import SearchFilter from "../components/SearchFilter";

function LandingPage() {
  return (
    <div className="flex flex-col items-center text-lg text-primary">
      <div className="my-28 bg-gradient-to-r from-greyscale h-[220px] w-[220px] rounded-[48px] px-8 py-8 flex justify-center items-center">
        <img
          src="https://i.ibb.co/6wLnW2V/Logo-ITBFood-1.png"
          alt="ITBFood logo"
          className="h-[150px]"
        />
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
