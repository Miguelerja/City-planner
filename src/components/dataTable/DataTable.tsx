import React, { useContext } from 'react';
import { apiDataContext } from '../../context/api-context';
import { DATA_HEADERS } from '../../globalVars/constans';

export const DataTable = () => {
  const { data } = useContext(apiDataContext);

  const renderTableHeaders = () => (
    <thead>
      <tr>
        {DATA_HEADERS.map(header => <th key={header}>{header}</th>)}
      </tr>
    </thead>
  );

  const renderTableBody = () => (
    <tbody>
      {data.map(city => {
        const cells = []

        for(let property in city) {
          if (
            property !== 'id' && 
            property !== 'image_url' && 
            property !== 'updated_at') 
            {
            cells.push(<td key={city[property]}>{city[property]}</td>);
          }
        };

        return <tr key={city.id}>{cells.map(cell => cell)}</tr>;
      })}
    </tbody>
  );

  return (
    <table>
      {renderTableHeaders()}
      {renderTableBody()}
    </table>
  );
};
