import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function List(props) {
  return (
    <div className='List'>{
      props.list.map(item =>
        <div key={item.code} className='List-item'>
          <props.ListItem item={item}
            onAddItemToCart={props.onAddItemToCart}
            onRemoveItemFromCart={props.onRemoveItemFromCart} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  ListItem: PropTypes.elementType,
  onAddItemToCart: PropTypes.func,
  onRemoveItemFromCart: PropTypes.func,
};

List.defaultProps = {
  onAddItemToCart: () => { },
  onRemoveItemFromCart: () => { },
}

export default React.memo(List);
