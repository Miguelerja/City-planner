import React from 'react';
import { Link } from 'react-router-dom';
import './error404.scss';

export const Error404 = () => {
  return (
    <div className="container">
    <p className="message">You look lost traveler! <span><Link className="link" to="/">Let me take you home</Link></span></p>
    </div>
  )
};
