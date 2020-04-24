import React, { useState } from 'react';
import classNames from 'classnames';
import './toggler.scss';

type ToggleProps = { selectSection: (name: string) => void };

export const Toggler = ({ selectSection }: ToggleProps) => {
  const [activeSection, setActiveSection] = useState<string>('map');
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    selectSection((event.target as any).name);
    setActiveSection((event.target as any).name);
  };

  return (
    <div className='toggler'>
      <button 
        onClick={handleClick}
        className={classNames('btn', { 'active': activeSection === 'map' })}
        name='map'
        >City Map</button>
      <button 
        onClick={handleClick}
        className={classNames('btn', { 'active': activeSection === 'list' })}
        name='list'
        >City List</button>
    </div>
  );
};
