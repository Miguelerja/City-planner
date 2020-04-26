import React, { useContext, useState } from 'react';
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
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({...formdata, [(event.target as any).name]: (event.target as any).value});
  };

  const handleSubmitForm = async () => {
    postData(dispatch, formdata);
    resetState();
  };

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
        <textarea 
          className="textarea" 
          onChange={handleChange} 
          name="content" 
          cols={50} 
          rows={5} 
          required 
        />
      </div>
      <button className="btn-round" onClick={handleSubmitForm}>'\u27940'</button>
    </form>
  );
};
