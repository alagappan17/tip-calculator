const billAmountElement = document.querySelector("#bill-amount");
const peopleCountElement = document.querySelector("#people-count");
const tipPercentageElements = document.querySelectorAll(".tip-radio");
const customTipElement = document.querySelector("#custom-tip");
const tipAmountElement = document.querySelector("#tip-amount-display");
const totalAmountElement = document.querySelector("#total-amount-display");
const resetButton = document.querySelector("#reset-button");

let billAmount = 0;
let peopleCount = 1;
let tipPercentage = 0;
let tipAmount = 0;
let totalAmount = 0;

billAmountElement.addEventListener("input", () => {
  if (billAmountElement.value == "" || billAmountElement.value == NaN) {
    billAmount = 0;
    displayAmounts();
    return;
  }
  billAmount = parseFloat(billAmountElement.value);
  //   console.log("Bill Amount: ", billAmount);
  displayAmounts();
});

peopleCountElement.addEventListener("input", () => {
  if (peopleCountElement.value == "" || peopleCountElement.value == NaN) {
    peopleCount = 1;
    displayAmounts();
    return;
  }
  peopleCount = parseInt(peopleCountElement.value);
  //   console.log("People Count: ", peopleCount);
  displayAmounts();
});

customTipElement.addEventListener("input", () => {
  if (customTipElement.value == "" || customTipElement.value == NaN) {
    tipPercentage = 0;
    displayAmounts();
    return;
  }
  tipPercentage = parseFloat(customTipElement.value);
  //   console.log("Tip Percentage: ", tipPercentage);
  displayAmounts();
});

tipPercentageElements.forEach((radioButton) => {
  radioButton.addEventListener("input", () => {
    // console.log("All Elements: ", tipPercentageElements);
    // console.log("Selected Element: ", radioButton);
    changeActiveElement();
    tipPercentage = radioButton.value;
    // console.log("Selected Tip Percentage: ", tipPercentage);
    displayAmounts();
  });
});

const changeActiveElement = () => {
  tipPercentageElements.forEach((radioButton) => {
    if (radioButton.checked) {
      radioButton.parentElement.classList.add("active-tip");
    } else {
      radioButton.parentElement.classList.remove("active-tip");
    }
  });
};

const calculateTipAmount = () => {
  tipAmount = (billAmount * (tipPercentage / 100)) / peopleCount;
  tipAmountElement.textContent = tipAmount.toFixed(2);
};

const calculateTotalAmount = () => {
  totalAmount = (billAmount + tipAmount) / peopleCount;
  totalAmountElement.textContent = totalAmount.toFixed(2);
};

const setResetButtonState = () => {
  if (billAmount == 0 && peopleCount == 1 && tipPercentage == 0) {
    resetButton.setAttribute("disabled", "");
    resetButton.classList.add("button-disabled");
    resetButton.classList.remove("button-enabled");
  } else {
    resetButton.removeAttribute("disabled");
    resetButton.classList.remove("button-disabled");
    resetButton.classList.add("button-enabled");
  }
};

const displayAmounts = () => {
  setResetButtonState();
  calculateTipAmount();
  calculateTotalAmount();
};

const reset = () => {
  billAmount = 0;
  peopleCount = 1;
  tipPercentage = 0;
  peopleCountElement.value = "";
  billAmountElement.value = "";
  customTipElement.value = "";
  tipPercentageElements.forEach((radioButton) => {
    radioButton.parentElement.classList.remove("active-tip");
    radioButton.parentElement.classList.add("tip-option");
  });
  displayAmounts();
};
