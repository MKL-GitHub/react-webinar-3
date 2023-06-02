import { memo } from "react";
import PageLayout from "../../components/page-layout";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import ProfileCard from "../../components/profile-card";
import UserPanelContainer from "../../containers/user-panel-container";

function Profile() {
  const select = useSelector(state => ({
    username: state.profile.user?.name,
    userPhone: state.profile.user?.phone,
    userEmail: state.profile.user?.email,
  }));

  const { t } = useTranslate();

  return (
    <PageLayout>
      <UserPanelContainer />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <ProfileCard name={select.username} phone={select.userPhone}
        email={select.userEmail} t={t} />
    </PageLayout>
  );
}

export default memo(Profile);