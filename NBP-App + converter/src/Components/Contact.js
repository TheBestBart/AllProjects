import React from "react";

export class Contact extends React.Component {
  render() {
    return (
      <section className="row m-0 ftr-cpt-section">
        <div className="col-lg-4">
          <p>Autor:</p>
          <p>Bartłomiej Łebek</p>
        </div>
        <div className="col-lg-4">
          <p>E-mail:</p>
          <p>lebekbartlomiej@gmail.com</p>
        </div>
        <div className="col-lg-4">
          <p>Telefon:</p>
          <p>791-827-837</p>
        </div>
      </section>
    );
  }
}
