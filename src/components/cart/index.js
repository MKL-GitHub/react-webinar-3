import React, { useCallback } from "react";
import PropTypes from 'prop-types';
import './style.css';
import Head from "../head";
import List from "../list";
import CartItem from "../cart-item";
import { formatPrice } from "../../utils";

function Cart({ list, totalPrice, onClose, onRemoveItemFromCart }) {
  const callbacks = {
    onRenderItem: useCallback((item) => (
      <CartItem item={item} onRemoveItemFromCart={onRemoveItemFromCart} />
    )),
  };

  return (
    <div className='Cart-window'>
      <Head title="Корзина">
        <button onClick={onClose}>Закрыть</button>
      </Head>
      <div className='Cart-list'>
        <List list={list} renderItem={callbacks.onRenderItem} />
      </div>
      <div className='Cart-totalPrice' data-is-empty={!totalPrice}>
        {totalPrice
          ? <>
            <span>Итого</span>
            <span>{`${formatPrice(totalPrice)} ₽`}</span>
          </>
          : <div>Корзина пуста</div>
        }
      </div>
    </div>
  )
}

Cart.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  totalPrice: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onRemoveItemFromCart: PropTypes.func.isRequired,
};

CartItem.defaultProps = {
  onClose: () => { },
  onRemoveItemFromCart: () => { },
};

export default React.memo(Cart);
