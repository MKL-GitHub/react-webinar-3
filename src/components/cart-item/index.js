import React from "react";
import PropTypes from "prop-types";
import './style.css';

function CartItem(props) {
  const callbacks = {
    onRemoveItem: (e) => {
      e.stopPropagation();
      props.onRemoveItemFromCart(props.item.code);
    }
  }

  return (
    <div className={'CartItem'}>
      <div className='CartItem-code'>{props.item.code}</div>
      <div className='CartItem-title'>
        {props.item.title}
      </div>
      <div className="CartItem-price">
        {`${props.item.price} ₽`}
      </div>
      <div className="CartItem-quantity">
        {`${props.item.quantity} шт`}
      </div>
      <div className='CartItem-actions'>
        <button onClick={callbacks.onRemoveItem}>
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
  onRemoveItemFromCart: PropTypes.func,
};

CartItem.defaultProps = {
  onRemoveItemFromCart: () => { },
}

export default React.memo(CartItem);
