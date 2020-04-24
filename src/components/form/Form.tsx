import React, { useState } from 'react';
// import { useApiPostData } from '../../context/api-context';
interface FormData {
  title: string;
  content: string;
  latitude: string;
  longitude: string;
};

export const Form = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [formdata, setFormData] = useState<FormData>({
    title: '',
    content: '',
    latitude: '',
    longitude: '',
  });

  const handleClick = () => {
    setOpen(prevState => !prevState);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formdata, [(event.target as any).name]: (event.target as any).value});
  };

  const handleSubmitForm = async () => {
    // const response = await useApiPostData(formdata);
    setFormData({
      title: '',
      content: '',
      latitude: '',
      longitude: '',
    });
    setOpen(false);
  };

  const renderForm = () => {
    return (
      <form>
        <label className="label">
          City name
          <input className="input" onChange={handleChange} type="text" name="title" required />
        </label>
        <label className="label">
          Description
          <input className="input" onChange={handleChange} type="text" name="content" required />
        </label>
        <label className="label">
          Latitude
          <input className="input" onChange={handleChange} type="text" name="latitude" />
        </label>
        <label className="label">
          Longitude
          <input className="input" onChange={handleChange} type="text" name="longitude" />
        </label>
        <button onClick={handleSubmitForm}>Send</button>
      </form>
    );
  };

  return (
    <>
      {open ? renderForm() : null}
      <button className="btn-round" onClick={handleClick}>{open ? 'X' : '+'}</button>
    </>
  );
};
