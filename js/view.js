export default class View {
  constructor(data) {
    this.budgetValue = document.querySelector("#budget-value");
    this.totalInc = document.querySelector("#totalInc");
    this.totalIncPercentage = document.querySelector("#totalIncPercentage");
    this.totalExp = document.querySelector("#totalExp");
    this.totalExpPercentage = document.querySelector("#totalExpPercentage");
    this.intputType = document.querySelector("#input__type");
    this.inputDescription = document.querySelector("#input__description");
    this.inputValue = document.querySelector("#input__value");
    this.submitBtn = document.querySelector("#submit-btn");
    this.incomeList = document.querySelector("#income__list");
    this.expensesList = document.querySelector("#expenses__list");

    this.renderTotals(data);
  }

  getInput() {
    if (
      this.inputDescription.value == "" ||
      this.inputValue.value <= 0 ||
      isNaN(this.inputValue.value)
    ) {
      alert("Введите описание и сумму больше нуля");
      return false;
    }

    return {
      type: this.intputType.value,
      desc: this.inputDescription.value,
      val: +this.inputValue.value,
    };
  }

  renderItem(data, id) {
    let html;

    if (data.type == "inc") {
      html = `<li id="${data.type}_${id}" class="budget-list__item item item--income">
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
      this.incomeList.insertAdjacentHTML("beforeend", html);
    } else {
      html = `<li id="${data.type}_${id}" class="budget-list__item item item--expense">
                <div class="item__title">${data.desc}</div>
                <div class="item__right">
                    <div class="item__amount">
                        - ${data.val}
                        <div class="item__badge">
                            <div class="badge badge--dark">
                                15%
                            </div>
                        </div>
                    </div>
                    <button class="item__remove">
                        <img src="./img/circle-red.svg" alt="delete" />
                    </button>
                </div>
            </li>`;
      this.expensesList.insertAdjacentHTML("beforeend", html);
    }
  }

  renderTotals(data) {
    this.totalInc.textContent = "+ " + data.incTotal;
    this.totalExp.textContent = "- " + data.expTotal;
    this.totalExpPercentage.textContent = +data.expPercentage + "%";
    this.budgetValue.textContent = +data.incTotal - +data.expTotal;

    this.calcExpRatio(data);
  }

  clearInputs() {
    this.inputDescription.value = "";
    this.inputValue.value = "";
    this.inputDescription.focus();
  }

  calcExpRatio(data) {
    if (data.expTotal == 0) {
      return false;
    }

    let expItems = document.querySelectorAll(".item--expense .item__amount");

    expItems.forEach((e) => {
      let totalExpCurrent = +this.totalExp.textContent
        .trim()
        .split(" ")
        .join("");

      let out = e.children[0].children[0];
      let rez =
        (+e.firstChild.textContent.trim().split(" ").join("") /
          totalExpCurrent) *
        100;

      if (rez == 100) {
        out.textContent = rez + "%";
      } else {
        out.textContent = rez.toFixed(1) + "%";
      }
    });
  }
}
