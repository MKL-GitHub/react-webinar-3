import React, { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from "../../utils";
import './style.css';

function BasketTool({ sum, amount, onOpen, translate }) {
  const cn = bem('BasketTool');

  return (
    <div className={cn()}>
      <span className={cn('label')}>{translate('In the basket')}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, translate('item', true))} / ${numberFormat(sum)} ₽`
          : translate('empty')
        }
      </span>
      <button onClick={onOpen}>{translate('Go')}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  translate: PropTypes.func.isRequired,
};

BasketTool.defaultProps = {
  onOpen: () => { },
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
