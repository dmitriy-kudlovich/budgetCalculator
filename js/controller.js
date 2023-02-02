import Model from "./model.js";
import View from "./view.js";
import fillInputs from "./test-data.js";

let model = new Model();
let view = new View(model.budgetData);
let fillTestFunc = fillInputs;
fillTestFunc();

view.elements.budgetForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let inputData = view.getInput();
  if (!inputData) {
    return false;
  }

  let obj = model.addItem(inputData);
  view.renderItem(obj, model.budgetData);
  view.renderTotals(model.budgetData);
  console.log(model.budgetData);

  view.clearInputs();
  fillTestFunc();
});

view.elements.budgetSection.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("item__remove") ||
    e.target.getAttribute("alt") === "delete"
  ) {
    let obj = e.target.closest("li");

    model.removeItem(obj.id);
    view.removeItem(e.target, model.budgetData);
    view.renderTotals(model.budgetData);
    console.log(model.budgetData);
  }
});

console.log(view.getDate());
