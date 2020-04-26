import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ApiResponse } from '../../types/types';
import { Loading } from '../../components/Loading/Loading';
import { Error404 } from '../404/Error404';
import { default as api } from '../../utils/api';
import { renderImage } from '../../utils/renderImage';
import { apiDispatchContext, editData } from '../../context/api-context';
import './cityDetails.scss';

export const CityDetails = () => {
  const { id } = useParams();
  const dispatch = useContext(apiDispatchContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [listItem, setListItem] = useState<ApiResponse | undefined>();

  const getListItem = async (id: string | undefined) => {
    if(id === undefined) {
      console.error('id invalid');
      return;
    }

    const data = await api.getListItem(parseInt(id));
    setListItem(data);
    setLoading(false);
  };

  useEffect(() => {
    getListItem(id);
  }, [id]);

  const handleClick = () => {

  };

  const renderCityDetails = () => {
    return(
      <div className="city-details">
        {renderImage(listItem?.image_url, listItem?.title, 'detail-img')}
        <div className="title-container">
          <h2 className="city-name">{listItem?.title}</h2>
          <button
            className="btn-round edit-btn"
            onClick={handleClick} 
            name="title"
          >	
            &#9998;
          </button>
        </div>
        <div className="page-content">
          <p>{listItem?.content}</p>
          <Link to="/">Go back</Link>
        </div>
      </div>
    );
  };

  return(
    <>
      {loading 
        ? <Loading />
        : listItem === undefined 
          ? <Error404 />
          : renderCityDetails()
      }
    </>
  );
} 
