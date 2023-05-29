import React, { memo } from 'react';
import './style.css';

function SpaceBetweenLayout({ children }) {
  return (
    <div className='SpaceBetweenLayout'>
      {children}
    </div>
  );
}

export default memo(SpaceBetweenLayout);