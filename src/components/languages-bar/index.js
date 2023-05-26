import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function LanguagesBar({ selectedLanguage, list, onSwitchLanguage }) {
  return (
    <div className='LanguagesBar'>
      {list.map(language =>
        <button key={language}
          className={'LanguagesBar-button' + (selectedLanguage === language ? ' LanguagesBar-button_selected' : '')}
          onClick={() => onSwitchLanguage(language)}>
          {language.substring(0, 2)}
        </button>
      )}
    </div>
  );
}

LanguagesBar.propTypes = {
  selectedLanguage: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.string),
  onSwitchLanguage: PropTypes.func,
}

LanguagesBar.defaultProps = {
  onSwitchLanguage: () => { },
}

export default memo(LanguagesBar);