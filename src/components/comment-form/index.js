import { memo, useCallback, useState } from "react";
import PropTypes from 'prop-types';
import './style.css';

function CommentForm({ title, type, onSubmit, onCancel, t }) {
  const [text, setText] = useState('');

  const callbacks = {
    onChange: (event) => {
      setText(event.target.value)
    },
  }

  return (
    <form className='CommentForm' onSubmit={onSubmit}>
      <div className='CommentForm-title'>{title}</div>
      <textarea className='CommentForm-textarea' name='text'
        value={text} onChange={callbacks.onChange} />
      <div className='CommentForm-buttons'>
        <button className='CommentForm-submit' type='submit' disabled={!text.trim().length}>
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