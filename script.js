/* General styles */
body {
  font-family: 'Segoe UI', sans-serif;
  margin: 0;
  padding: 0;
  background: #f4f6fa;
  color: #333;
}

header {
  text-align: center;
  background: #1abc9c;
  color: white;
  padding: 20px 10px;
}

h1 {
  margin: 0;
  font-size: 2rem;
}

p {
  margin-top: 5px;
  font-size: 1rem;
}

main#tracker {
  padding: 20px;
  max-width: 1000px;
  margin: auto;
}

.day-section {
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

.day-section h2 {
  margin-top: 0;
  color: #16a085;
}

/* Inputs */
.meal-inputs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.meal-inputs input,
.meal-inputs select {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  min-width: 130px;
}

.meal-inputs button {
  background: #1abc9c;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
}

.meal-inputs button:hover {
  background: #16a085;
}

.meal-list {
  list-style: none;
  padding-left: 0;
  margin-top: 10px;
}

.meal-list li {
  padding: 6px 0;
  border-bottom: 1px solid #eee;
}

.total-cost {
  font-weight: bold;
  margin-top: 10px;
  color: #e67e22;
}

/* Action buttons */
.actions {
  text-align: center;
  margin: 30px 0;
}

.actions button {
  margin: 0 10px;
  padding: 12px 20px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  background: #3498db;
  color: white;
  cursor: pointer;
}

.actions button:hover {
  background: #2980b9;
}

#pdf-note {
  display: block;
  width: 90%;
  max-width: 800px;
  margin: 10px auto;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
}
  
