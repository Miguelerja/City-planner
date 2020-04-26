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
  editing: boolean;
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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!id) return;
    
    if((event.target as any).name === 'title') {
      setTitleData(prevState => ({ ...prevState, editing: !prevState.editing}))
    } else {
      setContentData(prevState => ({ ...prevState, editing: !prevState.editing }))
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.persist();
    if ((event.target as any).name === 'title') {
      setTitleData(prevState => ({ ...prevState, value: event.target.value}))
    } else {
      setContentData(prevState => ({ ...prevState, value: event.target.value}))
    };
  };

  const renderCityDetails = () => {
    return(
      <div className="city-details">
        {renderImage(listItem?.image_url, listItem?.title, 'detail-img')}
        <div className="title-container">
          {titleData.editing
            ? <input
                onChange={handleChange} 
                className="input-detail title-input" 
                placeholder="City name" 
                name="title" />
            : <h2 className="city-name">{listItem?.title}</h2>
          }
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
            {contentData.editing
              ? <textarea
                  onChange={handleChange} 
                  className="input-detail content-input" 
                  cols={150}
                  rows={1}
                  placeholder="Description" 
                  name="content" />
              : <p>{listItem?.content}</p>
            }
            <button
              className="edit-btn"
              onClick={handleClick} 
              name="content"
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
