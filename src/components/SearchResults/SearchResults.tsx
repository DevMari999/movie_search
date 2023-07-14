import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux';
import { fetchMovieDetails, setSearchResults } from '../../redux/slices';
import { api } from '../../services';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './SearchResults.css';

const SearchResults: React.FC = () => {
    const searchResults = useSelector((state: RootState) => state.home.searchResults);
    const searchQuery = useSelector((state: RootState) => state.home.searchQuery);
    const isLightTheme = useSelector((state: RootState) => state.theme.isLightTheme);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
    };

    const sliderClassName = `slider ${isLightTheme ? 'light-theme' : 'dark-theme'}`;

    const handleMovieClick = (movieId: string) => {
        dispatch(fetchMovieDetails(movieId) as any);
        navigate(`/movie-details/${movieId}`);
    };

    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                const response = await api.get('/movie/popular');
                const popularMovies = response.data.results;
                dispatch(setSearchResults(popularMovies));
            } catch (error) {
                console.error('Error occurred during API request:', error);
            }
        };

        fetchPopularMovies();
    }, [dispatch]);

    return (
        <div className={`search-results ${isLightTheme ? 'light-theme' : 'dark-theme'}`}>
            <Slider {...settings} className={sliderClassName}>
                {searchQuery
                    ? searchResults.map((movie: any) => (
                        <div className="resultsDiv" key={movie.id} onClick={() => handleMovieClick(movie.id)}>
                            <img
                                className={`movie-poster2 ${isLightTheme ? 'light-theme' : 'dark-theme'}`}
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                        </div>
                    ))
                    : searchResults.map((movie: any) => (
                        <div className="resultsDiv" key={movie.id} onClick={() => handleMovieClick(movie.id)}>
                            <img
                                className={`movie-poster2 ${isLightTheme ? 'light-theme' : 'dark-theme'}`}
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                        </div>
                    ))}
            </Slider>
        </div>
    );
};

export default SearchResults;






