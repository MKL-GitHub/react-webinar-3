import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';

function ArticleComment({ username, date, text, onReply, form, isDeleted, isCurrentUser }) {
  return (
    <div className={'ArticleComment' + (isCurrentUser ? ' ArticleComment_isCurrentUser' : '')}>
      {isDeleted
        ? <div className='ArticleComment-userInfo'>
          <span className='ArticleComment-commentDeleted'>{'Комментарий был удален'}</span>
          <span className='ArticleComment-date'>{date}</span>
        </div>
        : <>
          <div className='ArticleComment-userInfo'>
            <span className='ArticleComment-username'>
              {username}
            </span>
            <span className='ArticleComment-date'>{date}</span>
          </div>
          <div className='ArticleComment-text'>
            {text}
          </div>
          <button className='ArticleComment-reply' onClick={onReply}>
            Ответить
          </button>
          {form}
        </>
      }
    </div>
  );
}

ArticleComment.propTypes = {
  username: PropTypes.string,
  date: PropTypes.string,
  text: PropTypes.string,
  onReply: PropTypes.func,
  form: PropTypes.node,
  isDeleted: PropTypes.bool,
  isCurrentUser: PropTypes.bool,
};

ArticleComment.defaultProps = {
  onReply: () => { },
};

export default memo(ArticleComment);