import Model from "./model.js";
import View from "./view.js";
import fillInputs from "./test-data.js";

let model = new Model();
let view = new View(model.budgetData);
let fillTestFunc = fillInputs;

document.querySelector("#budget-form").addEventListener("submit", (e) => {
  e.preventDefault();
  fillTestFunc();

  let inputData = view.getInput();
  if (!inputData) {
    return false;
  }

  let obj = model.addItem(inputData);
  view.renderItem(inputData, obj.id);
  view.renderTotals(model.budgetData);
  // view.clearInputs();
  console.log(model.budgetData);
});
