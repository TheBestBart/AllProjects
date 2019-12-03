import HTMLElementGenerator from "../classes/HTMLElementGenerator";
import { ControlsFactory } from "../classes/ControlsFactory";
import _ from "lodash";
import $ from "jquery";
import CurrentDate from "../classes/CurrentDate";

const toControlsList = (
  array: Array<HTMLElementGenerator>,
  dataFromFetch: Array<any>
): Array<HTMLElementGenerator> => {
  dataFromFetch.map(data => {
    let { caption, defaultValue, items, key, type } = _.cloneDeep(data);
    return array.push(ControlsFactory(caption, defaultValue, key, type, items));
  });

  return array;
};

export const fetchData = (
  url: string,
  clickedButton: JQuery<HTMLElement>,
  successClass: string = undefined,
  errorClass: string = undefined
): Array<HTMLElementGenerator> => {
  let array: Array<HTMLElementGenerator> = [];

  fetch(url)
    .then(response => response.json())
    .then(json => {
      array = toControlsList(array, json.controls);
      clickedButton.text(
        "pobieranie zakończone sukcesem, kliknij aby wyświetlic"
      );
      successClass && clickedButton.addClass(successClass);
    })
    .catch(error => {
      console.log("parsing failed", error);
      errorClass && clickedButton.addClass(errorClass);
      clickedButton.text("Błąd! Prawdopodobnie problem z CORS");
    });

  return array;
};

export const addControlsToField = (
  field: JQuery<HTMLElement>,
  array: Array<HTMLElementGenerator>
): void => {
  array.map(control => {
    return field.append(control.generateHTMLElement());
  });
};

export const getNameFromList = (
  ListData: Array<HTMLElementGenerator>
): Array<string> => {
  let array: Array<string> = [];

  ListData.map(data => {
    return array.push(data.getName());
  });

  return array;
};

export const addDataFromInputsToArray = (
  list: Array<string>
): Array<{ name: string; value: string }> => {
  let value: string;
  let outputData: Array<{ name: string; value: string }> = [];

  list.map(name => {
    if ($(`input[name="${name}"]`).is(":radio")) {
      value = $(`input[name="${name}"]:checked`).val() as string;
      return outputData.push({ name: name, value: value });
    } else if ($(`input[name="${name}"]`).is(":text")) {
      value = $(`input[name="${name}"]`).val() as string;
      return outputData.push({ name: name, value: value });
    } else {
      value = $(`input[name="${name}"]`).is(":checked") ? "true" : "false";
      return outputData.push({ name: name, value: value });
    }
  });

  return outputData;
};

export const getFileName = (nrTest: number, format: string): string => {
  let now: string = new CurrentDate().getDateString();

  return `test${nrTest < 10 ? "0" + nrTest : nrTest}_${now}.out.${format}`;
};
