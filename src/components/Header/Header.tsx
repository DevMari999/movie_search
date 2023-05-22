import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setHeaderVisibility } from '../../redux/slices';
import { RootState} from '../../redux';
import './Header.css';
import {UserInfo} from '../../components';


const Header: React.FC = () => {
    const isHeaderVisible = useSelector((state: RootState) => state.header.isVisible);
    const dispatch = useDispatch();

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

    return (
        <header className={`header ${isHeaderVisible ? 'visible' : ''}`}>
            <Link to="/">
                <div className="logo">HOME</div>
            </Link>
            <Link to="/movie-listing">
                <button className="showAllMovies">Show All Movies</button>
            </Link>

            <UserInfo/>
        </header>
    );
};

export default Header;
