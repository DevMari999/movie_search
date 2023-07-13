import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMoviesByGenre, FetchMoviesByGenrePayload } from "../../redux/slices";
import { RootState, AppDispatch } from '../../redux';
import { Movie } from '../../types';
import { useParams } from 'react-router-dom';
import { MovieCard } from '../../components';
import './MoviesByGenre.css';
import '../../styles/common.css';

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
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            const previousPage: FetchMoviesByGenrePayload = { genreId: parseInt(genreId || ''), page: currentPage - 1 };
            dispatch(fetchMoviesByGenre(previousPage));
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
        }
    };


    if (genreId === undefined || movies.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`movieByGenre ${isLightTheme ? 'light-theme' : 'dark-theme'}`}>
            <div className="movieByGenre-container">
                {movies.map((movie: Movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}

                <div className='pagination'>
                    <button className='general-button' onClick={goToPreviousPage} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <button className='general-button' onClick={goToNextPage} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MoviesByGenre;




