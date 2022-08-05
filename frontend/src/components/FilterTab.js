import { useReducer, useState } from "react";
import Filter from "./filter";

const initialState = Filter;

const ACTIONS = {
    SELECT_ON: 'select-on',
};

const FILTER = {
    TAG: Filter.tag.name,
    PAYMENT_METHOD: Filter.payment_method.name,
    PRICE_RANGE: Filter.price_range.name,
    PLATFORM: Filter.platform.name,
};

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.SELECT_ON:
            return { ...state };
        default:
            return state;
    };
};

function FilterTab() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    function selectFilter(filter, index) {
        switch (filter) {
            case FILTER.TAG:
                state.tag.items[index].flag = !state.tag.items[index].flag;
                break
            case FILTER.PAYMENT_METHOD:
                state.payment_method.items[index].flag = !state.payment_method.items[index].flag;
                break
            case FILTER.PRICE_RANGE:
                setMinPrice('');
                setMaxPrice('');
                state.price_range.items[index].flag = !state.price_range.items[index].flag;
                state.price_range.items.forEach((item, idx) => {
                    if (idx !== index) {
                        item.flag = false
                    } 
                })
                break
            case FILTER.PLATFORM:
                state.platform.items[index].flag = !state.platform.items[index].flag;
                break
            default:
                console.log(new Error())
        };

        dispatch({
            type: ACTIONS.SELECT_ON
        });
    };

    function handleMinPrice(e) {
        setMinPrice(e.target.value)
        state.price_range.items.forEach((item) => {
            item.flag = false
        })
    };

    function handleMaxPrice(e) {
        setMaxPrice(e.target.value)
        state.price_range.items.forEach((item) => {
            item.flag = false
        })
    };

    function handleApplyFilter() {
        console.log({...state})
        console.log('min price', minPrice)
        console.log('max price', maxPrice)
    };

    return (
        <div className="w-[70vw] my-6 bg-greyscale px-8 py-6 rounded-2xl space-y-8">
            {Object.entries(state).map(([key, value]) => {
                return (
                <div key={key}>
                    <label className="font-semibold text-xl">{value.name}</label>
                    {value.name === FILTER.PRICE_RANGE && 
                    <form className="space-x-2 mt-4">
                        <input type="number" placeholder="Min." value={minPrice} onChange={handleMinPrice} min="0" max="999999" className="chips-secondary w-[150px]"/>
                        <span>-</span>
                        <input type="number" placeholder="Maks." value={maxPrice} onChange={handleMaxPrice} min="0" max="999999" className="chips-secondary w-[150px]"/>
                    </form>
                    }
                    <ul className="flex flex-row flex-wrap items-center space-x-2 mt-4">
                    {value.items.map((item, index) => {
                        return (
                        <button key={index} onClick={() => selectFilter(value.name, index)} className={item.flag ? "chips-primary" : "chips-secondary"}>
                            {item.title}
                        </button>
                        )
                    })}
                    </ul>
                </div>
                );
            })};

            <div className="flex justify-end w-full">
                <button onClick={handleApplyFilter} className="btn-primary items-end">Terapkan Filter</button>
            </div>
        </div>
    );
};

export default FilterTab;