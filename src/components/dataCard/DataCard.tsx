import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ApiPostCall } from '../../types/types';
import './dataCard.scss'; 
import { apiDispatchContext, apiStateContext } from '../../context/api-context';
import { deleteData } from '../../context/dispatchers/apiDispatchers';
import { renderImage } from '../../utils/renderImage';

type DataCardProps = {
  info: ApiPostCall;
};

const DataCard = ({ info }: DataCardProps) => {
  const { data: cities } = useContext(apiStateContext);
  const dispatch = useContext(apiDispatchContext);
  const { id, title, content, image_url = undefined } = info;

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
          {renderImage(image_url, title, 'card-img')}
        </div>
        <Link className="card-back" key={id} to={`/${title}/${id}`}>
          <h2 className="name">{title}</h2>
          <p className="description">{content}</p>
        </Link>
          <button className="btn-round btn-delete" onClick={handleDelete}>&#9850;</button>
      </div>
    </div>
  );
};

export default DataCard;
