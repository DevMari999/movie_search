import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setSearchResults } from '../../redux/slices';
import { RootState } from '../../redux';
import { api } from '../../services';
import { SearchResults } from '../../components';
import { toggleTheme } from '../../redux/slices/themeSlice';
import './Home.css';
import poster from '../../assets/poster2.png';

const Home: React.FC = () => {
    const dispatch = useDispatch();
    const searchQuery = useSelector((state: RootState) => state.home.searchQuery);
    const isLightTheme = useSelector((state: RootState) => state.theme.isLightTheme);

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(e.target.value));
    };

    const handleThemeToggle = () => {
        dispatch(toggleTheme());
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
        <div className={`home ${isLightTheme ? 'light-theme' : 'dark-theme'}`}>
            {/*<div className="poster-img">*/}
            {/*    <img  src={poster}/>*/}
            {/*</div>*/}

            <div className="input-container">
                <form className="search">
                    <div className="input-div">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            placeholder="Search by movie name"
                        />
                    </div>
                </form>
            </div>
            {searchQuery && <SearchResults />}
        </div>
    );
};

export default Home;





