//your JS code here. If required.
// Function to simulate a promise that resolves in 1–3 seconds with time info
function createRandomPromise(index) {
  const start = Date.now();
  const delay = Math.random() * 2000 + 1000; // 1000ms to 3000ms

  return new Promise((resolve) => {
    setTimeout(() => {
      const end = Date.now();
      const timeTaken = (end - start) / 1000;
      resolve({ name: `Promise ${index}`, time: timeTaken.toFixed(3) });
    }, delay);
  });
}

// Get the table body
const output = document.getElementById("output");

// Record start time before promises begin
const startAll = Date.now();

// Show "Loading..." initially
output.innerHTML = `<tr><td colspan="2">Loading...</td></tr>`;

// Create 3 promises
const promises = [
  createRandomPromise(1),
  createRandomPromise(2),
  createRandomPromise(3),
];

// Wait for all promises to resolve
Promise.all(promises).then((results) => {
  // Calculate total time taken (maximum of all)
  const endAll = Date.now();
  const totalTime = ((endAll - startAll) / 1000).toFixed(3);

  // Clear the loading row
  output.innerHTML = "";

  // Add each promise's result to the table
  results.forEach((res) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${res.name}</td><td>${res.time}</td>`;
    output.appendChild(row);
  });

  // Add total time row
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `<td><strong>Total</strong></td><td><strong>${totalTime}</strong></td>`;
  output.appendChild(totalRow);
});
