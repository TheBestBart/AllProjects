import { getFileName } from "../functions/functions";

export default class FileSaver {
  private static _instance: FileSaver;
  private _test: number;
  private _downloaded: boolean;

  private constructor() {
    this._downloaded = false;
  }

  static getInstance = (): FileSaver => {
    if (!FileSaver._instance) {
      FileSaver._instance = new FileSaver();
    }
    return FileSaver._instance;
  };

  private _setTest = (test: number): void => {
    this._test = !test ? 1 : this._test + 1;
  };

  public isDownloaded = (): boolean => {
    return this._downloaded;
  };

  public setDownloeaded = (downloaded: boolean) => {
    this._downloaded = downloaded;
  };

  public setTest = (): void => {
    this._test = this._test;
  };

  public decrementTest = (): void => {
    this._test = this._test - 1;
  };

  public clearTest = (): void => {
    this._setTest(0);
  };

  public getTest = (): number => {
    return this._test;
  };

  public saveJSONFile = (
    json: any,
    element: JQuery<HTMLElement>,
    usedElement: JQuery<HTMLElement>
  ) => {
    let jsonString = JSON.stringify(json);
    var blob = new Blob([jsonString], { type: "text/json" });

    element.show();

    let url: string = URL.createObjectURL(blob);
    element.attr("href", url);
    element.attr("download", getFileName(this.getTest(), "json"));

    element.click(() => {
      this.setDownloeaded(true);
      usedElement.prop("disabled", false);
      element.hide();
    });

    this._setTest(this._test);
  };
}
