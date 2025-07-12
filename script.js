const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let currentDayIndex = 0;

function addNextDay() {
  if (currentDayIndex >= days.length) {
    alert("You've added all 7 days!");
    return;
  }

  const tracker = document.getElementById("tracker");
  const day = days[currentDayIndex];
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
  tracker.appendChild(section);
  currentDayIndex++;
}

function addMeal(button) {
  const section = button.closest("section");
  const type = section.querySelector(".meal-type").value;
  const name = section.querySelector(".meal-name").value;
  const cost = parseFloat(section.querySelector(".meal-cost").value);

  if (!type || !name || isNaN(cost)) {
    alert("Fill in all fields correctly!");
    return;
  }

  const li = document.createElement("li");
  li.textContent = `${type}: ${name} - Ksh ${cost}`;
  section.querySelector(".meal-list").appendChild(li);

  section.querySelector(".meal-name").value = "";
  section.querySelector(".meal-cost").value = "";

  updateTotal(section);
}

function updateTotal(section) {
  let total = 0;
  section.querySelectorAll("li").forEach(li => {
    const cost = parseFloat(li.textContent.split("Ksh ")[1]);
    if (!isNaN(cost)) total += cost;
  });
  section.querySelector(".total-cost").textContent = `Total: Ksh ${total}`;
}

function exportToPDF() {
  const tracker = document.getElementById("tracker");
  const note = document.getElementById("pdf-note").value;
  const timeNow = new Date().toLocaleString();

  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
    <div style="text-align:center; font-size:18px; margin-bottom:10px;">
      <strong>${note || 'Meal Report'}</strong><br/>
      <em>${timeNow}</em>
    </div>
  `;
  wrapper.appendChild(tracker.cloneNode(true));

  html2pdf().set({
    margin: 0.5,
    filename: `meal-log-${Date.now()}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  }).from(wrapper).save();
}
