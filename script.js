const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");
let output = "";

// Define a function to validate input
const isValidInput = (btnValue) => {
  return /^[0-9+\-*/%.]+$/.test(btnValue);
};

// Define function to calculate based on button clicked.
const calculate = (btnValue) => {
  display.focus();

  if (btnValue === "=" && output !== "") {
    // Check if the expression is valid before evaluating
    if (isValidInput(output)) {
      try {
        // If the expression is valid, evaluate it
        output = eval(output.replace("%", "/100"));
      } catch (error) {
        // Handling expression errors
        alert("Invalid expression");
        output = "";
      }
    } else {
      // Display an alert for invalid input
      alert("Invalid input");
      output = "";
    }
  } else if (btnValue === "AC") {
    output = "";
  } else if (btnValue === "DEL") {
    // If DEL button is clicked, remove the last character from the output.
    output = output.toString().slice(0, -1);
  } else {
    // Check if the input is a valid character
    if (isValidInput(btnValue)) {
      output += btnValue;
    } else {
      // Display an alert for invalid input
      alert("Invalid input");
    }
  }
  display.value = output;
};

// Handle keyboard events to prevent invalid input (letters)
document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (!isValidInput(key) && key !== "Enter") {
    e.preventDefault();
    alert("Invalid input");
  }
});

// Button values and their respective IDs for the calculator
const buttonValues = [
  { id: "clear", text: "AC" },
  { id: "equal", text: "=" },
  { id: "add", text: "+" },
  { id: "subtract", text: "-" },
  { id: "multiply", text: "*" },
  { id: "divide", text: "/" },
  { id: "percentage", text: "%" },
  { id: "seven", text: "7" },
  { id: "eight", text: "8" },
  { id: "nine", text: "9" },
  { id: "four", text: "4" },
  { id: "five", text: "5" },
  { id: "six", text: "6" },
  { id: "one", text: "1" },
  { id: "two", text: "2" },
  { id: "three", text: "3" },
  { id: "zero", text: "0" },
  { id: "double-zero", text: "00" },
  { id: "decimal", text: "." },
];

// Loop through the buttonValues array and create buttons
buttonValues.forEach((btn) => {
  const button = document.createElement("button");
  button.textContent = btn.text;
  button.id = btn.id; // Set the button's ID
  button.addEventListener("click", (e) => calculate(e.target.textContent));
  buttons.appendChild(button);
});
