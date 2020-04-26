import React from 'react';

const setDefaultImageSrc = () => {
  const randomNumber = Math.floor(Math.random() * 4 + 1);

  return `/pics/default${randomNumber}.jpeg`
};

export const renderImage = (image_url: string | undefined, title: string | undefined) => {
  if (!image_url || !title) {
    return (
      <img 
          className="img" 
          alt={`default landscape`} 
          src={setDefaultImageSrc()} 
      />
    );
  };

  return (
    <img 
      className="img" 
      alt={`${title} representation`} 
      src={image_url} 
    />
  );
};