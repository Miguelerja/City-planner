import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataCard } from '..//dataCard/dataCard';
import { Form } from '../form/Form';
import { apiStateContext } from '../../context/api-context';
import './dataSection.scss';

export const DataSection = () => {
  const { data: cities } = useContext(apiStateContext);
  return (
    <>
      <Form />
      <div className="cards">
        {cities.map(city => <Link to={`/${city.title}/${city.id}`}><DataCard info={city} /></Link>)}
      </div>
    </>
  );
};
