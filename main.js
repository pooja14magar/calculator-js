const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

const specialChars = ["%", "*", "/", "-", "+", "="];

let output = "";

// Function to calculate based on button clicked.
const calculate = (btnValue) => {
    if (btnValue === "=" && output !== "") {
        try {
            // Replace '%' with '/100' before evaluating.
            output = eval(output.replace("%", "/100"));
        } catch (e) {
            output = "Error"; // In case of an invalid expression.
        }
    } else if (btnValue === "AC") {
        output = ""; // Clear the output.
    } else if (btnValue === "DEL") {
        output = output.toString().slice(0, -1); // Remove the last character.
    } else {
        // Prevent adding a special character at the start.
        if (output === "" && specialChars.includes(btnValue)) return;
        
        // Prevent multiple consecutive operators like '++', '**'.
        if (specialChars.includes(btnValue) && specialChars.includes(output.slice(-1))) return;
        
        // Append the clicked button value to the output.
        output += btnValue;
    }

    // Display the updated output.
    display.value = output;
};

// Add event listener to buttons, call calculate() on click.
buttons.forEach((button) => {
    button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});
