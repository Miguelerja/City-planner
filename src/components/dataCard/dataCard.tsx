import React, { useContext } from 'react';
import { ApiPostCall } from '../../types/types';
import './dataCard.scss'; 
import { apiDispatchContext, apiStateContext, deleteData } from '../../context/api-context';

type DataCardProps = {
  info: ApiPostCall;
};

export const DataCard = ({ info }: DataCardProps) => {
  const { data: cities } = useContext(apiStateContext);
  const dispatch = useContext(apiDispatchContext);
  const { title, content, image_url = null } = info;

  const handleDelete = () => {
    const cityId = cities.find(city => city.content === content)?.id;
    if (cityId) {
      deleteData(dispatch, cityId);
    };
  };
  
  return (
    <div className="card">
      <div className="card-inner">
        <div className="card-front">
          {image_url === null 
            ? <img 
                className="img" 
                alt={`default landscape`} 
                src={`${process.env.PUBLIC_URL}/pics/default.jpeg`} 
              />
            : <img 
                className="img" 
                alt={`${title} representation`} 
                src={image_url} 
              />
          }
        </div>
        <div className="card-back">
          <h2 className="name">{title}</h2>
          <p className="description">{content}</p>
          <button className="btn-round btn-delete" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};
