import React from 'react';
import {Movie} from "../../types/types";
import "./MovieCard.scss"

interface MovieCardProps {
    movie: Movie;
}
const posterBaseUrl = 'https://image.tmdb.org/t/p/w500';
const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {

    console.log(movie)
    return (
        <div className="movie-card">
            <img
                className="movie-poster"
                src={`${posterBaseUrl}${movie.poster_path}`}
                alt={movie.title}
            />
            <h2>{movie.title}</h2>
            <p>Release Date: {movie.release_date}</p>
            <p>{movie.overview}</p>
        </div>
    );
};

export default MovieCard;