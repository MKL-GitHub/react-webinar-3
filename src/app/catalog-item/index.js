import { memo, useCallback, useEffect, useState } from 'react';
import PageLayout from '../../components/layouts/page-layout';
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useParams } from 'react-router-dom';
import ItemInfo from '../../components/item-info';
import NavigationBar from '../../components/navigation-bar';
import SpaceBetweenLayout from '../../components/layouts/space-between-layout';


function CatalogItem() {
  const [item, setItem] = useState(null);
  const { id } = useParams();
  const store = useStore();

  useEffect(() => {
    (async () => {
      setItem(await store.actions.catalog.loadItemById(id))
    })();
  }, [id]);

  const select = useSelector(state => ({
    lang: store.state.interpreter.lang,
    languages: store.state.interpreter.languages,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(() => store.actions.basket.addToBasket(item), [store, item]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Переключение языка
    onSwitchLanguage: useCallback(lang => {
      store.actions.interpreter.switchLanguage(lang);
    }, [store]),
  }

  function translate(key, countKey) {
    return store.actions.interpreter.translate(key, countKey);
  }

  return (
    <PageLayout>
      <Head title={item?.title} lang={select.lang}
        languages={select.languages} onSwitchLanguage={callbacks.onSwitchLanguage} />
      <SpaceBetweenLayout>
        <NavigationBar translate={translate} />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
          sum={select.sum} translate={translate} />
      </SpaceBetweenLayout>
      {item && <ItemInfo
        description={item.description}
        country={item.madeIn.title}
        countryCode={item.madeIn.code}
        category={item.category.title}
        editionYear={item.edition}
        price={item.price}
        onAdd={callbacks.addToBasket}
        translate={translate}
      />}
    </PageLayout>
  );
}

export default memo(CatalogItem);
