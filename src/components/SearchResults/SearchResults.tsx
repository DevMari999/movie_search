import React, { useEffect, useState } from 'react';
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
    const searchQuery = useSelector((state: RootState) => state.home.searchQuery);
    const isLightTheme = useSelector((state: RootState) => state.theme.isLightTheme);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [slidesToShow, setSlidesToShow] = useState(4);

    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                let allPopularMovies: any[] = [];

                if (!searchQuery) {
                    let page = 1;

                    while (allPopularMovies.length < 20) {
                        const response = await api.get('/movie/popular', {
                            params: {
                                page: page,
                            },
                        });

                        const popularMovies = response.data.results;
                        allPopularMovies = [...allPopularMovies, ...popularMovies];

                        page++;
                    }
                }

                dispatch(setSearchResults(allPopularMovies));
            } catch (error) {
                console.error('Error occurred during API request:', error);
            }
        };

        fetchPopularMovies();
    }, [dispatch, searchQuery]);


    useEffect(() => {
        const updateSlidesToShow = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth >= 1200) {
                setSlidesToShow(4);
            } else if (screenWidth >= 992) {
                setSlidesToShow(3);
            } else if (screenWidth >= 768) {
                setSlidesToShow(3);
            } else if (screenWidth >= 458) {
                setSlidesToShow(2);
            } else {
                setSlidesToShow(1);
            }
        };

        updateSlidesToShow();
        window.addEventListener('resize', updateSlidesToShow);

        return () => {
            window.removeEventListener('resize', updateSlidesToShow);
        };
    }, []);

    const searchResults = useSelector((state: RootState) => state.home.searchResults);

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToShow,
    };

    const sliderClassName = `slider ${isLightTheme ? 'light-theme' : 'dark-theme'}`;

    const handleMovieClick = (movieId: string) => {
        dispatch(fetchMovieDetails(movieId) as any);
        navigate(`/movie-details/${movieId}`);
    };

    return (
        <div className={`search-results ${isLightTheme ? 'light-theme' : 'dark-theme'}`}>
            <Slider {...sliderSettings} className={sliderClassName}>
                {searchResults.map((movie: any) => (
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










