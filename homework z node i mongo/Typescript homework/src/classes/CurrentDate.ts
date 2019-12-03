export default class CurrentDate {
  private _year: number;
  private _month: number;
  private _date: number;
  private _hour: number;
  private _minutes: number;
  private _seconds: number;

  constructor() {
    let date = new Date();

    this._year = date.getFullYear();
    this._month = date.getMonth();
    this._date = date.getDate();
    this._hour = date.getHours();
    this._minutes = date.getMinutes();
    this._seconds = date.getSeconds();
  }

  getDateString = (): string => {
    return `${this._year}${this._month}${this._date}${this._hour}${
      this._minutes
    }${this._seconds}`;
  };
}
