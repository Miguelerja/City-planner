import React, { lazy, Suspense, useContext, useState } from 'react';
import { apiStateContext } from '../../context/api-context';
import Loading from '../../components/Loading/Loading';
import Toggler from '../../components/toggler/Toggler';
import './main.scss';

const Map = lazy(() => import('../../components/map/Map'));
const DataSection = lazy(() => import('../../components/dataSection/DataSection'));

const Main = () => {
  const [activeSection, setActiveSection] = useState<string>('map');
  const { loading } = useContext(apiStateContext);

  const renderSection = (activeSection: string) => {
    if (activeSection === 'map') {
      return (
        <Suspense fallback={<Loading />}>
          <Map />
        </Suspense>
      );
    };

    return (
      <Suspense fallback={<Loading />}>
        <DataSection />
      </Suspense>
    );
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

export default Main;
