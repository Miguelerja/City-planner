import React, {useContext, useState} from 'react';
import { apiDataContext } from '../../context/api-context';
import { Loading } from '../Loading/Loading';
import { Toggler } from '../toggler/Toggler';
import { Map } from '../map/Map';
import { DataTable } from '../dataTable/DataTable';
import './container.scss';

function Container() {
  const [activeSection, setActiveSection] = useState('map');
  const { loading } = useContext(apiDataContext);

  const renderSection = (activeSection: string) => {
    if (activeSection === 'map') {
      return (<Map />)
    }

    return (<DataTable />)
  };

  const selectSection = (name: string) => {
    setActiveSection(name);
  };

  return (
    <div>
      <h1 className="header">City Explorer Diary</h1>
      <Toggler selectSection={selectSection} />
      {loading 
        ? <Loading />
        : renderSection(activeSection)
      }
    </div>
  );
};

export default Container;
