import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { Link } from 'react-router-dom';

function UserPanel(props) {
  return (
    <nav className='UserPanel'>
      <ul>
        <li><Link to={props.profileLink} className='UserPanel-profileLink'>
          {props.username}
        </Link></li>
        <li><Link to={props.loginLink} className='UserPanel-loginLink' onClick={props.onLogout}>
          {props.isAuth ? props.t('logout') : props.t('login')}
        </Link></li>
      </ul>
    </nav>
  );
}

UserPanel.propTypes = {
  loginLink: PropTypes.string,
  profileLink: PropTypes.string,
  username: PropTypes.string,
  isAuth: PropTypes.bool,
  onLogout: PropTypes.func,
  t: PropTypes.func,
}

UserPanel.defaultProps = {
  onLogout: () => { },
  t: () => { },
}

export default memo(UserPanel);