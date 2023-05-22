import { Route, Routes } from 'react-router-dom';
import { Home, MovieListing, MovieDetails, MoviesByGenre, Genres, PageNotFound, Header, Footer } from './components';

import './App.css';

const App: React.FC = () => {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie-listing" element={<MovieListing />} />
                <Route path="/movie-details/:movieId" element={<MovieDetails />} />
                <Route path="/movies/genre/:genreId" element={<MoviesByGenre />} />
                <Route path="/genres" element={<Genres />} />
                <Route path="/*" element={<PageNotFound />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;



