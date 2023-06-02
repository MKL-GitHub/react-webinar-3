import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';

function ProfileCard({ name, phone, email, t }) {
  return (
    <div className='ProfileCard'>
      <h2 className='ProfileCard-title'>{t('profile')}</h2>
      <ul className='ProfileCard-profileInfo'>
        <li>
          <span className='ProfileCard-param'>{`${t('profile.name')}:`}</span>
          <span className='ProfileCard-value'>{name}</span>
        </li>
        <li>
          <span className='ProfileCard-param'>{`${t('profile.phone')}:`}</span>
          <span className='ProfileCard-value'>{phone}</span>
        </li>
        <li>
          <span className='ProfileCard-param'>{`${t('profile.email')}:`}</span>
          <span className='ProfileCard-value'>{email}</span>
        </li>
      </ul>
    </div>
  );
}

ProfileCard.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  t: PropTypes.func,
}

ProfileCard.defaultProps = {
  t: () => { },
}

export default memo(ProfileCard);