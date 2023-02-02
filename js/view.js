export default class View {
  constructor(data) {
    this.renderTotals(data);
  }

  elements = {
    budgetValue: document.querySelector("#budget-value"),
    totalInc: document.querySelector("#totalInc"),
    totalIncPercentage: document.querySelector("#totalIncPercentage"),
    totalExp: document.querySelector("#totalExp"),
    totalExpPercentage: document.querySelector("#totalExpPercentage"),
    budgetForm: document.querySelector("#budget-form"),
    intputType: document.querySelector("#input__type"),
    inputDescription: document.querySelector("#input__description"),
    inputValue: document.querySelector("#input__value"),
    submitBtn: document.querySelector("#submit-btn"),
    budgetSection: document.querySelector("#budgetSection"),
    incomeList: document.querySelector("#income__list"),
    expensesList: document.querySelector("#expenses__list"),
  };

  getInput() {
    if (
      this.elements.inputDescription.value == "" ||
      this.elements.inputValue.value <= 0 ||
      isNaN(this.elements.inputValue.value)
    ) {
      alert("Введите описание и сумму больше нуля");
      return false;
    }

    return {
      type: this.elements.intputType.value,
      desc: this.elements.inputDescription.value,
      val: +this.elements.inputValue.value,
    };
  }

  renderItem(data, budget) {
    let html;

    if (data.type == "inc") {
      html = `<li id="${data.id}" class="budget-list__item item item--income">
                <div class="item__title">${data.desc}</div>
                <div class="item__right">
                    <div class="item__amount">+ ${data.val}</div>
                    <button class="item__remove">
                        <img
                            src="./img/circle-green.svg"
                            alt="delete"
                        />
                    </button>
                </div>
              </li>`;
      this.elements.incomeList.insertAdjacentHTML("beforeend", html);
    } else {
      html = `<li id="${data.id}" class="budget-list__item item item--expense">
                <div class="item__title">${data.desc}</div>
                <div class="item__right">
                    <div class="item__amount">
                        - ${data.val}
                        <div class="item__badge">
                            <div class="badge badge--dark">
                                
                            </div>
                        </div>
                    </div>
                    <button class="item__remove">
                        <img src="./img/circle-red.svg" alt="delete" />
                    </button>
                </div>
            </li>`;
      this.elements.expensesList.insertAdjacentHTML("beforeend", html);
    }

    this.calcExpRatio(budget);
  }

  removeItem(obj, data) {
    obj.closest("li").remove();
    this.calcExpRatio(data);
  }

  renderTotals(data) {
    this.elements.totalInc.textContent = "+ " + data.incTotal;
    this.elements.totalExp.textContent = "- " + data.expTotal;
    this.elements.totalExpPercentage.textContent = +data.expPercentage + "%";
    this.elements.budgetValue.textContent = +data.total;
  }

  clearInputs() {
    this.elements.inputDescription.value = "";
    this.elements.inputValue.value = "";
    this.elements.inputDescription.focus();
  }

  calcExpRatio(data) {
    if (data.expTotal == 0) {
      return false;
    }

    let expItems = document.querySelectorAll(".item--expense .badge--dark");

    expItems.forEach((elem, index) => {
      elem.textContent = data.exp[index].share + "%";
    });
  }
}
