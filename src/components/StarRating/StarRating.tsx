import React from 'react';
import RatingStars from 'react-rating-stars-component';
import './StarRating.css'

interface StarRatingProps {
    value: number;
}

const StarRating: React.FC<StarRatingProps> = ({ value }) => {
    return (
        <RatingStars
            value={value / 2}
            count={5}
            size={24}
            activeColor="#ffd700"
            edit={false}
        />
    );
};

export default StarRating;