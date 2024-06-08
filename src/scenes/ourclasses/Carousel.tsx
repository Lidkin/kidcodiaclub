// src/components/Carousel.tsx
import React, { useRef, useState, useEffect } from 'react';

interface CarouselProps {
    children: React.ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollToIndex = (index: number) => {
        if (carouselRef.current) {
            const child = carouselRef.current.children[index] as HTMLElement;
            const containerWidth = carouselRef.current.clientWidth;
            const childWidth = child.clientWidth;
            const scrollLeft = child.offsetLeft - (containerWidth / 2) + (childWidth / 2);
            carouselRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' });
            setCurrentIndex(index);
        }
    };

    const handleNext = () => {
        if (currentIndex < children.length - 1) {
            scrollToIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            scrollToIndex(currentIndex - 1);
        }
    };

    useEffect(() => {
        scrollToIndex(currentIndex);
    }, []);

    return (
        <div className="px-12 relative w-full max-w-3xl mx-auto overflow-hidden">
            <div
                ref={carouselRef}
                className="flex overflow-x-scroll scroll-smooth scrollbar-hide space-x-4"
            >
                {React.Children.map(children, (child, index) => (
                    <div key={index} className="w-min flex-shrink-0">
                        {child}
                    </div>
                ))}
            </div>
            {currentIndex > 0 && (
                <button
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white text-black px-4 py-2 z-[100]"
                    onClick={handlePrev}
                >
                    Prev
                </button>
            )}
            {currentIndex < children.length - 1 && (
                <button
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white text-black px-4 py-2 z-[100]"
                    onClick={handleNext}
                >
                    Next
                </button>
            )}
        </div>
    );
};

export default Carousel;
