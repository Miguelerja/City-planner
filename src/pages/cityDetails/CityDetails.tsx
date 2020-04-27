import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ApiResponse } from '../../types/types';
import Loading from '../../components/Loading/Loading';
import Error404 from '../404/Error404';
import { renderImage } from '../../utils/renderImage';
import { apiDispatchContext, apiStateContext } from '../../context/api-context';
import { editData } from '../../context/dispatchers/apiDispatchers';
import './cityDetails.scss';

type FieldData = {
  value: string;
  editing: boolean;
};

const CityDetails = () => {
  const { id } = useParams();
  const dispatch = useContext(apiDispatchContext);
  const { data: cities } = useContext(apiStateContext);

  const [loading, setLoading] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [listItem, setListItem] = useState<ApiResponse | undefined>();  
  const [titleData, setTitleData] = useState<FieldData>({ value: '', editing: false });
  const [contentData, setContentData] = useState<FieldData>({ value: '', editing: false });

  useEffect(() => {
    const data = cities.find(city => city.id.toString() === id);

    setListItem(data);
    setLoading(false);
    setIsUpdating(false);
  }, [id, isUpdating, cities]);

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

  const handleEnter = async(event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!id) return;
    if(event.key !== 'Enter') return;

    if((event.target as any).name === 'title') {
      await editData(dispatch, parseInt(id), { title: titleData.value });
      setIsUpdating(true);
      setTitleData({value: '', editing: false});
    } else {
      await editData(dispatch, parseInt(id), { content: contentData.value });
      setIsUpdating(true);
      setContentData({value: '', editing: false});
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

export default CityDetails;