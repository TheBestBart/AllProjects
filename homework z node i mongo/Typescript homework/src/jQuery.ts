import $ from "jquery";
import {
  fetchData,
  addControlsToField,
  getNameFromList,
  addDataFromInputsToArray
} from "./functions/functions";
import HTMLElementGenerator from "./classes/HTMLElementGenerator";
import FileSaver from "./classes/FileSaver";

$(document).ready(function() {
  let inputVal = $("#main-input");
  let collapseButton = $("#button-link");
  let collapseDiv = $(".collapse-div").hide();
  let generatingButton = $("#generating-button").hide();
  let generatingField = $("#generating-field").hide();
  let clearDataButton = $("#clear-data-button").hide();
  let saveFileButton = $("#saveFile").hide().prop("disabled", true);
  let generatingOutData = $("#generating-out-data").hide();
  let link = $(".link");
  let showDataButton = $("#data").hide();
  let collapse: boolean = false;
  let isFetched: boolean = false;
  let nameList: Array<string> = [];
  let outputData: Array<{ name: string; value: string }> = [];
  let controlsList: Array<HTMLElementGenerator> = [];
  FileSaver.getInstance().clearTest();

  collapseButton.click(() => {
    let text1 = "Kliknij, by rozwinąc linki do wyboru";
    let text2 = "Kliknij, by zwinąć";
    collapse ? collapseDiv.slideUp("slow") : collapseDiv.slideDown("slow");
    collapse ? collapseButton.text(text1) : collapseButton.text(text2);
    collapse = !collapse ? true : false;
  });

  link.click((e: any) => {
    inputVal.val($(e.target).text());
    generatingButton.show("slow");
  });

  generatingButton.click(() => {
    if (!isFetched) {
      controlsList = fetchData(
        inputVal.val() as string,
        generatingButton,
        "successClass",
        "errorClass"
      );
      collapseButton.prop("disabled", true);
      collapseDiv.slideUp("slow");
      collapseButton.text("Kliknij, by rozwinąc linki do wyboru");
      isFetched = controlsList === [] ? false : true;
    } else {
      nameList = getNameFromList(controlsList);
      showDataButton.show("slow");
      generatingButton.prop("disabled", true);

      addControlsToField(generatingField, controlsList);
      generatingField.fadeToggle(1000);
    }
  });

  showDataButton.click(() => {
    if (outputData.length) {
      outputData = [];
    }
    outputData = addDataFromInputsToArray(nameList);
    generatingOutData.text(JSON.stringify(outputData)).show("slow");
    FileSaver.getInstance().setDownloeaded(false);
    clearDataButton.show("slow");
    FileSaver.getInstance().saveJSONFile(
      outputData,
      saveFileButton,
      showDataButton
    );
    saveFileButton.prop("disabled", false);
    showDataButton.prop("disabled", true);
  });

  clearDataButton.click(() => {
    console.log(FileSaver.getInstance().isDownloaded());
    !FileSaver.getInstance().isDownloaded() &&
      FileSaver.getInstance().decrementTest();

    collapseButton.prop("disabled", false);
    generatingField.text("").hide();
    generatingOutData.text("").hide();
    saveFileButton.hide();
    inputVal.val("Wybierz link");
    generatingButton.text("Generuj dane z linku").prop("disabled", false);
    isFetched = false;
    clearDataButton.prop("disabled", false);
    controlsList = [];
    nameList = [];
    outputData = [];
    generatingButton.hide("slow");
    clearDataButton.hide("slow");
    showDataButton.hide("slow");
    generatingButton.hasClass("successClass") &&
      generatingButton.removeClass("successClass");
    generatingButton.hasClass("errorClass") &&
      generatingButton.removeClass("errorClass");
    showDataButton.prop("disabled", false);
  });
});
