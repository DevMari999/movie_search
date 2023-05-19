import React from 'react';
import { Route, Routes} from "react-router-dom";

import Header from "./components/Header/Header";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";

import './App.scss';

const App: React.FC = () => {
  return (
    <div className="App">

          <Header></Header>
        <div className="container">
          <Routes>
          <Route path={"/"}  element={<Home/>} />
          <Route path={"/id"} element={<MovieDetails/>} />
          <Route element={<PageNotFound/>} />
          </Routes>
        </div>
          <Footer/>

    </div>
  );
}

export default App;
