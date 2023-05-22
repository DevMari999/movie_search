import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { setMovies, setCurrentPage} from "../../redux/slices";
import {api} from '../../services';
import {MovieCard} from '../../components';

import './MovieListing.css';

const MovieListing: React.FC = () => {
    const dispatch = useDispatch();
    const { movies, currentPage } = useSelector((state: RootState) => state.movieListing);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await api.get('/movie/now_playing', { params: { page: currentPage } });
                const newMovies = response.data.results;
                dispatch(setMovies(newMovies));
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovies();
    }, [currentPage, dispatch]);

    const goToNextPage = () => {
        dispatch(setCurrentPage(currentPage + 1));
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            dispatch(setCurrentPage(currentPage - 1));
        }
    };

    return (
        <div className="movie-listing">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
            <div className="pagination">
                <button className="pagination-button" onClick={goToPreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <button className="pagination-button" onClick={goToNextPage}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default MovieListing;

