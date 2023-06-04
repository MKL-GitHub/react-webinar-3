import { memo } from "react";
import PageLayout from "../../components/page-layout";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import ProfileCard from "../../components/profile-card";
import UserPanelContainer from "../../containers/user-panel-container";
import Spinner from "../../components/spinner";

function Profile() {
  const select = useSelector(state => ({
    waiting: state.profile.waiting,
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