import { memo, useEffect } from "react";
import PageLayout from "../../components/page-layout";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import ProfileCard from "../../components/profile-card";
import UserPanelContainer from "../../containers/user-panel-container";
import Spinner from "../../components/spinner";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";

function Profile() {
  const store = useStore();

  useInit(() => {
    if (store.state.auth.userId) {
      // В комментарии от учителя было указано, что лучше загружать профиль по id пользователя
      store.actions.profile.load(store.state.auth.userId);
    }
  }, [store.state.auth.userId], true);

  const select = useSelector(state => ({
    waiting: state.profile.waiting,
    userId: state.auth.userId,
    name: state.profile.data.name,
    phone: state.profile.data.phone,
    email: state.profile.data.email,
  }));

  const { t } = useTranslate();

  return (
    <PageLayout>
      <UserPanelContainer />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ProfileCard name={select.name} phone={select.phone} email={select.email} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);