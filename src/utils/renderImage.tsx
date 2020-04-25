import React from 'react';

export const renderImage = (image_url: string | undefined, title: string | undefined) => {
  if (!image_url || !title) {
    return (
      <img 
          className="img" 
          alt={`default landscape`} 
          src={`${process.env.PUBLIC_URL}/pics/default.jpeg`} 
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