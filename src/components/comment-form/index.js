import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';

function CommentForm({ title, type, onSubmit, onCancel }) {
  return (
    <form className='CommentForm' onSubmit={onSubmit}>
      <div className='CommentForm-title'>{title}</div>
      <textarea className='CommentForm-textarea' name='text' />
      <div className='CommentForm-buttons'>
        <button className='CommentForm-submit' type='submit'>
          Отправить
        </button>
        {type === 'reply' &&
          <button className='CommentForm-cancel' type='button' onClick={onCancel}>
            Отмена
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
};

CommentForm.defaultProps = {
  onSubmit: () => { },
  onCancel: () => { },
}

export default memo(CommentForm);