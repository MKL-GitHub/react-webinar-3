import React, { memo } from 'react';
import './style.css';

function SpaceBetweenContainer({ children }) {
  return (
    <div className='SpaceBetweenContainer'>
      {children}
    </div>
  );
}

export default memo(SpaceBetweenContainer);