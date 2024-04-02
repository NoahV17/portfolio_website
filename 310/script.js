function trainAndOutput() {
  // Get selected columns
  const xColumn = document.getElementById('x-select').value;
  const yColumn = document.getElementById('y-select').value;

  // Load CSV data
  d3.csv('mlb_salaries.csv').then(data => {
    // Map selected columns to x and y arrays
    const x = data.map(row => +row[xColumn]);
    const y = data.map(row => +row[yColumn]);

    // Train model
    const { bestScore, bestDegree } = calculateBestDegree(x, y);
    const regression = trainModel(x, y, bestDegree);
    const prediction = regression.predict(80);

    // Output model stats
    document.getElementById("output1").innerText = 'Best Degree: ' + bestDegree + '\n' +
                             'Best Score: ' + bestScore;
    document.getElementById("output2").innerText = 'Prediction: ' + prediction;

    // Plot data
    const trace = {
      x: x,
      y: y,
      mode: 'markers',
      type: 'scatter'
    };
    const layout = {
      title: 'Scatter Plot',
      xaxis: { title: xColumn },
      yaxis: { title: yColumn }
    };
    Plotly.newPlot('graph', [trace], layout);
  });
}