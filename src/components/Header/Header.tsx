import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
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

    return (
        <header className={`header ${isHeaderVisible ? 'visible' : ''} ${isLightTheme ? 'light-theme' : 'dark-theme'}`}>
            <div className="nav-div">
            <Link to="/" className={`nav-link ${isHeaderVisible ? 'visible' : ''} ${isLightTheme ? 'light-theme' : 'dark-theme'}`}>
                HOME
            </Link>
            <Link to="/movie-listing" className={`nav-link ${isHeaderVisible ? 'visible' : ''} ${isLightTheme ? 'light-theme' : 'dark-theme'}`}>
                ALL MOVIES
            </Link>
            <Link to="/genres" className={`nav-link ${isHeaderVisible ? 'visible' : ''} ${isLightTheme ? 'light-theme' : 'dark-theme'}`}>
                BY GENRES
            </Link>
            </div>
            <button className={`themeToggle ${isLightTheme ? 'light-theme' : 'dark-theme'}`} onClick={handleThemeToggle}>
                {isLightTheme ? '🌙' : '☀️'}
            </button>
            {/*<UserInfo />*/}
        </header>
    );
};

export default Header;


