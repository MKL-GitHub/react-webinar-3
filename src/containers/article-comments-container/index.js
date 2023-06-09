import { memo, useCallback, useEffect, useState } from "react";
import ArticleComments from "../../components/article-comments";
import Spinner from "../../components/spinner";
import useInit from "../../hooks/use-init";
import shallowEqual from "shallowequal";
import useSelector from "../../hooks/use-selector";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import { Link, useParams } from "react-router-dom";
import commentsActions from '../../store-redux/article-comments/actions';
import commentActions from '../../store-redux/article-comment/actions';
import usersActions from '../../store-redux/users/actions';
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import { getFormatedCommentDate } from "../../utils/get-formatted-comment-date";
import ArticleComment from "../../components/article-comment";
import CommentForm from "../../components/comment-form";
import useTranslate from "../../hooks/use-translate";

function ArticleCommentsContainer() {
  const [comments, setComments] = useState([]);
  const [targetCommentId, setTargetCommentId] = useState(null);
  const [form, setForm] = useState(null);

  const params = useParams();
  const dispatch = useDispatch();

  const { t } = useTranslate();

  useInit(() => {
    dispatch(commentsActions.load(params.id));
    dispatch(usersActions.load());
  }, [params.id]);

  const select = useSelector(state => ({
    isAuth: state.session.exists,
    user: state.session.user,
  }), shallowEqual);

  const reduxSelect = useSelectorRedux(state => ({
    waiting: state.articleComments.waiting || state.users.waiting,
    comments: state.articleComments.data.items,
    comment: state.articleComment.data,
    users: state.users.data.items,
  }), shallowEqual); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const callbacks = {
    onSubmit: useCallback(event => {
      event.preventDefault();
      const text = event.target.elements.text.value;
      const parent = {
        _id: targetCommentId ? targetCommentId : params.id,
        _type: targetCommentId ? 'comment' : 'article',
      }

      dispatch(commentActions.send({ text, parent }));
      setTargetCommentId(null);
    }, [targetCommentId]),

    onReply: useCallback(id => {
      setTargetCommentId(id);
    }, [targetCommentId]),

    onCancel: useCallback(() => {
      setTargetCommentId(null);
    }, [targetCommentId]),
  };

  useEffect(() => {
    if (!reduxSelect.comment) return;
    dispatch(commentsActions.add(reduxSelect.comment));
  }, [reduxSelect.comment]);

  useEffect(() => {
    if (select.isAuth) {
      setForm(targetCommentId
        ? <CommentForm title={t('commentForm.newReply')} type='reply' onCancel={callbacks.onCancel}
          onSubmit={callbacks.onSubmit} t={t} />
        : <CommentForm title={t('commentForm.newComment')} type='comment' onSubmit={callbacks.onSubmit} t={t} />)
    } else {
      setForm(
        <div className='ArticleComments-login'>
          <Link to='/login'>{t('comments.signIn')}</Link>
          {targetCommentId
            ? <>
              {`, ${t('comments.toBeAbleToReply')}.`}
              <button className='ArticleComments-cancel' onClick={callbacks.onCancel}>
                {t('comments.cancel')}
              </button>
            </>
            : `, ${t('comments.toBeAbleToComment')}`
          }
        </div>
      )
    }
  }, [select.isAuth, targetCommentId, t]);

  useEffect(() => {
    if (!reduxSelect.users || !reduxSelect.comments) return;

    const comments = [];
    const callback = (item, level) => {
      // Устанавливаем максимальный отступ слева
      const marginLeft = level <= 10 ? level : 10;
      const username = reduxSelect.users.find(user => user._id === item.author._id)?.profile.name;
      const date = getFormatedCommentDate(item.dateCreate);

      comments.push(
        <li key={item._id} style={{ marginLeft: `${marginLeft * 1.875}rem` }}>
          <ArticleComment username={username} date={date} text={item.text} isDeleted={item.isDeleted}
            onReply={() => callbacks.onReply(item._id)} form={item._id === targetCommentId ? form : null}
            isCurrentUser={item.author._id === select.user._id} t={t} />
        </li>
      );
    };

    const tree = listToTree(reduxSelect.comments, '_id', 'article');
    treeToList(tree, callback);
    setComments(comments);
  }, [reduxSelect.users, reduxSelect.comments, form, t]);

  return (
    <Spinner active={reduxSelect.waiting}>
      <ArticleComments items={comments} targetCommentId={targetCommentId} form={form} t={t} />
    </Spinner>
  );
}

export default memo(ArticleCommentsContainer);