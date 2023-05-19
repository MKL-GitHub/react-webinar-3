import React from "react";
import PropTypes from "prop-types";
import './style.css';
import { formatPrice } from "../../utils";

function Item({ item, onAddItemToCart }) {
  const callbacks = {
    onAddItemToCart: (e) => {
      e.stopPropagation();
      onAddItemToCart(item.code);
    }
  }

  return (
    <div className={'Item'}>
      <div className='Item-code'>{item.code}</div>
      <div className='Item-title'>
        {item.title}
      </div>
      <div className="Item-price">
        {`${formatPrice(item.price)} ₽`}
      </div>
      <div className='Item-actions'>
        <button onClick={callbacks.onAddItemToCart}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number
  }).isRequired,
  onAddItemToCart: PropTypes.func.isRequired,
};

Item.defaultProps = {
  onAddItemToCart: () => { },
};

export default React.memo(Item);
