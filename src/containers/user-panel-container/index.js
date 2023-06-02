import { memo, useCallback } from "react";
import useSelector from "../../hooks/use-selector";
import UserPanel from "../../components/user-panel";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";

function UserPanelContainer() {
  const store = useStore();

  const select = useSelector(state => ({
    isAuthorized: state.profile.isAuthorized,
    username: state.profile.user?.name,
  }));

  const callbacks = {
    // Отправка запроса для сброса авторизации
    onLogout: useCallback(event => {
      if (select.isAuthorized) {
        event.preventDefault();
        store.actions.profile.logout();
      }
    }, [select.isAuthorized]),
  }

  const { t } = useTranslate();

  return (
    <UserPanel loginLink={'/login'} profileLink='/profile' username={select.username}
      isAuthorized={select.isAuthorized} onLogout={callbacks.onLogout} t={t} />
  );
}

export default memo(UserPanelContainer);

