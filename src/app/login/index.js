import { memo, useCallback } from "react";
import PageLayout from "../../components/page-layout";
import UserPanel from "../../components/user-panel";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import LoginForm from "../../components/login-form";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import UserPanelContainer from "../../containers/user-panel-container";

function Login() {
  const store = useStore();

  const select = useSelector(state => ({
    loginMistake: state.profile.loginMistake,
  }));

  const callbacks = {
    // Отправка запроса авторизации
    onLogin: useCallback(event => {
      store.actions.profile.login(
        event.target.elements.login.value,
        event.target.elements.password.value,
      );
    }, [store]),
  }

  const { t } = useTranslate();

  return (
    <PageLayout>
      <UserPanelContainer />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm onSubmit={callbacks.onLogin} loginMistake={select.loginMistake} t={t} />
    </PageLayout>
  );
}

export default memo(Login);