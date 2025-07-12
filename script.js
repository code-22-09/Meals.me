const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function createDaySection(day) {
  const section = document.createElement("section");
  section.className = "day-section";
  section.innerHTML = `
    <h2>${day}</h2>
    <div class="meal-inputs">
      <select class="meal-type">
        <option value="">Select Meal</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Mid-Afternoon">Mid-Afternoon</option>
        <option value="Supper">Supper</option>
      </select>
      <input type="text" placeholder="Meal name" class="meal-name" />
      <input type="number" placeholder="Cost (Ksh)" class="meal-cost" />
      <button onclick="addMeal(this)">Add Meal</button>
    </div>
    <ul class="meal-list"></ul>
    <p class="total-cost">Total: Ksh 0</p>
  `;
  return section;
}

function addMeal(button) {
  const section = button.closest("section");
  const mealType = section.querySelector(".meal-type").value;
  const mealName = section.querySelector(".meal-name").value;
  const mealCost = parseFloat(section.querySelector(".meal-cost").value);

  if (!mealType || !mealName || isNaN(mealCost)) {
    alert("Fill in all fields correctly!");
    return;
  }

  const li = document.createElement("li");
  li.textContent = `${mealType}: ${mealName} - Ksh ${mealCost}`;
  section.querySelector(".meal-list").appendChild(li);

  section.querySelector(".meal-name").value = "";
  section.querySelector(".meal-cost").value = "";

  updateTotal(section);
}

function updateTotal(section) {
  let total = 0;
  section.querySelectorAll(".meal-list li").forEach(li => {
    const cost = parseFloat(li.textContent.split("Ksh ")[1]);
    if (!isNaN(cost)) total += cost;
  });
  section.querySelector(".total-cost").textContent = `Total: Ksh ${total}`;
}

function exportToPDF() {
  const element = document.getElementById("tracker");
  const currentTime = new Date().toLocaleString();
  const opt = {
    margin: 0.5,
    filename: `meal-log-${currentTime.replace(/[/,: ]/g, "_")}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
}

// Init
window.onload = () => {
  const tracker = document.getElementById("tracker");
  daysOfWeek.forEach(day => {
    tracker.appendChild(createDaySection(day));
  });
};
