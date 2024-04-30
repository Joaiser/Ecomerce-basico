import { useState, useRef, useLayoutEffect } from 'react';

export const useCarousel = (initialIndex = 0) => {
    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [showCarousel, setShowCarousel] = useState(false);

    const nextSlide = () => {
        setShowCarousel(true);
        if (currentIndex < 3) {
            setCurrentIndex(currentIndex + 2);
        } else {
            setCurrentIndex(0); // Vuelve al inicio cuando llega al final
        }
    }
    
    const prevSlide = () => {
        setShowCarousel(true);
        if (currentIndex > 2) {
            setCurrentIndex(currentIndex - 1);
        } else {
            setCurrentIndex(0); 
        }
    }

    useLayoutEffect(() => {
        const updateCarousel = () => {
            const slideWidth = carouselRef.current.children[0].getBoundingClientRect().width;
            const transformValue = -currentIndex * slideWidth;
            carouselRef.current.style.transform = `translateX(${transformValue}px)`;
        }
        updateCarousel();
    }, [currentIndex]);

    return { carouselRef, nextSlide, prevSlide };
}