import React, { useContext } from 'react';
import { apiDataContext } from '../../context/api-context';
import { DATA_HEADERS } from '../../globalVars/constans';
import { parseDate } from '../../utils/dataManipulation';
import './datatables.scss'; 

export const DataTable = () => {
  const { data } = useContext(apiDataContext);

  const renderTableHeaders = () => (
    <thead className="table-head">
      <tr>
        {DATA_HEADERS.map(header => <th key={header}>{header}</th>)}
      </tr>
    </thead>
  );

  const renderTableBody = () => (
    <tbody className="table-body">
      {data.map(city => {
        const cells = []

        for(let property in city) {
          if (
            property === 'id' || 
            property === 'image_url' || 
            property === 'updated_at') 
            {
              continue;
            }
          if(property === 'created_at') {
            const processedDate = parseDate(city[property]);
            cells.push(<td key={city[property]}>{processedDate}</td>);
            continue;
            
          }
            
          cells.push(<td key={city[property]}>{city[property]}</td>);
        };

        return <tr key={city.id}>{cells.map(cell => cell)}</tr>;
      })}
    </tbody>
  );

  return (
    <table className="table">
      {renderTableHeaders()}
      {renderTableBody()}
    </table>
  );
};
