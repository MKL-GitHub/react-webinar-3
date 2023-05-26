import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ItemInfo(props) {
  return (
    <div className='ItemInfo'>
      <div className='ItemInfo-description'>
        {props.description}
      </div>
      <div className='ItemInfo-param'>
        Страна производитель: <span className='ItemInfo-paramValue'>
          {`${props.country} (${props.countryCode})`}
        </span>
      </div>
      <div className='ItemInfo-param'>
        Категория: <span className='ItemInfo-paramValue'>{`${props.category}`}</span>
      </div>
      <div className='ItemInfo-param'>
        Год выпуска: <span className='ItemInfo-paramValue'>{`${props.editionYear}`}</span>
      </div>
      <div className='ItemInfo-price'>
        <span>Цена:</span><span>{`${(props.price.toString()).replace('.', ',')} ₽`}</span>
      </div>
      <button className='ItemInfo-addButton' onClick={props.onAdd}>
        {props.translate('Add')}
      </button>
    </div>
  );
}

ItemInfo.propTypes = {
  description: PropTypes.string,
  country: PropTypes.string,
  countryCode: PropTypes.string,
  category: PropTypes.string,
  editionYear: PropTypes.number,
  price: PropTypes.number,
  onAdd: PropTypes.func,
  translate: PropTypes.func.isRequired,
}

ItemInfo.defaultProps = {
  onAdd: () => { },
}

export default memo(ItemInfo);