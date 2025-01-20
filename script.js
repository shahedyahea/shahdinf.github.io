// Save inputs and selected script to localStorage
function saveToLocalStorage(script, textInputValue) {
  const settings = {
      script,
      textInputValue,
  };
  localStorage.setItem("appSettings", JSON.stringify(settings));
}

// Load settings from localStorage
function loadFromLocalStorage() {
  const settings = JSON.parse(localStorage.getItem("appSettings"));
  return settings || { script: "Ceasar Cipher.js", textInputValue: "" };
}

// Apply settings on page load
function applySettings(settings) {
  const { script, textInputValue } = settings;

  // Set the input field value
  document.getElementById("textInput").value = textInputValue;

  // Set the selected script
  const algorithmSelect = document.getElementById("algorithm");
  algorithmSelect.value = script;

  // Add the script file dynamically
  const scriptElement = document.createElement("script");
  scriptElement.id = "algorithm-file";
  scriptElement.src = script + '?v=' + new Date().getTime(); // Cache-busting
  document.body.appendChild(scriptElement);
}

// Add event listeners to handle input changes
document.addEventListener("DOMContentLoaded", () => {
  const settings = loadFromLocalStorage();
  applySettings(settings);

  const textInput = document.getElementById("textInput");
  const algorithmSelect = document.getElementById("algorithm");

  textInput.addEventListener("input", () => {
      saveToLocalStorage(algorithmSelect.value, textInput.value);
  });

  algorithmSelect.addEventListener("change", () => {
      saveToLocalStorage(algorithmSelect.value, textInput.value);
      location.reload(); 
  });
});
