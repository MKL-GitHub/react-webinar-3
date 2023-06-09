import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';

function CommentForm({ title, type, onSubmit, onCancel, t }) {
  return (
    <form className='CommentForm' onSubmit={onSubmit}>
      <div className='CommentForm-title'>{title}</div>
      <textarea className='CommentForm-textarea' name='text' />
      <div className='CommentForm-buttons'>
        <button className='CommentForm-submit' type='submit'>
          {t('commentForm.submit')}
        </button>
        {type === 'reply' &&
          <button className='CommentForm-cancel' type='button' onClick={onCancel}>
            {t('commentForm.cancel')}
          </button>}
      </div>
    </form>
  );
}

CommentForm.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  t: PropTypes.func,
};

CommentForm.defaultProps = {
  onSubmit: () => { },
  onCancel: () => { },
  t: () => { },
}

export default memo(CommentForm);