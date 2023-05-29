import React, { memo } from 'react';
import './style.css';

function Spinner() {
  return (
    <div className='Spinner'>
      <div></div><div></div><div></div>
    </div>
  );
}

export default memo(Spinner);