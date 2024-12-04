import React, { useState, useEffect } from 'react';
import football from '../assets/football.jpg'

const ImageCarousel = ({ images, alt, className }) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(intervalId);
    }, [images.length]);

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative w-full h-[500px] flex flex-col items-center">
            <div className="flex justify-center items-center h-full">
                <img
                    src={images[currentIndex] || football}
                    alt={alt}
                    className={`max-h-full max-w-full ${className}`}
                    onError={(e) => (e.target.src = football)}
                />
            </div>

            <div className="absolute bottom-4 flex justify-center space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-400'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;
