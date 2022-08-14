import { useState } from "react";
import { FaSearch } from "react-icons/fa";
// import { PreviewCard } from "../components/PlaceCard";
import PlaceDisplay from "../components/PlaceDisplay";

export default function BookmarkPage() {
    const [ filterDisplay, setFilterDisplay ] = useState(false);
    const [ place, setPlace ] = useState( {
        imageUrl: 'https://cdn.pixabay.com/photo/2022/07/24/17/55/wind-energy-7342177_960_720.jpg',
        name: 'Crisbar',
        address: 'Jl. Cisitu Lama',
    } );
    const [ category, setCategory ] = useState('Ayam');

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
            {/* Filter Search */}
            <div className="flex flex-row my-16 justify-between items-center space-x-4 w-[70vw]">
                <FaSearch />
                <form>
                    <input placeholder="Telusuri tempat makan di sekitarmu!" className="bg-greyscale rounded-2xl w-[60vw] px-6 py-2"></input>
                </form>
                <button onClick={handleFilterClick} className="btn-primary rounded-2xl px-8 py-2">Filter</button>
            </div>

            {/* Main Bookmark */}
            <div className="bg-[#EFEFEF] w-full p-8 rounded-3xl">
                <h1 className='ml-16 my-3'>
                    Bookmark
                </h1>
                <div className="flex flex-wrap justify-center  w-full">
                    <PlaceDisplay place_data_url='http://localhost:8000/tempatMakan' />
                    <PlaceDisplay place_data_url='http://localhost:8000/tempatMakan' />
                    <PlaceDisplay place_data_url='http://localhost:8000/tempatMakan' />
                    <PlaceDisplay place_data_url='http://localhost:8000/tempatMakan' />
                    <PlaceDisplay place_data_url='http://localhost:8000/tempatMakan' />
                    <PlaceDisplay place_data_url='http://localhost:8000/tempatMakan' />
                    <PlaceDisplay place_data_url='http://localhost:8000/tempatMakan' />
                    <PlaceDisplay place_data_url='http://localhost:8000/tempatMakan' />
                    <PlaceDisplay place_data_url='http://localhost:8000/tempatMakan' />
                    <PlaceDisplay place_data_url='http://localhost:8000/tempatMakan' />
                    <PlaceDisplay place_data_url='http://localhost:8000/tempatMakan' />
                    <PlaceDisplay place_data_url='http://localhost:8000/tempatMakan' />
                </div>
            </div>
        </div>
    );  
}