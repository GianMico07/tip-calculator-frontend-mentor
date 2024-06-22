//total bill = total
//select tip = percentage
//total people = people
//reset button = reset

let bill = document.getElementById("bill");
let people = document.getElementById("people");
let tip = document.getElementsByName("percentage");
let custom = document.getElementById("percentInput");
let reset = document.getElementById("reset");
let notCustom = 0;

bill.addEventListener("keyup", evaluate);
people.addEventListener("keyup", evaluate);
custom.addEventListener("keyup", evaluate);
reset.addEventListener("keyup", evaluate);

reset.addEventListener("click", resetForm, true);

for (let i = 0; i < 5; i++) {
  tip[i].addEventListener("click", evaluate);
}

function evaluate() {
  activeResetBtn();
  if (!evaluateInput(bill, "billError")) {
    return;
  }

  if (!evaluateInput(people, "zeroError")) {
    return;
  }

  if (evaluateInput(custom, "")) {
    compute(
      parseFloat(custom.value / 100),
      parseFloat(bill.value),
      parseFloat(people.value)
    );
  } else {
    getTip();
    compute(
      parseFloat(notCustom),
      parseFloat(bill.value),
      parseFloat(people.value)
    );
  }
}

function activeResetBtn() {
  if (
    bill.value !== "" ||
    bill.value > 0 ||
    people.value !== "" ||
    people.value > 0
  ) {
    reset.style.cursor = "pointer";
    reset.classList.add("btn-active");
    reset.addEventListener("click", resetForm, true);
  } else {
    reset.style.cursor = "not-allowed";
    reset.classList.remove("btn-active");
    reset.removeEventListener("click", resetForm, true);
  }
}

function getTip() {
  for (let i = 0; i < 5; i++) {
    if (tip[i].checked) {
      notCustom = tip[i].value;
    }
  }
}

function evaluateInput(type, ID) {
  console.log(type);
  if (ID === "") {
    if (type.value > 0) {
      clearRadios();
      return true;
    }
    return false;
  }

  if (type.value === "" || type.value <= 0) {
    document.getElementById("zeroError").style.display = "block";
    document.getElementById("tip-amount").innerText = "0.00";
    return false;
  } else {
    document.getElementById("zeroError").style.display = "none";
    document.getElementById("no-of-people-input").style.border =
      "2.5px solid hsl(189, 41%, 97%)";
    return true;
  }
}

function compute(fTip, fBill, fPeople) {
  let tipAmount = (fBill * fTip) / fPeople;
  let total = (fBill * fTip + fBill) / fPeople;
  document.getElementById("tip-amount").innerText = tipAmount.toFixed(2);
  document.getElementById("total").innerText = total.toFixed(2);
}

function clearRadios() {
  for (let i = 0; i < 5; i++) {
    tip[i].checked = false;
  }
}

function resetForm() {
  bill.value = "";
  people.value = "";
  clearRadios();
  custom.value = "";
  document.getElementById("tip-amount").innerText = "0.00";
  document.getElementById("total").innerText = "0.00";
  document.getElementById("zeroError").style.display = "none";
  activeResetBtn();
}
