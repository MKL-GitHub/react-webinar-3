import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';

function ArticleComment({ username, date, text, onReply, isDeleted, isCurrentUser, t }) {
  return (
    <div className={'ArticleComment' + (isCurrentUser ? ' ArticleComment_isCurrentUser' : '')}>
      {isDeleted
        ? <div className='ArticleComment-userInfo'>
          <span className='ArticleComment-commentDeleted'>
            {t('comment.commentWasDeleted')}
          </span>
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
            {t('comment.reply')}
          </button>
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
  isDeleted: PropTypes.bool,
  isCurrentUser: PropTypes.bool,
  t: PropTypes.func,
};

ArticleComment.defaultProps = {
  onReply: () => { },
  t: () => { },
};

export default memo(ArticleComment);