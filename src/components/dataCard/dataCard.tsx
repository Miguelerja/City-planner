import React, {useState} from 'react';
import classnames from 'classnames';
import { DATA_HEADERS } from '../../globalVars/constans';
import { parseDate } from '../../utils/dataManipulation';
import { ApiPostCall } from '../../types/types';
import './dataCard.scss'; 

type DataCardProps = {
  info: ApiPostCall;
};

export const DataCard = ({ info }: DataCardProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { title, content, image_url = null } = info;
  
  const toggleState = () => {
    setIsHovered(prevState => !prevState)
  };

  return (
    <div className="card" onMouseEnter={toggleState} onMouseLeave={toggleState}>
      {image_url === null 
        ? <img className={classnames('img', {'hidden': isHovered})} alt={`default landscape`} src={`${process.env.PUBLIC_URL}/pics/default.jpeg`} />
        : <img className={classnames('img', {'hidden': isHovered})} alt={`${title} representation`} src={image_url} />
      }
      
      <div className={classnames('content', {'hidden': !isHovered})}>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
};
