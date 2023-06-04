import { memo } from "react";
import PropTypes from "prop-types";
import './style.css';

function LoginForm({ onSubmit, mistake, t }) {
  const handleOnSubmit = (event) => {
    event.preventDefault();
    onSubmit(event);
  }
  return (
    <form className='LoginForm' onSubmit={handleOnSubmit}>
      <h2 className='LoginForm-title'>{t('login')}</h2>
      <label className='LoginForm-input'>
        <div>{t('form.login')}</div>
        <input type='text' name='login' />
      </label>
      <label className='LoginForm-input'>
        <div>{t('form.password')}</div>
        <input type='password' name='password' />
      </label>
      <div className='LoginForm-mistake'>{mistake}</div>
      <button type='submit'>{t('submit.login')}</button>
    </form>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
  mistake: PropTypes.string,
  t: PropTypes.func,
}

LoginForm.defaultProps = {
  onSubmit: () => { },
  t: () => { },
}

export default memo(LoginForm);