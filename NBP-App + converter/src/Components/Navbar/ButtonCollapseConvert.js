import React from "react";
import PropTypes from "prop-types";
import { InputSelectConvert } from "./InputSelectConvert";
import { InputTextConvert } from "./InputTextConvert";
import { findElement } from "../../Functions/functions";

export class ButtonCollapseConvert extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fromCurrency: "",
      toCurrency: "",
      fromCurrencyNumber: 0,
      value: 0
    };

    this.setFromCurrency = this.setFromCurrency.bind(this);
    this.setToCurrency = this.setToCurrency.bind(this);
    this.setFromCurrencyNumber = this.setFromCurrencyNumber.bind(this);
  }

  static propTypes = {
    Component: PropTypes.object,
    setConverterActive: PropTypes.func,
    converterIsActive: PropTypes.bool,
    nowData: PropTypes.arrayOf(PropTypes.object)
  };

  clearState = () => {
    let { value } = this.state;

    if (value !== "") {
      this.setState({
        fromCurrency: "",
        toCurrency: "",
        fromCurrencyNumber: 1,
        value: 0
      });
    }
  };

  setFromCurrency = option => {
    this.setState({ fromCurrency: option });
  };

  setToCurrency = option => {
    this.setState({ toCurrency: option });
  };

  setFromCurrencyNumber = value => {
    this.setState({ fromCurrencyNumber: value });
  };

  onClick = () => {
    this.state.isCollapse
      ? this.setState({ isCollapse: false })
      : this.setState({ isCollapse: true });
  };

  getResponse = () => {
    let { fromCurrency, fromCurrencyNumber, toCurrency } = this.state;
    let { nowData } = this.props;
    let fromMid = findElement(fromCurrency, nowData);
    let toMid = findElement(toCurrency, nowData);
    let value = ((fromMid * fromCurrencyNumber) / toMid).toString().slice(0, 6);
    this.setState({ value: value });
  };

  render() {
    let { setConverterActive, nowData, converterIsActive } = this.props;
    let { value, fromCurrency, toCurrency } = this.state;

    return (
      <section
        className="container-fluid text-center p-0 row m-0"
        style={{ width: "100%" }}
      >
        <p
          className="btn btn-info btn-dark btn-lg col-12 m-0"
          onClick={() => {
            this.onClick();
            setConverterActive();
            this.clearState();
          }}
        >
          <span className="convert-button" />
          {converterIsActive ? "Zwiń, by przełączyć tabele" : "Przelicz walute"}
        </p>
        {converterIsActive && (
          <div
            className="container-fluid mx-0 my-4 p-0"
            style={{ backgroundColor: "#1f1d20", border: "1px solid white" }}
          >
            <div className="row container-fluid mx-0 my-4 p-0">
              <InputTextConvert typeValue={this.setFromCurrencyNumber} />
              <InputSelectConvert
                nowData={nowData}
                chooseOption={this.setFromCurrency}
                title={"z jakiej waluty: "}
              />
              <InputSelectConvert
                nowData={nowData}
                chooseOption={this.setToCurrency}
                title={"na jaką walute: "}
              />
              <div className="form-group col-md-3">
                <label>Wynik</label>
                <input
                  type="text"
                  disabled={true}
                  className="form-control"
                  value={value}
                />
              </div>
            </div>
            <button
              className="btn btn-secondary col-sm-4 offset-sm-4 m-0 rounded"
              onClick={this.getResponse}
              disabled={
                (fromCurrency === "" ||
                  fromCurrency === "-" ||
                  (toCurrency === "" || toCurrency === "-")) &&
                true
              }
            >
              Przelicz
            </button>
          </div>
        )}
      </section>
    );
  }
}
