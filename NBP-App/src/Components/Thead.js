import React from "react";

export class THead extends React.Component {
  render() {
    return (
      <div style={{ border: "1px solid white" }}>
        <div className="text-center row tbody-div">
          <div className="col-md-3">Waluta</div>
          <div className="col-md-2">Kod</div>
          <div className="col-md-3">Kurs</div>
          <div className="col-md-2">Zmiana % dzień</div>
          <div className="col-md-2">Zmiana % Tydzień</div>
        </div>
      </div>
    );
  }
}
