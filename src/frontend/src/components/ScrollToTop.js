import { useEffect, useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';

function ScrollToTop() {
    const [ showTopBtn, setShowTopBtn ] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false)
            }
        });
    }, []);

    function goToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    };
    
    return (
        <button onClick={goToTop} className="bg-white text-secondary rounded-full text-[72px] font-semibold fixed bottom-12 right-12">
            {showTopBtn && <FaArrowCircleUp />}
        </button>
    )
};

export default ScrollToTop;