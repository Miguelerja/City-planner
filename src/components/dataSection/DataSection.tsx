import React, { useContext } from 'react';
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
        {cities.map(city => <DataCard key={city.id} info={city} />)}
      </div>
    </>
  );
};
