import { memo } from "react";
import PropTypes from "prop-types";
import './style.css';
import LanguagesBar from "../languages-bar";

function Head({ lang, languages, title, onSwitchLanguage }) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <div className='Head-languagesBar'>
        <LanguagesBar selectedLanguage={lang}
          list={languages} onSwitchLanguage={onSwitchLanguage} />
      </div>
    </div>
  )
}

Head.propTypes = {
  lang: PropTypes.string,
  languages: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.node,
  onSwitchLanguage: PropTypes.func,
};

export default memo(Head);
