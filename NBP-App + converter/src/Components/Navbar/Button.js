import React from "react";
import PropTypes from "prop-types";

export class Button extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    functionParam: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
    setActiveButton: PropTypes.func.isRequired,
    text: PropTypes.string,
    converterIsActive: PropTypes.bool
  };

  render() {
    let {
      text,
      onClick,
      functionParam = "A",
      id,
      isActive,
      setActiveButton,
      converterIsActive
    } = this.props;

    return (
      <button
        onClick={() => {
          setActiveButton(id);
          onClick(functionParam);
        }}
        className={
          !isActive
            ? "btn col  btn-cpt-button"
            : "btn col  btn-cpt-button-active"
        }
        disabled={converterIsActive}
      >
        <b>{`${text} ${functionParam} `}</b>
      </button>
    );
  }
}
