import Basket from "./basket";
import useSelector from "../store/use-selector";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./main";
import CatalogItem from "./catalog-item";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Main} />
        <Route path='catalog/:id' Component={CatalogItem} />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </BrowserRouter>
  );
}

export default App;
