import React from 'react';
import {Link} from "react-router-dom";
import user from "..//..//images/user.jpg";
import "./Header.scss";
import {useState, useEffect} from "react";


const Header = () => {
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);

    useEffect(() => {
        let prevScrollPos = window.pageYOffset;

        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setIsHeaderVisible(prevScrollPos > currentScrollPos);
            prevScrollPos = currentScrollPos;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return <header className={`header ${isHeaderVisible ? 'visible' : ''}`} >
        <Link to={"/"}>
            <div className="logo">Tetflix home</div>
        </Link>
        <div className="userImage">
            <img src={user} alt="user"/>
        </div></header>;
};


export default Header;