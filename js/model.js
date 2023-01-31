export default class Model {
  constructor() {
    this.budgetData = {
      inc: [],
      exp: [],
      incTotal: 0,
      expTotal: 0,
      expPercentage: 0,
    };
  }

  setItem(data) {
    return {
      id: this.generateID(),
      type: data.type,
      desc: data.desc,
      val: data.val,
    };
  }

  generateID() {
    let counterId = 0;
    let incLength = this.budgetData.inc.length;
    let expLength = this.budgetData.exp.length;

    if (incLength == 0 && expLength == 0) {
      return counterId;
    }

    counterId = incLength + expLength;
    return counterId;
  }

  addItem(data) {
    let newItem = this.setItem(data);

    if (newItem.type == "inc") {
      this.budgetData.inc.push(newItem);
    } else {
      this.budgetData.exp.push(newItem);
    }

    this.calcTotals(newItem);
    this.calcExpPercentage();
    return newItem;
  }

  calcTotals(data) {
    if (data.type == "inc") {
      this.budgetData.incTotal = this.budgetData.incTotal + +data.val;
    } else {
      this.budgetData.expTotal = this.budgetData.expTotal + +data.val;
    }
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
