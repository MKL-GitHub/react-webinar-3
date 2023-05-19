import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function List({ list, renderItem }) {
  return (
    <ul className='List'>{
      list.map(item =>
        <li key={item.code}>{renderItem(item)}</li>
      )}
    </ul>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  renderItem: PropTypes.func.isRequired,
};

List.defaultProps = {
  renderItem: () => { },
};

export default React.memo(List);
