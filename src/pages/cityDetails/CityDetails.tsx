import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ApiResponse } from '../../types/types';
import { Loading } from '../../components/Loading/Loading';
import { default as api } from '../../utils/api';
import { renderImage } from '../../utils/renderImage';
import { parseDate } from '../../utils/dataManipulation';
import { apiDispatchContext, editData } from '../../context/api-context';

export const CityDetails = () => {
  const { id } = useParams();
  const dispatch = useContext(apiDispatchContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [listItem, setListItem] = useState<ApiResponse | undefined>();
  const [titleData, setTitleData] = useState({
    value: '',
    editing: false,
  });
  const [contentData, setContentData] = useState({
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
    
    if ((event.target as any).name === 'title') {
      if (titleData.editing) {
        return editData(dispatch, parseInt(id), { title: titleData.value });
      }
      setTitleData(prevState => ({ ...prevState, editing: !prevState.editing}))
    } else {
      if (contentData.editing) {
        return editData(dispatch, parseInt(id), { content: contentData.value });
      }
      setContentData(prevState => ({ ...prevState, editing: !prevState.editing}))
    };
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
      <div>
        {renderImage(listItem?.image_url, listItem?.title)}
        <div>
          {titleData.editing
            ? <input type="text" onChange={handleChange} name="title" />
            : <h2>{listItem?.title}</h2>
          }
          <button onClick={handleClick} name="title">{ titleData.editing ? 'submit': 'edit'}</button>

          {contentData.editing
            ? <textarea onChange={handleChange} name="content" />
            : <p>{listItem?.content}</p>
          }
          <button onClick={handleClick} name="content">{ contentData.editing ? 'submit': 'edit'}</button>

          {listItem?.created_at
            ? <p><span>You visited this city in </span>{parseDate(listItem?.created_at)}</p>
            : null
          }
        </div>
          <Link to="/">Go back</Link>
      </div>
    );
  };

  return(
    <>
      {loading 
        ? <Loading />
        : listItem === undefined 
          ? <p>Broken</p>
          : renderCityDetails()
      }
    </>
  );
} 
