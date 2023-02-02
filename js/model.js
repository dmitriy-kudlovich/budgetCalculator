export default class Model {
  constructor() {
    this.budgetData = {
      inc: [],
      exp: [],
      total: 0,
      incTotal: 0,
      expTotal: 0,
      expPercentage: 0,
    };
  }

  setItem(data) {
    if (data.type == "inc") {
      return {
        id: data.type + "_" + this.generateID(data),
        type: data.type,
        desc: data.desc,
        val: +data.val,
      };
    }

    return {
      id: data.type + "_" + this.generateID(data),
      type: data.type,
      desc: data.desc,
      val: +data.val,
      share: 0,
    };
  }

  calcExpItemShare() {
    if (this.budgetData.exp.length == 1) {
      this.budgetData.exp[0].share = 100;
    } else {
      this.budgetData.exp.forEach((elem) => {
        elem.share = +((elem.val / this.budgetData.expTotal) * 100).toFixed(1);
      });
    }
  }

  generateID(data) {
    let arrId = [];

    if (data.type == "inc") {
      if (this.budgetData.inc.length == 0) {
        return 0;
      }

      arrId = this.budgetData.inc.map((elem) => {
        let idNum = elem.id.split("_").pop();
        return idNum;
      });

      return +arrId[arrId.length - 1] + 1;
    } else {
      if (this.budgetData.exp.length == 0) {
        return 0;
      }

      arrId = this.budgetData.exp.map((elem) => {
        let idNum = elem.id.split("_").pop();
        return idNum;
      });

      return +arrId[arrId.length - 1] + 1;
    }
  }

  addItem(data) {
    let newItem = this.setItem(data);

    if (newItem.type == "inc") {
      this.budgetData.inc.push(newItem);
    } else {
      this.budgetData.exp.push(newItem);
    }

    this.generateID(data.type);
    this.calcTotals();
    this.calcExpPercentage();
    this.calcExpItemShare();
    return newItem;
  }

  removeItem(id) {
    if (id.search("inc") != -1) {
      let arrId = this.budgetData.inc.map((elem) => {
        return elem.id;
      });
      let index = arrId.indexOf(id);

      this.budgetData.inc.splice(index, 1);
    } else {
      let arrId = this.budgetData.exp.map((elem) => {
        return elem.id;
      });
      let index = arrId.indexOf(id);

      this.budgetData.exp.splice(index, 1);
    }

    this.calcTotals();
    this.calcExpPercentage();
    this.calcExpItemShare();
  }

  calcTotals() {
    let incomes = this.budgetData.inc.map((elem) => {
      return +elem.val;
    });
    let expenses = this.budgetData.exp.map((elem) => {
      return +elem.val;
    });

    if (incomes.length > 0) {
      this.budgetData.incTotal = +incomes
        .reduce((accum, current) => accum + current, 0)
        .toFixed(2);
    } else {
      this.budgetData.incTotal = 0;
    }

    if (expenses.length > 0) {
      this.budgetData.expTotal = +expenses
        .reduce((accum, current) => accum + current, 0)
        .toFixed(2);
    } else {
      this.budgetData.expTotal = 0;
    }

    this.budgetData.total = +(
      this.budgetData.incTotal - this.budgetData.expTotal
    ).toFixed(2);
  }

  calcExpPercentage() {
    if (this.budgetData.incTotal == 0) {
      this.budgetData.expPercentage = 100;
      return +this.budgetData.expPercentage;
    }

    this.budgetData.expPercentage = Math.round(
      (this.budgetData.expTotal / this.budgetData.incTotal) * 100
    );
  }
}
