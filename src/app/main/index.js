import { memo, useCallback, useEffect, useState } from 'react';
import Item from "../../components/item";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PaginationBar from '../../components/pagination-bar';
import NavigationBar from '../../components/navigation-bar';
import SpaceBetweenLayout from '../../components/layouts/space-between-layout';
import PageLayout from '../../components/layouts/page-layout';

const LIMIT = 10; // Максимальное количество товаров на странице

function Main() {
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load(LIMIT, 0);
    store.actions.catalog.loadTotalItemsQuantity();
  }, []);

  const select = useSelector(state => ({
    lang: store.state.interpreter.lang,
    languages: store.state.interpreter.languages,
    totalItems: store.state.catalog.totalItems,
    currentPage: store.state.catalog.currentPage,
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasketById(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Открытие страницы с товаром по id
    openPage: useCallback(async (page) => {
      store.actions.catalog.load(LIMIT, (page - 1) * LIMIT);
    }, [store]),
    // Переключение языка
    onSwitchLanguage: useCallback(lang => {
      store.actions.interpreter.switchLanguage(lang);
    }, [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}
        linkPath={`catalog/${item._id}`} translate={translate} />
    }, [callbacks.addToBasket, store.state.interpreter.lang]),
  };

  function translate(key, countKey) {
    return store.actions.interpreter.translate(key, countKey);
  }

  return (
    <PageLayout>
      <Head title={translate('Shop')}
        lang={select.lang} languages={select.languages} onSwitchLanguage={callbacks.onSwitchLanguage} />
      <SpaceBetweenLayout>
        <NavigationBar translate={translate} />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
          sum={select.sum} translate={translate} />
      </SpaceBetweenLayout>
      <List list={select.list} renderItem={renders.item} />
      {select.totalItems &&
        <PaginationBar currentPage={select.currentPage}
          totalPages={Math.ceil(select.totalItems / LIMIT)}
          onPageClick={callbacks.openPage} />}
    </PageLayout>
  );
}

export default memo(Main);
