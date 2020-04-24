import React, {useContext} from 'react';
import { apiDataContext } from '../../context/api-context';
import { Loading } from '../Loading/Loading';

function Container() {
  const { data, loading } = useContext(apiDataContext);
  console.log(data);
  console.log(loading);
  return (
    <div>
      {loading 
        ? <Loading />
        : <p>{data[0].lat}</p>
      }
    </div>
  );
};

export default Container;
