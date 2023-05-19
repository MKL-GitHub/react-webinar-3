import React from "react";
import PropTypes from "prop-types";
import './style.css';
import { formatPrice } from "../../utils";

function CartItem({ item, onRemoveItemFromCart }) {
  const callbacks = {
    onRemoveItemFromCart: (e) => {
      e.stopPropagation();
      onRemoveItemFromCart(item.code);
    }
  }

  return (
    <div className={'CartItem'}>
      <div className='CartItem-code'>{item.code}</div>
      <div className='CartItem-title'>
        {item.title}
      </div>
      <div className="CartItem-price">
        {`${formatPrice(item.price)} ₽`}
      </div>
      <div className="CartItem-quantity">
        {`${item.quantity} шт`}
      </div>
      <div className='CartItem-actions'>
        <button onClick={callbacks.onRemoveItemFromCart}>
          Удалить
        </button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  onRemoveItemFromCart: PropTypes.func.isRequired,
};

CartItem.defaultProps = {
  onRemoveItemFromCart: () => { },
};

export default React.memo(CartItem);
