import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Movie } from '../../types';
import { StarRating } from '../../components';
import './MovieCard.css';
import { posterBaseUrl } from '../../constants';
import { RootState } from '../../redux';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const navigate = useNavigate();
    const isLightTheme = useSelector((state: RootState) => state.theme.isLightTheme);

    const handleMovieClick = () => {
        navigate(`/movie-details/${movie.id}`);
    };

    return (
        <div className={`movie-card ${isLightTheme ? 'light-theme' : 'dark-theme'}`} onClick={handleMovieClick}>
            <img
                className="movie-poster"
                src={`${posterBaseUrl}${movie.poster_path}`}
                alt={movie.title}
            />
            <h2>{movie.title}</h2>
            {movie.release_date && <p>Release Date: {movie.release_date.slice(0, 4)}</p>}
            <p>{movie.overview.length > 100 ? `${movie.overview.slice(0, 100)}...` : movie.overview}</p>
            <StarRating value={movie.vote_average} />
        </div>
    );
};

export default MovieCard;
