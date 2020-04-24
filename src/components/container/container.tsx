import React, {useContext, useState} from 'react';
import { apiDataContext } from '../../context/api-context';
import { Loading } from '../Loading/Loading';
import { Toggler } from '../toggler/Toggler';
import { Map } from '../map/Map';
import { DataTable } from '../dataTable/DataTable';

function Container() {
  const [activeSection, setActiveSection] = useState('map');
  const { data, loading } = useContext(apiDataContext);

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
      <Toggler selectSection={selectSection} />
      {loading 
        ? <Loading />
        : renderSection(activeSection)
      }
    </div>
  );
};

export default Container;
