import { PreviewCard } from "./ItemCard"

function ItemDisplay() {
    return (
        <div className="flex justify-center h-fit -z-[2] w-screen bg-greyscale mt-12 py-12 rounded-t-[36px]">
            <div className="w-[70vw]">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-semibold">Rekomendasi Kami</h1>
                    <button className="btn-primary">Lihat Semua</button>
                </div>
                <ul className="flex flex-row flex-wrap justify-center space-x-6">
                    <PreviewCard />
                    <PreviewCard />
                    <PreviewCard />
                    <PreviewCard />
                    <PreviewCard />
                    <PreviewCard />
                </ul>
            </div>
        </div>
    )
};

export default ItemDisplay;