import React from "react";
import PropTypes from "prop-types";
import './style.css';

function ModalLayout({ children }) {
  return (
    <div className="ModalLayout">
      {children}
    </div>
  );
}

ModalLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default React.memo(ModalLayout);
