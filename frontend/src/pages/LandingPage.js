import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import FilterTab from "../components/FilterTab";
import PlaceDisplay from "../components/PlaceDisplay";

function LandingPage() {
    const [ filterDisplay, setFilterDisplay ] = useState(false);

    function handleFilterClick() {
        if (!filterDisplay) {
            window.scrollTo({
                top: 400,
                behavior: 'smooth',
            });
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
        }
        setFilterDisplay(!filterDisplay)
    }
    return (
        <div className="flex flex-col items-center text-lg text-primary">
            <div className="my-28 bg-gradient-to-r from-greyscale w-[220px] h-[220px] rounded-[48px] px-8 py-8 flex justify-center">
                <img src='logo.svg' alt='ITBFood logo' />
            </div>

            <div className="flex flex-row justify-between items-center space-x-4 w-[70vw]">
                <FaSearch />
                <form>
                    <input placeholder="Telusuri tempat makan di sekitarmu!" className="bg-greyscale rounded-2xl w-[60vw] px-6 py-2"></input>
                </form>
                <button onClick={handleFilterClick} className="btn-primary rounded-2xl px-8 py-2">Filter</button>
            </div>

            {filterDisplay && <FilterTab />}
            <div className="flex justify-center h-fit w-[70vw] bg-greyscale mt-12 py-12 rounded-t-[36px]">
                <div className="w-full px-12">
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-semibold">Rekomendasi Kami</h1>
                        <button className="btn-primary">Lihat Semua</button>
                    </div>
                    <PlaceDisplay place_data_url="http://localhost:8000/tempatMakan" />
                </div>
            </div>
        </div>
    );
};

export default LandingPage;