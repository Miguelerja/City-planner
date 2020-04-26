import React from 'react';

export const renderImage = (image_url: string | undefined, title: string | undefined, className: string) => {
  if (!image_url || !title) {
    return (
      <img 
          className={className} 
          alt={`default landscape`} 
          src={`/pics/default.jpeg`} 
      />
    );
  };

  return (
    <img 
      className={className} 
      alt={`${title} representation`} 
      src={image_url} 
    />
  );
};