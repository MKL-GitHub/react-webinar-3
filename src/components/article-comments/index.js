import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';

function ArticleComments({ items, targetCommentId, form, t }) {
  return (
    <div className='ArticleComments'>
      <div className='ArticleComments-commentsQuantity'>
        {`${t('comments.comments')} (${items ? items.length : 0})`}
      </div>
      <ul className='ArticleComments-comments'>
        {items}
      </ul>
      {!targetCommentId && form}
    </div>
  );
}

ArticleComments.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node),
  targetCommentId: PropTypes.string,
  form: PropTypes.node,
  t: PropTypes.func,
};

ArticleComments.defaultProps = {
  f: () => { },
};

export default memo(ArticleComments);