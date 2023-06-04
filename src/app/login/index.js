import { memo, useCallback } from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import LoginForm from "../../components/login-form";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import UserPanelContainer from "../../containers/user-panel-container";
import { useNavigate } from "react-router-dom";

function Login() {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    loginMistake: state.profile.loginMistake,
  }));

  const callbacks = {
    // Отправка запроса авторизации
    onLogin: useCallback(async (event) => {
      const ok = await store.actions.profile.login(
        event.target.elements.login.value,
        event.target.elements.password.value,
      );
      // Возвращаемся на предыдущую страницу, если авторизация прошла успешно
      ok && navigate(-1);
    }, [store, select.loginMistake]),
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