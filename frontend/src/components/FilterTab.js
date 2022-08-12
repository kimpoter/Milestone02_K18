import { useEffect, useState } from "react";

// formatting
function ArrayToFilterTab({ title, array }) {
    return (
        <div>
            <label className="font-semibold sm:text-xl text-lg">{title}</label>
            <ul className="flex flex-row flex-wrap items-center mr-2 mt-4">
            {Array.isArray(array) && array.map((element, index) => {
                return (
                <button key={index} className={element.selected ? "chips-primary mt-2 mr-2" : "chips-secondary mt-2 mr-2"}>
                    {element.name}
                </button>
                )
            })}
            </ul>
        </div>
    )
}

const initialPriceRange = [{
    name: '0 - 10K',
    min: 0,
    max: 10000,
    selected: false
},{
    name: '10K - 20K',
    min: 10000,
    max: 20000,
    selected: false
},{
    name: '20K - 30K',
    min: 20000,
    max: 30000,
    selected: false
},{
    name: '30K - 40K',
    min: 30000,
    max: 40000,
    selected: false
},{
    name: '40K - 50K',
    min: 40000,
    max: 50000,
    selected: false
},{
    name: '50K - 60K',
    min: 50000,
    max: 999999,
    selected: false
}]

function FilterTab() {
    const [ categories, setCategories ] = useState(null)
    const [ paymentMethods, setPaymentMethods ] = useState(null)
    const [ platforms, setPlatforms ] = useState([])
    const [ priceRange, setPriceRange ] = useState(initialPriceRange)
    
    useEffect(() => {
        fetch("http://localhost:8000/tempatMakan")
        .then((res) => {
            return res.json()
        }).then((data) => {
            const newPaymentMethods = []
            Object.keys(data[0].paymentMethods).map((accumulator, key) => {
                const paymentMethod = {}
                paymentMethod.name = accumulator
                paymentMethod.selected = false
                return newPaymentMethods.push(paymentMethod)
              });

            const newPlatforms = []
            Object.keys(data[0].platform).map((accumulator, key) => {
                const platform = {}
                platform.name = accumulator
                platform.selected = false
                return newPlatforms.push(platform)
            });

            setPaymentMethods(newPaymentMethods)
            setPlatforms(newPlatforms)
        })
    },[])

    useEffect(() => {
        fetch("http://localhost:8000/category")
        .then((res) => {
            return res.json()
        }).then((data) => {
            const newCategories = []
            data.forEach(category => {
                category.selected = false
                newCategories.push(category)
            })

            setCategories(newCategories)
        })
    },[])

    return (
        <div className="w-[70vw] my-6 bg-greyscale px-8 py-6 rounded-2xl space-y-8 sm:text-lg text-sm">
            <ArrayToFilterTab title="Kategori" array={categories} />
            <ArrayToFilterTab title="Cara Pembayaran" array={paymentMethods} />
            <div>
                <label className="font-semibold sm:text-xl text-lg">Harga</label>
                <form className="mt-4">
                    <input type="number" placeholder="Min." min="0" max="999999" className="chips-secondary sm:w-[150px] w-[80px]"/>
                    <span className="px-1">-</span>
                    <input type="number" placeholder="Maks." min="0" max="999999" className="chips-secondary sm:w-[150px] w-[80px]"/>
                </form>
                <ArrayToFilterTab title="" array={priceRange} />
            </div>
            <ArrayToFilterTab title="Platform Pembelian" array={platforms} />

            <div className="flex justify-end w-full">
                <button className="btn-primary items-end">Terapkan Filter</button>
            </div>
        </div>
    );
};

export default FilterTab;