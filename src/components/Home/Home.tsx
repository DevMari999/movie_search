import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setSearchQuery, setSearchResults} from "../../redux/slices";
import { RootState } from '../../redux';

import { api } from '../../services';
import {SearchResults} from '../../components';

import './Home.css';

const Home: React.FC = () => {
    const dispatch = useDispatch();
    const searchQuery = useSelector((state: RootState) => state.home.searchQuery);

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(e.target.value));
    };

    const handleSearchSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.get('/search/movie', {
                params: {
                    query: searchQuery,
                },
            });

            const results = response.data.results;
            dispatch(setSearchResults(results));
        } catch (error) {
            console.error('Error occurred during API request:', error);
        }
    };

    return (
        <div className="home">
            <form className="search" onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    placeholder="Search by movie name"
                />
                <button type="submit">Search</button>
            </form>

            {searchQuery && <SearchResults />}

        </div>
    );
};

export default Home;


