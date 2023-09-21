import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {RootState} from '../../redux';
import {fetchMovieDetails, setSearchResults} from '../../redux/slices';
import {api} from '../../services';
import './SearchResults.css';

const SearchResults: React.FC = () => {
    const searchQuery = useSelector((state: RootState) => state.home.searchQuery);
    const isLightTheme = useSelector((state: RootState) => state.theme.isLightTheme);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(4);

    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                const totalPages = 1;

                const requests = Array.from({length: totalPages}, (_, index) =>
                    api.get('/movie/popular', {
                        params: {
                            page: index + 1,
                        },
                    })
                );

                const responses = await Promise.all(requests);
                const popularMovies = responses.flatMap((response) => response.data.results);

                dispatch(setSearchResults(popularMovies));
            } catch (error) {
                console.error('Error occurred during API request:', error);
            }
        };

        if (!searchQuery) {
            fetchPopularMovies();
        } else {
            dispatch(setSearchResults([]));
        }
    }, [dispatch, searchQuery]);

    const searchResults = useSelector((state: RootState) => state.home.searchResults);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? Math.ceil(searchResults.length / itemsPerPage) - 1 : prevIndex - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === Math.ceil(searchResults.length / itemsPerPage) - 1 ? 0 : prevIndex + 1));
    };

    const handleMovieClick = (movieId: string) => {
        dispatch(fetchMovieDetails(movieId) as any);
        navigate(`/movie-details/${movieId}`);
    };

    useEffect(() => {
        const updateItemsPerPage = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth >= 1200) {
                setItemsPerPage(5);
            } else if (screenWidth >= 992) {
                setItemsPerPage(4);
            } else if (screenWidth >= 768) {
                setItemsPerPage(3);
            } else if (screenWidth >= 450) {
                setItemsPerPage(2);
            } else {
                setItemsPerPage(1);
            }
        };

        updateItemsPerPage();
        window.addEventListener('resize', updateItemsPerPage);

        return () => {
            window.removeEventListener('resize', updateItemsPerPage);
        };
    }, []);

    const start = currentIndex * itemsPerPage;
    const end = start + itemsPerPage;
    const displayedMovies = searchResults.slice(start, end);

    return (
        <div className="wrapper">
            <div className="pagination">
                <button className="search-button" onClick={prevSlide}>
                    &lt;
                </button>
            </div>
            <div className={`search-results ${isLightTheme ? 'light-theme' : 'dark-theme'}`}>
                <div className="slide-container">
                    {displayedMovies.length > 0 ? (
                        displayedMovies.map((movie: any) => (
                            <div className="resultsDiv" key={movie.id} onClick={() => handleMovieClick(movie.id)}>
                                <img
                                    className={`movie-poster2 ${isLightTheme ? 'light-theme' : 'dark-theme'}`}
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="not-found">
                            <div className="not-found-2">No results found.</div>
                        </div>
                    )}
                </div>
            </div>
            <div className="pagination">
                <button className="search-button" onClick={nextSlide}>
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default SearchResults;













