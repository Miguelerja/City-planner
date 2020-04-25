import React from 'react';
import { useParams } from 'react-router-dom';

export const CityDetails = (props: any) => {
  const { id, title } = useParams();
  return(
    <>
      <p>{id}</p>
      <p>{title}</p>
    </>
  );
} 
