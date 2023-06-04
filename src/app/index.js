import { Route } from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from './login';
import Profile from './profile';
import useInit from '../hooks/use-init';
import useStore from '../hooks/use-store';
import RoutesAccessChecker from '../containers/routes-access-checker';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const store = useStore();

  useInit(() => {
    select.token && store.actions.profile.loadProfile();
  }, [], true);

  const select = useSelector(state => ({
    activeModal: state.modals.name,
    token: state.profile.token,
  }));

  return (
    <>
      <RoutesAccessChecker>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/profile'} element={<Profile />} />
      </RoutesAccessChecker>

      {select.activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
