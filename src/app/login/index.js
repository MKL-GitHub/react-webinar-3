import { memo, useCallback, useEffect } from "react";
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

  useEffect(() => {
    return () => {
      // Сбрасываем ошибку при переходе на другую страницу
      store.actions.auth.setMistake(null);
    }
  }, []);

  const select = useSelector(state => ({
    mistake: state.auth.mistake,
  }));

  const callbacks = {
    // Отправка запроса авторизации
    onLogin: useCallback(async (event) => {
      const user = await store.actions.auth.login(
        event.target.elements.login.value,
        event.target.elements.password.value,
      );

      if (user) {
        // Возвращаемся на предыдущую страницу, если авторизация прошла успешно
        window.history.length > 2 && navigate(-1);
      }
    }, [store, select.mistake]),
  }

  const { t } = useTranslate();

  return (
    <PageLayout>
      <UserPanelContainer />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm onSubmit={callbacks.onLogin} mistake={select.mistake} t={t} />
    </PageLayout>
  );
}

export default memo(Login);