import React, { useContext, useState } from 'react';
import { apiDispatchContext } from '../../context/api-context';
import { postData } from '../../context/dispatchers/apiDispatchers';
import './form.scss';
interface FormData {
  title: string;
  content: string;
  lat: string;
  long: string;
  'image_url': string;
};

type FormProps = {
  handleClick?: () => void;
};

const Form = ({ handleClick }: FormProps) => {
  const dispatch = useContext(apiDispatchContext);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    lat: '',
    long: '',
    'image_url': '',
  });

  const resetState = () => {
    setFormData({
      title: '',
      content: '',
      lat: '',
      long: '',
      'image_url': '',
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({...formData, [(event.target as any).name]: (event.target as any).value});
  };

  const handleSubmitForm = async () => {
    postData(dispatch, formData);
    resetState();
    if (handleClick) handleClick();
  };

  return (
    <form className="form">
      <div className="form-section">        
        <div className="input">          
          <label className="label" >City name *</label>
          <input 
            className="field" 
            onChange={handleChange} 
            type="text" 
            name="title" 
            required 
          />
        </div>
        <div className="input">
          <label className="label">Description *</label>
          <textarea 
            className="textarea" 
            onChange={handleChange} 
            name="content" 
            cols={20} 
            rows={10} 
            required 
          />
        </div>
      </div>

      <div className="form-section">
        <div className="input">
          <label className="label">Latitude</label>
          <input 
            className="field" 
            onChange={handleChange} 
            type="text" 
            name="lat" 
          />
        </div>
        <div className="input">
          <label className="label">Longitude</label>
          <input 
            className="field" 
            onChange={handleChange} 
            type="text" 
            name="long" 
          />
        </div>
        <div className="input">
          <label className="label">Image url</label>
          <input 
            className="field" 
            onChange={handleChange} 
            type="text" 
            name="image_url" 
          />
        </div>
      </div>

      <button
        className="btn-round btn-submit"
        onClick={handleSubmitForm}>&#10003;</button>
    </form>
  );
};

export default Form;
