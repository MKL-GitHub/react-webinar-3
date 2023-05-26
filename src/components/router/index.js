import React, { memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../../app/main';
import CatalogItem from '../../app/catalog-item';

function Router() {
  return (
    <Routes>
      <Route path='/' Component={Main} />
      <Route path='catalog/:id' Component={CatalogItem} />
    </Routes>
  );
}

export default memo(Router);