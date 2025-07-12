function getFormattedData() {
  const days = document.querySelectorAll(".day-section");
  let text = "";
  days.forEach(day => {
    const title = day.querySelector("h2").innerText;
    const meals = day.querySelectorAll(".meal");
    text += `${title}\n`;
    meals.forEach(meal => {
      const mealName = meal.querySelector(".meal-name").innerText || "Unnamed Meal";
      const cost = meal.querySelector(".meal-cost").innerText || "0";
      text += ` - ${mealName} | Cost: ${cost}\n`;
    });
    text += "\n";
  });
  return text;
}

function exportToTXT() {
  const content = getFormattedData();
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "meal_log.txt";
  a.click();
  URL.revokeObjectURL(url);
}

function exportToDOCX() {
  const content = getFormattedData();
  const { Document, Packer, Paragraph } = window.docx;

  const doc = new Document({
    sections: [{
      properties: {},
      children: content.split("\n").map(line => new Paragraph(line)),
    }],
  });

  Packer.toBlob(doc).then(blob => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "meal_log.docx";
    a.click();
    URL.revokeObjectURL(url);
  });
}

function calculateDaySpending() {
  const days = document.querySelectorAll(".day-section");
  const labels = [];
  const totals = [];

  days.forEach(day => {
    const title = day.querySelector("h2").innerText;
    const meals = day.querySelectorAll(".meal-cost");
    let total = 0;
    meals.forEach(meal => {
      const costText = meal.innerText.trim().replace(/[^0-9.]/g, "");
      total += parseFloat(costText) || 0;
    });
    labels.push(title);
    totals.push(total);
  });

  return { labels, totals };
}

function drawSpendingChart() {
  const { labels, totals } = calculateDaySpending();
  const ctx = document.getElementById('spendingChart').getContext('2d');

  if (window.myChart) window.myChart.destroy();

  window.myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Money Spent Per Day (KSh)',
        data: totals,
        backgroundColor: '#4caf50',
        borderColor: '#388e3c',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'KSh' }
        },
        x: {
          title: { display: true, text: 'Days of the Week' }
        }
      }
    }
  });
}

window.onload = drawSpendingChart;
