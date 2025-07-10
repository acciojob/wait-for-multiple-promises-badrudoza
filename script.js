window.onload = function () {
  // Function to simulate a promise that resolves in 1–3 seconds
  function createRandomPromise(index) {
    const start = Date.now();
    const delay = Math.random() * 2000 + 1000; // 1s to 3s

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

  // Show "Loading..." initially (this is what Cypress checks)
  output.innerHTML = `<tr><td colspan="2">Loading...</td></tr>`;

  // Start the timer after loading text is set
  const startAll = Date.now();

  // Create 3 promises
  const promises = [
    createRandomPromise(1),
    createRandomPromise(2),
    createRandomPromise(3),
  ];

  // Wait for all to resolve
  Promise.all(promises).then((results) => {
    const endAll = Date.now();
    const totalTime = ((endAll - startAll) / 1000).toFixed(3);

    // Clear the "Loading..." row
    output.innerHTML = "";

    // Add each promise's result
    results.forEach((res) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${res.name}</td><td>${res.time}</td>`;
      output.appendChild(row);
    });

    // Add total row
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `<td><strong>Total</strong></td><td><strong>${totalTime}</strong></td>`;
    output.appendChild(totalRow);
  });
};
