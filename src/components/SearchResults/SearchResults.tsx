import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './SearchResults.css';

const SearchResults: React.FC = () => {
    const searchResults = useSelector((state: RootState) => state.home.searchResults);
    const isLightTheme = useSelector((state: RootState) => state.theme.isLightTheme);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
    };

    const sliderClassName = `slider ${isLightTheme ? 'light-theme' : 'dark-theme'}`;

    return (
        <div className={`search-results ${isLightTheme ? 'light-theme' : 'dark-theme'}`}>
            <Slider {...settings} className={sliderClassName}>
                {searchResults.map((movie: any) => (
                    <div className="resultsDiv" key={movie.id}>
                        <img
                            className="movie-poster2"
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default SearchResults;

