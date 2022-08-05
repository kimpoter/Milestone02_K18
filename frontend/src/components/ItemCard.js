import { FaStar } from "react-icons/fa";

export function PreviewCard() {
    return (
        <div className="shadow-md -z-[1] bg-white px-4 py-4 mt-8 w-[270px] min-h-[270px] rounded-3xl relative">
            <img src="placeholder.jpg" alt="placeholder" className="rounded-xl" />
            <div className="flex flex-row items-center space-x-2 bg-[#F2BE22] w-fit px-3 text-white rounded-lg absolute top-6 right-6 z-1"><FaStar /><span>4.8</span></div>
            <h2 className="font-semibold mt-4">Ayam Rempah Cisitu</h2>
            <ul className="opacity-50">
                <li>Ayam, Nasi, Fast Food</li>
                <li>Jl. Cisitu Indah</li>
                <li>08.00 - 23.59</li>
            </ul>
        </div>
    )
};