function CreateData(type, desc, val) {
  this.type = type;
  this.desc = desc;
  this.val = val;
}

let data = [
  new CreateData("inc", "Wage", 100000),
  new CreateData("inc", "Freelance", 50000),
  new CreateData("inc", "Flat lending", 30000),
  new CreateData("inc", "Invest", 1000),
  new CreateData("exp", "Biil for flat", 9000),
  new CreateData("exp", "Food", 30000),
  new CreateData("exp", "Payment for transport", 2000),
  new CreateData("exp", "Study", 10000),
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
