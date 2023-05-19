import React, { useCallback } from 'react';
import ModalLayout from './components/layouts/modal-layout';
import PageLayout from "./components/layouts/page-layout";
import Controls from "./components/controls";
import Head from "./components/head";
import List from "./components/list";
import Item from './components/item';
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const list = store.getState().list;
  const cart = store.getState().cart;

  const callbacks = {
    onAddItemToCart: useCallback((code) => {
      store.addItemToCart(code);
    }, [store]),

    onRemoveItemFromCart: useCallback((code) => {
      store.removeItemFromCart(code);
    }, [store]),

    onOpenCartModal: useCallback(() => {
      store.openCartModal();
    }, [store]),

    onCloseCartModal: useCallback(() => {
      store.closeCartModal();
    }, [store]),

    onRenderItem: useCallback((item) => {
      return (
        <Item item={item}
          onAddItemToCart={callbacks.onAddItemToCart} />
      )
    }),
  }

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls cart={cart} onOpenCartModal={callbacks.onOpenCartModal} />
      <List list={list} renderItem={callbacks.onRenderItem} />
      {cart.isOpen &&
        <ModalLayout>
          <Cart list={cart.list} totalPrice={cart.totalPrice}
            onClose={callbacks.onCloseCartModal}
            onRemoveItemFromCart={callbacks.onRemoveItemFromCart} />
        </ModalLayout>}
    </PageLayout>
  );
}

export default App;
