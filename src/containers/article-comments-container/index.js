import { memo, useCallback, useEffect, useRef, useState } from "react";
import ArticleComments from "../../components/article-comments";
import Spinner from "../../components/spinner";
import useInit from "../../hooks/use-init";
import shallowEqual from "shallowequal";
import useSelector from "../../hooks/use-selector";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import { Link, useParams } from "react-router-dom";
import commentsActions from '../../services/store-redux/article-comments/actions';
import commentActions from '../../services/store-redux/article-comment/actions';
import usersActions from '../../services/store-redux/users/actions';
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import { getFormatedCommentDate } from "../../utils/get-formatted-comment-date";
import ArticleComment from "../../components/article-comment";
import CommentForm from "../../components/comment-form";
import useTranslate from "../../hooks/use-translate";
import { findLastChild } from "../../utils/find-last-child";

function ArticleCommentsContainer() {
  const [comments, setComments] = useState([]);
  const [targetCommentId, setTargetCommentId] = useState(null);
  const [form, setForm] = useState(null);
  const [isSrcolling, setIsSrcolling] = useState(false);

  const formRef = useRef();
  const params = useParams();
  const dispatch = useDispatch();

  const { t, lang } = useTranslate();

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
      setIsSrcolling(true);
    }, [targetCommentId]),

    onCancel: useCallback(() => {
      setTargetCommentId(null);
    }, [targetCommentId]),
  };

  useEffect(() => {
    if (!reduxSelect.comment) return;
    // Когда появляется новый комментарий добавляем его к существующим и сбрасываем в store
    dispatch(commentsActions.add(reduxSelect.comment));
    dispatch(commentActions.reset());
  }, [reduxSelect.comment]);

  useEffect(() => {
    // Опраделяем тип формы или сообщения о входе
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
    let formInfo = {
      prevId: null,
      marginLeft: 0,
    };

    const callback = (item, level) => {
      // Устанавливаем максимальный отступ слева
      const marginLeft = level <= 10 ? level : 10;
      const username = reduxSelect.users.find(user => user._id === item.author._id)?.profile.name;
      const date = getFormatedCommentDate(item.dateCreate, lang === 'ru' ? 'ru-RU' : 'en-EN');

      if (targetCommentId === item._id) {
        formInfo = {
          prevId: findLastChild(item)._id,
          marginLeft: marginLeft + 1,
        }
      }

      comments.push(
        <li key={item._id}>
          <div style={{ marginLeft: `${marginLeft * 1.875}rem` }}>
            <ArticleComment username={username} date={date} text={item.text} isDeleted={item.isDeleted}
              onReply={() => callbacks.onReply(item._id)}
              isCurrentUser={item.author._id === select.user._id} t={t} />
          </div>

          {formInfo.prevId === item._id &&
            <div ref={formRef} className='ArticleComments-replyForm'
              style={{ marginLeft: `${formInfo.marginLeft * 1.875}rem` }}>
              {form}
            </div>}
        </li>
      );
    };

    const tree = listToTree(reduxSelect.comments, '_id', 'article');
    treeToList(tree, callback);
    setComments(comments);
  }, [reduxSelect.users, reduxSelect.comments, form, t]);

  useEffect(() => {
    // Прокручиваем экран к месту формы или сообщения
    if (isSrcolling) {
      setIsSrcolling(false);
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (targetCommentId) {
      setTargetCommentId(null);
    }
  }, [comments]);

  return (
    <Spinner active={reduxSelect.waiting}>
      <ArticleComments items={comments} targetCommentId={targetCommentId} form={form} t={t} />
    </Spinner>
  );
}

export default memo(ArticleCommentsContainer);