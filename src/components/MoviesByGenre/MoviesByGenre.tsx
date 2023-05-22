import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMoviesByGenre, FetchMoviesByGenrePayload } from "../../redux/slices";
import { RootState, AppDispatch } from '../../redux';
import { Movie } from '../../types';
import { useParams } from 'react-router-dom';
import { MovieCard } from '../../components';
import './MoviesByGenre.css';

const MoviesByGenre: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { genreId } = useParams<{ genreId?: string }>();

    const movies = useSelector((state: RootState) => state.movies.data);
    const currentPage = useSelector((state: RootState) => state.movies.currentPage);
    const totalPages = useSelector((state: RootState) => state.movies.totalPages);
    const isLightTheme = useSelector((state: RootState) => state.theme.isLightTheme);

    useEffect(() => {
        if (genreId) {
            dispatch(fetchMoviesByGenre({ genreId: parseInt(genreId), page: 1 }));
        }
    }, [dispatch, genreId]);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            const nextPage: FetchMoviesByGenrePayload = { genreId: parseInt(genreId || ''), page: currentPage + 1 };
            dispatch(fetchMoviesByGenre(nextPage));
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            const previousPage: FetchMoviesByGenrePayload = { genreId: parseInt(genreId || ''), page: currentPage - 1 };
            dispatch(fetchMoviesByGenre(previousPage));
        }
    };


    if (genreId === undefined || movies.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`movieByGenre ${isLightTheme ? 'light-theme' : 'dark-theme'}`}>
            {movies.map((movie: Movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}

            <div className='pagination'>
                <button className='pagination-button' onClick={goToPreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <button className='pagination-button' onClick={goToNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>

        </div>
    );
};

export default MoviesByGenre;




