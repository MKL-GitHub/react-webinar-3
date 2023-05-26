import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({ onAdd, translate }) {
  return (
    <div className='Controls'>
      <button onClick={() => onAdd()}>{translate('Add')}</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func,
  translate: PropTypes.func.isRequired,
};

Controls.defaultProps = {
  onAdd: () => { }
}

export default memo(Controls);
