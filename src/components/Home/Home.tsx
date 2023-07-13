import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setSearchResults } from '../../redux/slices';
import { RootState } from '../../redux';
import { api } from '../../services';
import { SearchResults } from '../../components';
import './Home.css';

const Home: React.FC = () => {
    const dispatch = useDispatch();
    const searchQuery = useSelector((state: RootState) => state.home.searchQuery);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isInputClicked, setIsInputClicked] = useState(false);

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(e.target.value));
    };

    const handleInputInteraction = () => {
        setIsInputClicked(true);
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

    useEffect(() => {
        if (isInputClicked && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isInputClicked]);

    return (
        <div className="home">
            <div className="input-container">
                <form className="search">
                    <input
                        ref={inputRef}
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        onTouchStart={handleInputInteraction}
                        onFocus={handleInputInteraction}
                        placeholder="Search by movie name"
                        className={isInputClicked ? 'clicked' : ''}
                    />
                </form>
            </div>
            {searchQuery && <SearchResults />}
        </div>
    );
};

export default Home;






