import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import './Footer.css';
import tmdb from '../../assets/tmdb.png';

const Footer: React.FC = () => {
    const isLightTheme = useSelector((state: RootState) => state.theme.isLightTheme);

    return (
        <div className={`footer ${isLightTheme ? 'light-theme' : 'dark-theme'}`}>
            <div className="footer-text">
                <img src={tmdb}/>
                <div>This product uses the TMDB API but is not endorsed or certified by TMDB.</div>
            </div>
        </div>
    );
};

export default Footer;
