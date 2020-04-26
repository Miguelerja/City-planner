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

type FieldData = {
  value: string;
  editing: boolean;
};

export const CityDetails = () => {
  const { id } = useParams();
  const dispatch = useContext(apiDispatchContext);

  const [loading, setLoading] = useState<boolean>(true);
  const [listItem, setListItem] = useState<ApiResponse | undefined>();  
  const [titleData, setTitleData] = useState<FieldData>({ value: '', editing: false });
  const [contentData, setContentData] = useState<FieldData>({ value: '', editing: false });

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
      setTitleData(prevState => ({ value: '', editing: !prevState.editing}))
    } else {
      setContentData(prevState => ({ value: '', editing: !prevState.editing }))
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

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!id) return;
    if(event.key !== 'Enter') return;

    if((event.target as any).name === 'title') {
      editData(dispatch, parseInt(id), { title: titleData.value });
      setTitleData({value: '', editing: false});
    } else {
      editData(dispatch, parseInt(id), { content: contentData.value });
      setTitleData({value: '', editing: false});
    };
  };

  const renderCityDetails = () => {
    return(
      <div className="city-details">
        {renderImage(listItem?.image_url, listItem?.title, 'detail-img')}
        <div className="title-container">
          {titleData.editing
            ? <input
                onKeyUp={handleEnter}
                onChange={handleChange} 
                className="input-detail title-input" 
                placeholder="Press Enter to save changes" 
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
                  onKeyUp={handleEnter}
                  onChange={handleChange} 
                  className="input-detail content-input" 
                  cols={250}
                  rows={1}
                  placeholder="Press Enter to save changes" 
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
