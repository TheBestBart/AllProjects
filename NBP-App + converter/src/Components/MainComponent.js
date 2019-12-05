import React, { Component } from "react";
import { Form } from "./Form";
import { Navbar } from "./Navbar/Navbar";
import { getWeekAgoDate } from "../Functions/functions";
import { Table } from "./Table/Table";
import { Footer } from "./Footer/Footer";
import PropTypes from "prop-types";
import { Contact } from "./Contact";

export class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nowIsLoaded: false,
      weekAgoIsLoaded: false,
      nowData: [],
      now: "",
      weekAgo: "",
      weekAgoData: [],
      fullData: [],
      searchValue: "",
      table: "A",
      convertertIsActive: false
    };

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.changeConverterActive = this.changeConverterActive.bind(this);
  }

  static propTypes = {
    changeComponent: PropTypes.func
  };

  dataToTable = [];
  filteredTable = [];
  dataToButton = [
    { functionParam: "A", text: "TABELA" },
    { functionParam: "B", text: "TABELA" }
  ];

  componentDidMount() {
    this.fetchData(this.state.table);
  }

  fetchData = table => {
    this.dataToTable = [];
    this.filteredTable = [];
    this.setState({ searchValue: "" });
    let url = `https://api.nbp.pl/api/exchangerates/tables/${table}/`;
    let weekAgoUrl;

    fetch(url)
      .then(nResponse => nResponse.json())
      .then(nJson => {
        weekAgoUrl = url + getWeekAgoDate(nJson[0].effectiveDate);
        fetch(weekAgoUrl)
          .then(waResponse => waResponse.json())
          .then(waJson => {
            this.setState({
              weekAgoIsLoaded: true,
              weekAgoData: waJson[0].rates,
              nowIsLoaded: true,
              nowData: nJson[0].rates,
              now: nJson[0].effectiveDate,
              weekAgo: waJson[0].effectiveDate
            });

            this.state.nowData.map((d, index) => {
              return this.dataToTable.push({
                code: d.code,
                currency: d.currency,
                currentMid: d.mid,
                previousMid: this.state.weekAgoData[index].mid
              });
            });
            this.dataToTable.push({
              code: "PLN",
              currency: "złoty",
              currentMid: 1,
              previousMid: 1
            });

            this.setState({ fullData: this.dataToTable, searchValue: "" });
            this.filteredTable = this.dataToTable;
          })
          .catch(error => console.log("parsing failed inside", error));
      })
      .catch(error => console.log("parsing failed", error));
  };

  changeConverterActive = () => {
    this.state.convertertIsActive
      ? this.setState({ convertertIsActive: false })
      : this.setState({ convertertIsActive: true });
  };

  setFilteredTable = value => {
    return this.state.fullData.filter(currency =>
      currency.currency.toLowerCase().includes(value.toLowerCase())
    );
  };

  onChange = value => {
    let { searchValue } = this.state;
    this.setState({ searchValue: value });
    this.filteredTable = this.setFilteredTable(searchValue);
  };

  onClick = tableToState => {
    if (this.state.table !== tableToState) {
      this.dataToTable = [];
      this.setState({ table: tableToState });
      this.fetchData(tableToState);
    }
  };

  render() {
    let {
      nowIsLoaded,
      weekAgoIsLoaded,
      searchValue,
      now,
      weekAgo,
      convertertIsActive
    } = this.state;

    let { changeComponent } = this.props;
    let isLoaded = nowIsLoaded || weekAgoIsLoaded;

    if (searchValue === "" || this.dataToTable.length === 0) {
      this.filteredTable = this.dataToTable;
    }

    return (
      <div id="mainComponent">
        <Navbar
          onClick={this.onClick}
          dataToButton={this.dataToButton}
          changeComponent={changeComponent}
          converterIsActive={convertertIsActive}
          setConverterActive={this.changeConverterActive}
          nowData={this.dataToTable}
        />
        {isLoaded ? (
          <div className="mainComponent-div">
            <h2 className="text-center text-white py-4">
              <b>{`Dane z dnia ${now} oraz ${weekAgo}`}</b>
            </h2>
            <Form
              onChange={this.onChange}
              searchValue={searchValue}
              numberOfFound={this.filteredTable.length}
            />
            <Table filteredTable={this.filteredTable} />
          </div>
        ) : (
          <div className="container-fluid m-0">
            <button className="btn btn-dark" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </button>
          </div>
        )}
        <Footer />
        <Contact />
      </div>
    );
  }
}
