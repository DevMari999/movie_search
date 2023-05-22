import React from 'react';
import user from "../../images/user.jpg";
import './UserInfo.css';
const UserInfo: React.FC = () => {
    return (
        <div className="userImage">
            <img src={user} alt="user" />
        </div>
    );
};

export default UserInfo;