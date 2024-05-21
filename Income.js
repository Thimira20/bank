// Load existing income data from localStorage when the page loads
document.addEventListener("DOMContentLoaded", function () {
  loadIncomeData();
});

function addIncome() {
  const incomeSource = document.getElementById("source1").value;
  const incomeDate = document.getElementById("Idate1").value;
  const incomeAmount = parseFloat(document.getElementById("IAmount1").value);

  if (isNaN(incomeAmount)) {
    alert("Please enter a valid amount.");
    return;
  }

  const table = document.getElementById("incomeTable");
  const newRow = table.insertRow(-1);
  const cell1 = newRow.insertCell(0);
  const cell2 = newRow.insertCell(1);
  const cell3 = newRow.insertCell(2);

  cell1.textContent = incomeSource;
  cell2.textContent = incomeDate;
  cell3.textContent = "$" + incomeAmount.toFixed(2);

  updateIncomeSummary(incomeAmount);
  saveIncomeData(incomeSource, incomeDate, incomeAmount);
  document.getElementById("incomeForm").reset(); // Reset the form

  updateIncomeSummaryInDashboard(incomeAmount);
}

function updateIncomeSummary(amount) {
  const incomeSummaryElement = document.getElementById("incomeSummary");
  const currentAmount = parseFloat(
    incomeSummaryElement.textContent.replace("$", "")
  );
  const newAmount = currentAmount + amount;
  incomeSummaryElement.textContent = "$" + newAmount.toFixed(2);

  localStorage.setItem("income", newAmount);
}

function saveIncomeData(source, date, amount) {
  // Get existing data from localStorage or initialize an empty array
  const existingData = JSON.parse(localStorage.getItem("incomeData")) || [];

  // Add the new income data
  existingData.push({
    source,
    date,
    amount,
  });

  // Save the updated data back to localStorage
  localStorage.setItem("incomeData", JSON.stringify(existingData));
}

function loadIncomeData() {
  // Load existing income data from localStorage
  const existingData = JSON.parse(localStorage.getItem("incomeData")) || [];

  // Populate the table with existing data
  const table = document.getElementById("incomeTable");
  existingData.forEach((item) => {
    const newRow = table.insertRow(-1);
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);

    cell1.textContent = item.source;
    cell2.textContent = item.date;
    cell3.textContent = "$" + item.amount.toFixed(2);

    updateIncomeSummary(item.amount);
  });
}

function resetIncome() {
  // Clear the saved income data from localStorage
  localStorage.removeItem("incomeData");
  localStorage.removeItem("income");

  // Reset the displayed table and summary
  const table = document.getElementById("incomeTable");
  const summaryElement = document.getElementById("incomeSummary");

  // Clear the table
  table.innerHTML =
    '<thead><tr><th class="TrHead">Date</th><th class="TrHead">Description</th><th class="TrHead">Amount</th></tr></thead><tbody id="incomeList"></tbody>';

  // Reset the summary
  summaryElement.textContent = "$0.00";
}

function updateIncomeSummaryInDashboard(amount) {
  // Update localStorage with the new income amount
  localStorage.setItem("income", amount);
}
