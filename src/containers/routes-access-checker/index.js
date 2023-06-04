import { memo, useEffect } from "react";
import { Routes, useLocation, useNavigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";

function RoutesAccessChecker({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    token: state.auth.token,
  }));

  useEffect(() => {
    if (select.token) return;

    switch (location.pathname) {
      case '/profile':
        navigate('/login');
        break;
    }
  }, [select.token]);

  return (
    <Routes>{children}</Routes>
  );
}

export default memo(RoutesAccessChecker);