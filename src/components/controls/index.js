import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural } from "../../utils";

function Controls({ cart, onOpenCartModal }) {
  const pluarlItemName = plural(cart.list.length, { one: 'товар', few: 'товара', many: 'товаров' });

  return (
    <div className='Controls'>
      <div className='Controls-itemsQuantity'>
        В корзине:<span>
          {`${cart.list.length
            ? `${cart.list.length} ${pluarlItemName} / ${cart.totalPrice} ₽`
            : 'пусто'}`}
        </span>
      </div>
      <button
        className="Controls-goTo"
        onClick={onOpenCartModal}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  cart: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.number,
        price: PropTypes.number,
        quantity: PropTypes.number,
        title: PropTypes.string,
      }),
    ),
    totalPrice: PropTypes.number,
    isOpen: PropTypes.bool,
  }).isRequired,
  onOpenCartModal: PropTypes.func.isRequired,
};

Controls.defaultProps = {
  onOpenCartModal: () => { }
};

export default React.memo(Controls);
