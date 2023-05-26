import { memo, useCallback, useEffect, useState } from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useParams } from 'react-router-dom';
import ItemInfo from '../../components/item-info';


function CatalogItem() {
  const [state, setState] = useState(null);
  const { id } = useParams();
  const store = useStore();

  useEffect(() => {
    (async () => {
      setState(await store.actions.catalog.loadItemById(id))
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
    addToBasket: useCallback(() => store.actions.basket.addToBasket(id), [store, id]),
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
      <Head title={state?.title} lang={select.lang}
        languages={select.languages} onSwitchLanguage={callbacks.onSwitchLanguage} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
        sum={select.sum} translate={translate} />
      {state && <ItemInfo
        description={state.description}
        country={state.madeIn.title}
        countryCode={state.madeIn.code}
        category={state.category.title}
        editionYear={state.edition}
        price={state.price}
        onAdd={callbacks.addToBasket}
        translate={translate}
      />}
    </PageLayout>
  );
}

export default memo(CatalogItem);
