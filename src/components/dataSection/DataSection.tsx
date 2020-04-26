import React, { useContext, useState } from 'react';
import classnames from 'classnames';
import DataCard from '../dataCard/DataCard';
import Form from '../form/Form';
import Modal from '../modal/Modal';
import { apiStateContext } from '../../context/api-context';
import './dataSection.scss';

const DataSection = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { data: cities } = useContext(apiStateContext);

  const handleClick = () => {
    setModalOpen(prevState => !prevState);
  };

  return (
    <>
      <button
        className={classnames('btn-round', 'modal-btn', {'active': modalOpen})}
        onClick={handleClick}
      >
        {modalOpen ? 'X' : '+'}
      </button>
      {modalOpen
        ? <Modal><Form handleClick={handleClick} /></Modal>
        : null
      }
      <div className="cards">
        {cities.map(city => <DataCard key={city.id} info={city} />)}
      </div>
    </>
  );
};

export default DataSection;
