import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {setHeaderVisibility} from '../../redux/slices';
import {RootState} from '../../redux';
import './Header.css';
import {toggleTheme} from '../../redux/slices/themeSlice';
import burger from '../../assets/burger.png';
import sun from "../../assets/sun.png";
import moon from "../../assets/moon.png";
const Header: React.FC = () => {
    const isHeaderVisible = useSelector((state: RootState) => state.header.isVisible);
    const isLightTheme = useSelector((state: RootState) => state.theme.isLightTheme);
    const dispatch = useDispatch();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen((prevIsOpen) => !prevIsOpen);
    };

    const handleNavigation = () => {
        setIsMobileMenuOpen(false); // Close mobile menu after navigation
    };

    return (
        <header
            className={`header ${isHeaderVisible ? 'visible' : ''} ${isLightTheme ? 'light-theme' : 'dark-theme'}`}
        >
            <div className="nav-div">
                <Link
                    to="/"
                    className={`nav-link ${isHeaderVisible ? 'visible' : ''} ${
                        isLightTheme ? 'light-theme' : 'dark-theme'
                    }`}
                    onClick={handleNavigation}
                >
                    HOME
                </Link>
                <Link
                    to="/movie-listing"
                    className={`nav-link ${isHeaderVisible ? 'visible' : ''} ${
                        isLightTheme ? 'light-theme' : 'dark-theme'
                    }`}
                    onClick={handleNavigation}
                >
                    ALL MOVIES
                </Link>
            </div>
            <button
                className={`themeToggle ${isLightTheme ? 'light-theme' : 'dark-theme'}`}
                onClick={handleThemeToggle}
            >
                {isLightTheme ? <img src={moon} alt="moon"/> : <img src={sun} alt="sun"/>}
            </button>
            <button className="mobileMenuToggle" onClick={handleMobileMenuToggle}>
                <img src={burger} alt="Menu"/>
            </button>
            {isMobileMenuOpen && (
                <div className={`mobileMenu ${isLightTheme ? 'light-theme' : 'dark-theme'}`}>
                    <Link to="/" className="mobileMenuItem" onClick={handleNavigation}>
                        HOME
                    </Link>
                    <Link to="/movie-listing" className="mobileMenuItem" onClick={handleNavigation}>
                        ALL MOVIES
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Header;



