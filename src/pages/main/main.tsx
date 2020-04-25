import React, {useContext, useState} from 'react';
import { apiStateContext } from '../../context/api-context';
import { Loading } from '../../components/Loading/Loading';
import { Toggler } from '../../components/toggler/Toggler';
import { Map } from '../../components/map/Map';
import { DataSection } from '../../components/dataSection/DataSection';
import './main.scss';

export const Main = () => {
  const [activeSection, setActiveSection] = useState<string>('map');
  const { loading } = useContext(apiStateContext);

  const renderSection = (activeSection: string) => {
    if (activeSection === 'map') {
      return (<Map />)
    }

    return (<DataSection />)
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
