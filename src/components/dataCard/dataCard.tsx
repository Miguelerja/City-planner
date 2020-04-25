import React, {useState} from 'react';
import classnames from 'classnames';
import { ApiPostCall } from '../../types/types';
import './dataCard.scss'; 

type DataCardProps = {
  info: ApiPostCall;
};

export const DataCard = ({ info }: DataCardProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { title, content, image_url = null } = info;
  
  const flipCard = () => {
    setIsHovered(prevState => !prevState)
  };

  return (
    <div className="card" onMouseEnter={flipCard} onMouseLeave={flipCard}>
      <div className="card-inner">
        <div className="card-front">
          {image_url === null 
            ? <img 
                className="img" 
                alt={`default landscape`} 
                src={`${process.env.PUBLIC_URL}/pics/default.jpeg`} 
              />
            : <img 
                className="img" 
                alt={`${title} representation`} 
                src={image_url} 
              />
          }
        </div>
        <div className="card-back">
          <h2 className="name">{title}</h2>
          <p className="description">{content}</p>
        </div>
      </div>
    </div>
  );
};
