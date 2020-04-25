import React, { useContext, useState } from 'react';
import classnames from 'classnames';
import { apiDispatchContext, postData } from '../../context/api-context';
import './form.scss';
interface FormData {
  title: string;
  content: string;
  latitude: string;
  longitude: string;
};

export const Form = () => {
  const dispatch = useContext(apiDispatchContext);
  const [open, setOpen] = useState<boolean>(false);
  const [formdata, setFormData] = useState<FormData>({
    title: '',
    content: '',
    latitude: '',
    longitude: '',
  });

  const resetState = () => {
    setFormData({
      title: '',
      content: '',
      latitude: '',
      longitude: '',
    });
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(prevState => !prevState);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({...formdata, [(event.target as any).name]: (event.target as any).value});
  };

  const handleSubmitForm = async () => {
    postData(dispatch, formdata);
    resetState();
  };

  const renderForm = () => {
    return (
      <form className="form">
        <div className="input">          
          <label className="label" >City name</label>
            <input 
              className="field" 
              onChange={handleChange} 
              type="text" 
              name="title" 
              required 
            />
        </div>
        <div className="input">
          <label className="label">Latitude</label>
            <input 
              className="field" 
              onChange={handleChange} 
              type="text" 
              name="latitude" 
            />
        </div>
        <div className="input">
          <label className="label">Longitude</label>
            <input 
              className="field" 
              onChange={handleChange} 
              type="text" 
              name="longitude" 
            />
        </div>
        <div className="input">
          <label className="label">Description</label>
            <textarea className="textarea" onChange={handleChange} name="content" required />
        </div>
        <button onClick={handleSubmitForm}>Send</button>
      </form>
    );
  };

  return (
    <div className="form-section">
      {open ? renderForm() : null}
      <button className={classnames('btn-round', {'active': open})} onClick={handleClick}>{open ? 'X' : '+'}</button>
    </div>
  );
};
