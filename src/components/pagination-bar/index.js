import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function PaginationBar({ currentPage, totalPages, onPageClick }) {
  const buttons = [
    ...getButtonsBeforeCurrentPage(),
    currentPage,
    ...getButtonsAfterCurrentPage(),
  ];

  function getButtonsBeforeCurrentPage() {
    switch (currentPage) {
      case totalPages: return [1, '...', totalPages - 2, totalPages - 1];
      case 2: return [1];
      case 3: return [1, 2];
      default: return currentPage > 3
        ? [1, '...', currentPage - 1] : [];
    }
  }

  function getButtonsAfterCurrentPage() {
    switch (currentPage) {
      case 1: return [2, 3, '...', totalPages];
      case totalPages - 1: return [totalPages];
      case totalPages - 2: return [totalPages - 1, totalPages];
      default: return currentPage < totalPages - 2
        ? [currentPage + 1, '...', totalPages] : [];
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
              ? ' PaginationBar-button_points' : '')}
          onClick={() => handleOnPageClick(value)}>
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