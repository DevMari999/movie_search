import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import './Footer.css';

const Footer: React.FC = () => {
    const isLightTheme = useSelector((state: RootState) => state.theme.isLightTheme);

    return (
        <div className={`footer ${isLightTheme ? 'light-theme' : 'dark-theme'}`}>
            <div>Tetflix</div>
            <div>©2023 by tetflix.com, Inc.</div>
        </div>
    );
};

export default Footer;
