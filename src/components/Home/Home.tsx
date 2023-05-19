import React, {useEffect} from 'react';
import MovieListing from "../MovieListing/MovieListing";
import movieService from "../../services/api";
import {APIkey} from "../../services/keyServise";

const Home = () => {

    return (
        <div>
        <div className="banner-img">
            <MovieListing/>
        </div>
           </div>
    );
};

export default Home;