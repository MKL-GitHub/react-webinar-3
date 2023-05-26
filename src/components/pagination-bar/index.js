import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function PaginationBar({ currentPage, totalPages, onPageClick }) {
  const buttons = [currentPage];
  fillButtons();

  function fillButtons() {
    if (currentPage - 2 > 1) {
      if (currentPage === totalPages) {
        buttons.unshift(buttons[0] - 1);
      }
      buttons.unshift(buttons[0] - 1);
      buttons.unshift('...');
      buttons.unshift(1);
    } else {
      while (buttons[0] !== 1) {
        buttons.unshift(buttons[0] - 1);
      }
    }

    if (currentPage + 2 < totalPages) {
      if (currentPage === 1) {
        buttons.push(buttons[buttons.length - 1] + 1);
      }
      buttons.push(buttons[buttons.length - 1] + 1);
      buttons.push('...');
      buttons.push(totalPages);
    } else {
      while (buttons[buttons.length - 1] !== totalPages) {
        buttons.push(buttons[buttons.length - 1] + 1);
      }
    }
  }

  function handleOnPageClick(value) {
    if (value !== '...' && currentPage !== value) {
      onPageClick(value)
    }
  }

  return (
    <div className='PaginationBar'>
      {buttons.map((value, index) =>
        <button key={index}
          className={'PaginationBar-button' + (currentPage === value
            ? ' PaginationBar-button_current' : value === '...'
              ? ' PaginationBar-button_points' : '')
          }
          onClick={() => handleOnPageClick(value)}
        >
          {value}
        </button>
      )}
    </div>
  );
}

PaginationBar.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageClick: PropTypes.func,
}

PaginationBar.defaultProps = {
  onPageClick: () => { },
}

export default memo(PaginationBar);