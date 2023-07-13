import React from 'react';
import RatingStars from 'react-rating-stars-component';

interface StarRatingProps {
    value: number;
}

const StarRating: React.FC<StarRatingProps> = ({ value }) => {
    const starRatingConfig = {
        size: 18, // Adjust the size to make the stars smaller
        activeColor: '#c00e0e', // Set the color of the active stars to white
        color: '#ffffff', // Set the color of the inactive stars to white
        edit: false,
    };

    return <RatingStars value={value / 2} count={5} {...starRatingConfig} />;
};

export default StarRating;

