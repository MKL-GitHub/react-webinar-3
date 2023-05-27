import { memo, useCallback } from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Basket() {
  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return (
        <ItemBasket item={item} translate={translate}
          onRemove={callbacks.removeFromBasket}
          onCloseModal={callbacks.closeModal} />
      )
    }, [callbacks.removeFromBasket]),
  };

  function translate(word) {
    return store.actions.interpreter.translate(word);
  }

  return (
    <ModalLayout title={translate('Basket')}
      onClose={callbacks.closeModal} translate={translate}>
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} translate={translate} />
    </ModalLayout>
  );
}

export default memo(Basket);