import { Routes, Route, Navigate } from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from './login';
import Profile from './profile';
import useInit from '../hooks/use-init';
import useStore from '../hooks/use-store';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const store = useStore();
  const token = localStorage.getItem('token');

  useInit(() => {
    token && store.actions.profile.loadProfile(token);
  }, [], true);

  const select = useSelector(state => ({
    activeModal: state.modals.name,
    isAuthorized: state.profile.isAuthorized,
  }));

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/profile'} element={
          token || select.isAuthorized
            ? <Profile />
            : <Navigate to='/login' />} />
      </Routes>

      {select.activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
