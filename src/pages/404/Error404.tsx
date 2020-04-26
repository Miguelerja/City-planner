import React from 'react';
import { Link } from 'react-router-dom';
import './error404.scss';

const Error404 = () => {
  return (
    <div className="error-field">
    <p className="message">You look lost traveler! <span><Link className="link" to="/">Let me take you home</Link></span></p>
    </div>
  )
};

export default Error404;
