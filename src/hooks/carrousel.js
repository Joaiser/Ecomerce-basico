import { useState, useRef, useEffect } from 'react';

export const useCarousel = (totalSlides, initialIndex = 0) => {
    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [startX, setStartX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % totalSlides);
    }

    const prevSlide = () => {
        setCurrentIndex((currentIndex - 1 + totalSlides) % totalSlides);
    }

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.clientX);
    }

    const handleMouseUp = () => {
        setIsDragging(false);
    }

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const x = e.clientX;
        const walk = (x - startX);
        if (Math.abs(walk) > 50) {
            if (walk > 0) prevSlide();
            else nextSlide();
            setIsDragging(false);
        }
    }

    const handleDragStart = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        const carouselElement = carouselRef.current;
        if (!carouselElement) {
            return;
        }
        carouselElement.addEventListener('mousedown', handleMouseDown);
        carouselElement.addEventListener('dragstart', handleDragStart);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            carouselElement.removeEventListener('mousedown', handleMouseDown);
            carouselElement.removeEventListener('dragstart', handleDragStart);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
        }
    }, [currentIndex, totalSlides]);

    useEffect(() => {
        const carouselElement = carouselRef.current;
        if (!carouselElement) {
            return;
        }
        const totalWidth = Array.from(carouselElement.children).reduce((total, child) => {
            const style = window.getComputedStyle(child);
            const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
            return total + child.getBoundingClientRect().width + margin;
        }, 0);
        const averageSlideWidth = totalWidth / totalSlides;
        const transformValue = -currentIndex * averageSlideWidth;
        carouselElement.style.transform = `translateX(${transformValue}px)`;
    }, [currentIndex, totalSlides]);

    return { carouselRef, nextSlide, prevSlide };
}