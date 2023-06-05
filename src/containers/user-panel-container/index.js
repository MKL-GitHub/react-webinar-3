import { memo, useCallback } from "react";
import useSelector from "../../hooks/use-selector";
import UserPanel from "../../components/user-panel";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import { useLocation, useNavigate } from "react-router-dom";

function UserPanelContainer() {
  const store = useStore();
  const location = useLocation();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    isAuth: !!state.auth.token,
    username: state.auth.username,
  }));

  const callbacks = {
    // Отправка запроса для сброса авторизации
    onLogout: useCallback(event => {
      if (select.isAuth) {
        // Используется для того, чтобы убрать задержку и не показывать профиль без данных
        location.pathname === '/profile' && navigate('/login');

        event.preventDefault();
        store.actions.auth.logout();
        store.actions.profile.resetState();
      }
    }, [select.isAuth]),
  }

  const { t } = useTranslate();

  return (
    <UserPanel loginLink={'/login'} profileLink='/profile' username={select.username}
      isAuth={select.isAuth} onLogout={callbacks.onLogout} t={t} />
  );
}

export default memo(UserPanelContainer);

