import React from 'react';
import {useEffect, useState} from "react";
import MovieCard from "../MovieCard/MovieCard";
import api from "../../services/api";

import "./MovieListing.scss"

const MovieListing = () => {
    const [movies, setMovies] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        api.get('/movie/now_playing', { params: { page: currentPage } })
            .then((response) => {
                const newMovies = response.data.results;
                setMovies(newMovies);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [currentPage]);

    const goToNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
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
                <button className="pagination-button" onClick={goToNextPage}>Next</button>
            </div>
        </div>
    );
};

export default MovieListing;