import React, { useEffect, useState } from 'react';
import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux';
import { Genre } from "../../types";
import {api} from "../../services";



import './Genres.css';

const Genres: React.FC = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const isLightTheme = useSelector((state: RootState) => state.theme.isLightTheme);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await api.get('/genre/movie/list');
                setGenres(response.data.genres);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch genres:', error);
                setLoading(false);
            }
        };

        fetchGenres();
    }, []);

    const handleGenreClick = (genreId: number) => {
        navigate(`/movies/genre/${genreId}`);
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    const containerClassName = `genres ${isLightTheme ? 'light-theme' : 'dark-theme'}`;

    return (
        <div className={containerClassName}>

            {genres.map((genre: Genre) => (
                <button className="genresButton" key={genre.id} onClick={() => handleGenreClick(genre.id)}>
                    {genre.name}
                </button>
            ))}
        </div>
    );
};

export default Genres;

