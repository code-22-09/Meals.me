const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let currentDayIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  showDateTime();
  loadMeals();
  setInterval(showDateTime, 1000);
});

function showDateTime() {
  const now = new Date();
  const dateTime = now.toLocaleString();
  document.getElementById("dateTime").textContent = dateTime;
}

function switchDay(offset) {
  currentDayIndex = (currentDayIndex + offset + 7) % 7;
  document.getElementById("currentDay").textContent = days[currentDayIndex];
  loadMeals();
}

function saveMeals() {
  const form = document.getElementById("mealForm");
  const meals = {
    morning: form.morning.checked,
    lunch: form.lunch.checked,
    mid: form.mid.checked,
    supper: form.supper.checked
  };

  // Enforce Lunch and Supper as required
  if (!meals.lunch || !meals.supper) {
    alert("Make sure you've confirmed both Lunch and Supper ✅");
    return;
  }

  localStorage.setItem(days[currentDayIndex], JSON.stringify(meals));
  alert("Meals saved for " + days[currentDayIndex]);
}

function loadMeals() {
  const form = document.getElementById("mealForm");
  const saved = JSON.parse(localStorage.getItem(days[currentDayIndex])) || {};
  form.morning.checked = saved.morning || false;
  form.lunch.checked = saved.lunch || false;
  form.mid.checked = saved.mid || false;
  form.supper.checked = saved.supper || false;
  document.getElementById("currentDay").textContent = days[currentDayIndex];
}

function exportMeals() {
  let output = "My Weekly Meal Tracker\n\n";
  days.forEach(day => {
    const meals = JSON.parse(localStorage.getItem(day));
    output += `📅 ${day}\n`;
    if (meals) {
      output += ` - Morning: ${meals.morning ? "✅" : "❌"}\n`;
      output += ` - Lunch: ${meals.lunch ? "✅" : "❌"}\n`;
      output += ` - Mid-Afternoon: ${meals.mid ? "✅" : "❌"}\n`;
      output += ` - Supper: ${meals.supper ? "✅" : "❌"}\n\n`;
    } else {
      output += " - No data\n\n";
    }
  });

  const blob = new Blob([output], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "meal_log.txt";
  a.click();
}
