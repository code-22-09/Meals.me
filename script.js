const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let currentDayIndex = 0;

document.getElementById("addDayBtn").addEventListener("click", () => {
  if (currentDayIndex < daysOfWeek.length) {
    addDaySection(daysOfWeek[currentDayIndex]);
    currentDayIndex++;
  } else {
    alert("All 7 days already added!");
  }
});

document.getElementById("exportBtn").addEventListener("click", () => {
  const element = document.getElementById("exportArea");
  html2pdf().from(element).save(`meal_log_${new Date().toISOString()}.pdf`);
});

function addDaySection(dayName) {
  const container = document.getElementById("daysContainer");

  const section = document.createElement("div");
  section.className = "day-section";

  const heading = document.createElement("h2");
  heading.textContent = `${dayName} (${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()})`;
  section.appendChild(heading);

  const meals = ["Breakfast", "Lunch", "Supper"];

  meals.forEach(meal => {
    const mealDiv = document.createElement("div");
    mealDiv.className = "meal-entry";

    const label = document.createElement("label");
    label.textContent = `${meal}:`;
    mealDiv.appendChild(label);

    const select = document.createElement("select");
    select.innerHTML = `
      <option value="">-- Did you eat? --</option>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    `;
    mealDiv.appendChild(select);

    const costInput = document.createElement("input");
    costInput.type = "number";
    costInput.placeholder = "Meal Cost (KES)";
    costInput.min = 0;
    mealDiv.appendChild(costInput);

    costInput.addEventListener("input", updateTotalCost);

    section.appendChild(mealDiv);
  });

  // Daily total line
  const dayTotal = document.createElement("p");
  dayTotal.className = "daily-total";
  dayTotal.style.fontWeight = "bold";
  dayTotal.style.marginTop = "10px";
  dayTotal.textContent = `Day Total: KES 0.00`;
  section.appendChild(dayTotal);

  container.appendChild(section);
}

function updateTotalCost() {
  const allDaySections = document.querySelectorAll(".day-section");
  let weeklyTotal = 0;

  allDaySections.forEach(section => {
    const inputs = section.querySelectorAll("input[type='number']");
    let dailyTotal = 0;

    inputs.forEach(input => {
      const value = parseFloat(input.value);
      if (!isNaN(value)) {
        dailyTotal += value;
      }
    });

    const dayTotalElem = section.querySelector(".daily-total");
    if (dayTotalElem) {
      dayTotalElem.textContent = `Day Total: KES ${dailyTotal.toFixed(2)}`;
    }

    weeklyTotal += dailyTotal;
  });

  document.getElementById("totalCost").textContent = `Total Weekly Cost: KES ${weeklyTotal.toFixed(2)}`;
}
