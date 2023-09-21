import React from 'react';
import RatingStars from 'react-rating-stars-component';

interface StarRatingProps {
    value: number;
}

const StarRating: React.FC<StarRatingProps> = ({value}) => {
    const starRatingConfig = {
        size: 18,
        activeColor: '#c00e0e',
        color: '#ffffff',
        edit: false,
    };

    return <RatingStars value={value / 2} count={5} {...starRatingConfig} />;
};

export default StarRating;

