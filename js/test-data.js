function CreateData(type, desc, val) {
  this.type = type;
  this.desc = desc;
  this.val = val;
}

let data = [
  new CreateData("inc", "Зарплата", 100000),
  new CreateData("inc", "Фриланс", 50000),
  new CreateData("inc", "Сдача квартиры", 30000),
  new CreateData("inc", "Инвестиции", 1000),
  new CreateData("exp", "Коммуналка", 9000),
  new CreateData("exp", "Еда", 30000),
  new CreateData("exp", "Оплата проезда", 2000),
  new CreateData("exp", "Оплата обучения", 10000),
];

function getRandomNumber() {
  return Math.floor(Math.random() * data.length);
}

function getRandomData() {
  return data[getRandomNumber()];
}

export default function fillInputs() {
  let data = getRandomData();

  document.querySelector("#input__type").value = data.type;
  document.querySelector("#input__description").value = data.desc;
  document.querySelector("#input__value").value = data.val;
}
