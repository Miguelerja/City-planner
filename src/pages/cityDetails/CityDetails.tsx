import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ApiResponse } from '../../types/types';
import { Loading } from '../../components/Loading/Loading';
import { Error404 } from '../404/Error404';
import { default as api } from '../../utils/api';
import { renderImage } from '../../utils/renderImage';
import './cityDetails.scss';

type FieldData = {
  value: string;
  editing: false;
};

export const CityDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [listItem, setListItem] = useState<ApiResponse | undefined>();  
  const [titleData, setTitleData] = useState<FieldData>({
    value: '',
    editing: false,
  });
  const [contentData, setContentData] = useState<FieldData>({
    value: '',
    editing: false,
  });

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
            className="edit-btn"
            onClick={handleClick} 
            name="title"
          >	
            &#9998;
          </button>
        </div>
        <div className="page-content">
          <div className="description-container">
            <p>{listItem?.content}</p>
            <button
              className="edit-btn"
              onClick={handleClick} 
              name="title"
            >	
              &#9998;
            </button>
          </div>
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
