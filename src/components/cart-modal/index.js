import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import Head from "../head";
import List from "../list";
import CartItem from "../cart-item";

function CartModal({ list, totalPrice, onClose, onRemoveItemFromCart }) {
  return (
    <div className='CartModal'>
      <div className='CartModal-window'>
        <Head title="Корзина">
          <button onClick={onClose}>Закрыть</button>
        </Head>
        <div className='CartModal-list'>
          <List ListItem={CartItem} list={list}
            onRemoveItemFromCart={onRemoveItemFromCart} />
        </div>
        <div className='CartModal-totalPrice'>
          <span>Итого</span>
          <span>{`${totalPrice}`}</span>
        </div>
      </div>
    </div>
  )
}

CartModal.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  totalPrice: PropTypes.number,
  onClose: PropTypes.func,
  onRemoveItemFromCart: PropTypes.func,
};

CartItem.defaultProps = {
  onClose: () => { },
  onRemoveItemFromCart: () => { },
}

export default React.memo(CartModal);
