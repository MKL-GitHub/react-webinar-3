import React, { useCallback } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import CartModal from "./components/cart-modal";
import Item from './components/item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const list = store.getState().list;
  const cart = store.getCartState();

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
  }

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls cart={cart} onOpenCartModal={callbacks.onOpenCartModal} />
      <List list={list} ListItem={Item}
        onAddItemToCart={callbacks.onAddItemToCart}
        onSelectItem={callbacks.onSelectItem} />
      {cart.isOpen &&
        <CartModal list={cart.list} totalPrice={cart.totalPrice}
          onClose={callbacks.onCloseCartModal}
          onRemoveItemFromCart={callbacks.onRemoveItemFromCart} />}
    </PageLayout>
  );
}

export default App;
