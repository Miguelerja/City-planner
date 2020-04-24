import React, { useState } from 'react';

interface FormData {
  city: string;
  description: string;
  latitude: string;
  longitude: string;
};

export const Form = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [formdata, setFormData] = useState<FormData>({
    city: '',
    description: '',
    latitude: '',
    longitude: '',
  });

  const handleClick = () => {
    setOpen(prevState => !prevState);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formdata, [(event.target as any).name]: (event.target as any).value});
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    (event.target as any).value = '';
  };

  const renderForm = () => {
    return (
      <form>
        <label className="label">
          City name
          <input className="input" onBlur={handleBlur} onChange={handleChange} type="text" name="city" required />
        </label>
        <label className="label">
          Description
          <input className="input" onBlur={handleBlur} onChange={handleChange} type="text" name="description" required />
        </label>
        <label className="label">
          Latitude
          <input className="input" onBlur={handleBlur} onChange={handleChange} type="text" name="latitude" />
        </label>
        <label className="label">
          Longitude
          <input className="input" onBlur={handleBlur} onChange={handleChange} type="text" name="longitude" />
        </label>

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
