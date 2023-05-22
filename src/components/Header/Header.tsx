import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setHeaderVisibility } from '../../redux/slices';
import { RootState } from '../../redux';
import './Header.css';
import { UserInfo } from '../../components';
import { toggleTheme } from '../../redux/slices/themeSlice';
import {useNavigate} from "react-router-dom";

const Header: React.FC = () => {
    const isHeaderVisible = useSelector((state: RootState) => state.header.isVisible);
    const isLightTheme = useSelector((state: RootState) => state.theme.isLightTheme);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        let prevScrollPos = window.pageYOffset;
        let ticking = false;

        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const isScrollingUp = prevScrollPos > currentScrollPos;
                    dispatch(setHeaderVisibility(isScrollingUp || currentScrollPos === 0));
                    prevScrollPos = currentScrollPos;
                    ticking = false;
                });

                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [dispatch]);

    const handleThemeToggle = () => {
        dispatch(toggleTheme());
    };

    const handleSearchByGenres = () => {
        navigate('/genres');
    };

    return (
        <header className={`header ${isHeaderVisible ? 'visible' : ''} ${isLightTheme ? 'light-theme' : 'dark-theme'}`}>
            <Link to="/">
                <div className="logo">HOME</div>
            </Link>
            <Link to="/movie-listing">
                <button className="showAllMovies">Show All Movies</button>
            </Link>
            <button className={`themeToggle ${isLightTheme ? 'light-theme' : 'dark-theme'}`} onClick={handleThemeToggle}>
                {isLightTheme ? '🌙' : '☀️'}
            </button>
            <button className="searchByGenresButton" onClick={handleSearchByGenres}>
                Search by Genres
            </button>
            <UserInfo />
        </header>
    );
};

export default Header;


