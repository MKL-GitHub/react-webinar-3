import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { Link } from 'react-router-dom';

function NavigationBar({ translate }) {
  return (
    <ul className='NavigationBar'>
      <li><Link to='/'>{translate("Home")}</Link></li>
    </ul>
  );
}

NavigationBar.propTypes = {
  translate: PropTypes.func.isRequired,
};

export default memo(NavigationBar);