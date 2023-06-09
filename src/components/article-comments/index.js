import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';

function ArticleComments({ items, targetCommentId, form }) {
  return (
    <div className='ArticleComments'>
      <div className='ArticleComments-commentsQuantity'>
        {`Комментарии (${items ? items.length : 0})`}
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
}

export default memo(ArticleComments);