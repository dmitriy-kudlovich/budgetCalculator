export default class View {
  constructor(data) {
    this.renderTotals(data);
    this.setDate();
  }

  elements = {
    month: document.querySelector("#month"),
    year: document.querySelector("#year"),
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

  getDate() {
    let now = new Date();
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let currentMonth = now.getMonth();

    let currentDate = {
      year: now.getFullYear(),
      month: months[currentMonth],
    };

    return currentDate;
  }

  setDate() {
    month.textContent = this.getDate().month;
    year.textContent = this.getDate().year;
  }

  getInput() {
    if (
      this.elements.inputDescription.value == "" ||
      this.elements.inputValue.value <= 0 ||
      isNaN(+this.elements.inputValue.value.split(",").join("."))
    ) {
      alert("Введите описание и сумму больше нуля");
      return false;
    }

    return {
      type: this.elements.intputType.value,
      desc: this.elements.inputDescription.value,
      val: (+this.elements.inputValue.value.split(",").join(".")).toFixed(2),
    };
  }

  formatNumber(initNum) {
    let numFormated = "";
    let num = String(initNum).split(".")[0];

    for (let i = 0; i < num.length / 3; i++) {
      numFormated =
        " " +
        num.substring(num.length - 3 * (i + 1), num.length - 3 * i) +
        numFormated;
    }

    numFormated = numFormated.split("");
    numFormated.shift();
    numFormated = numFormated.join("");

    if (initNum % 1 != 0) {
      numFormated = numFormated + "." + String(initNum).split(".")[1];
    }
    return numFormated;
  }

  renderItem(data, budget) {
    let html;
    let value = this.formatNumber(data.val);

    if (data.type == "inc") {
      html = `<li id="${data.id}" class="budget-list__item item item--income">
                <div class="item__title">${data.desc}</div>
                <div class="item__right">
                    <div class="item__amount">+ ${value}</div>
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
                        - ${value}
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
    this.elements.totalInc.textContent =
      "+ " + this.formatNumber(+data.incTotal.toFixed(2));
    this.elements.totalExp.textContent =
      "- " + this.formatNumber(+data.expTotal.toFixed(2));
    this.elements.totalExpPercentage.textContent = +data.expPercentage + "%";
    this.elements.budgetValue.textContent = this.formatNumber(+data.total);
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
