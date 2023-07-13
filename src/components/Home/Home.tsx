import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setSearchResults } from '../../redux/slices';
import { RootState } from '../../redux';
import { api } from '../../services';
import { SearchResults } from '../../components';
import './Home.css';

const Home: React.FC = () => {
    const dispatch = useDispatch();
    const searchQuery = useSelector((state: RootState) => state.home.searchQuery);

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(e.target.value));
    };

    useEffect(() => {
        const fetchSearchResults = async () => {
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

        if (searchQuery) {
            fetchSearchResults();
        } else {
            dispatch(setSearchResults([]));
        }
    }, [dispatch, searchQuery]);

    return (
        <div className="home">
            <div className="input-container">
            <form className="search">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    placeholder="Search by movie name"
                />
            </form>
            </div>
            {searchQuery && <SearchResults />}
        </div>
    );
};

export default Home;




