import Control from "./Control";
import HTMLElementGenerator from "./HTMLElementGenerator";

export default class List extends Control implements HTMLElementGenerator {
  protected _caption: string;
  protected _defaultValue: string;
  protected _key: string;
  protected _type: string;
  protected _items: Array<{ caption: string; value: string }>;

  constructor(
    caption: string,
    defaultValue: string,
    key: string,
    type: string,
    items: Array<{ caption: string; value: string }>
  ) {
    super(caption, defaultValue, key, type);
    this._items = items;
  }

  private getRadioElementFromItems = (): string => {
    let input: string = "";

    this._items.map(item => {
      let template: string = `<input type="radio" name="${this._key}" value="${
        item.value
      }"> ${item.caption}<br>`;

      return (input = input + template);
    });

    return input;
  };

  public generateHTMLElement = (): string => {
    let template = `<div class="form-radio-div"><div class="div-inside text-center">${
      this._caption
    }:</div><form class="form-list"><div class="div-list">${this.getRadioElementFromItems()}<div></form></div>`;

    return template;
  };

  public getName = (): string => {
    return this._key;
  };
}
