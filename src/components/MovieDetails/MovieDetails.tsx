import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails } from '../../redux/slices';
import { RootState, AppDispatch } from '../../redux';
import { posterBaseUrl } from '../../constants';
import './MovieDetails.css';
import RatingStars from 'react-rating-stars-component';
import { MoviesByGenre } from '../../components';
import background from "../../assets/genresbackground.png";

const MovieDetails: React.FC = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const movieDetails = useSelector((state: RootState) => state.movieDetails.details);
    const [clickedGenre, setClickedGenre] = useState<number | null>(null);
    const isLightTheme = useSelector((state: RootState) => state.theme.isLightTheme);

    useEffect(() => {
        if (movieId) {
            dispatch(fetchMovieDetails(movieId));
        }
    }, [dispatch, movieId]);

    const handleGenreClick = (genreId: number) => {
        setClickedGenre(genreId);
        navigate(`/movies/genre/${genreId}`);
    };

    if (!movieDetails) {
        return <div>Loading...</div>;
    }

    return (

        <div className={`movie-details ${isLightTheme ? 'light-theme' : 'dark-theme'}`}>
            <div className="background-img">
                <img src={background}/>
            </div>
            <div className={`movie-details-content ${isLightTheme ? 'light-theme' : 'dark-theme'}`}>
                <div className="poster-container">
                    <img
                        className="movie-poster"
                        src={`${posterBaseUrl}${movieDetails.poster_path}`}
                        alt={movieDetails.title}
                    />
                </div>
                <div className="description">
                   <div className="header-description"> <h1>{movieDetails.title}</h1></div>
                    <p>{movieDetails.overview}</p>
                    <div className="description-button-container">
                    {movieDetails.genres.map((genre) => (
                        <button
                            key={genre.id}
                            onClick={() => handleGenreClick(genre.id)}
                            className="general-button"
                        >
                            {genre.name}
                        </button>
                    ))}
                    </div>
                    <p>Language: {movieDetails.original_language}</p>
                    <p>Release Date: {movieDetails.release_date.slice(0, 4)}</p>
                    <RatingStars
                        value={movieDetails.vote_average / 2}
                        count={5}
                        size={24}
                        edit={false}
                    />

            </div>
            </div>
            {clickedGenre !== null && <MoviesByGenre />}
        </div>
    );
};

export default MovieDetails;





