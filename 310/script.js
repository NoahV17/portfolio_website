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
    const regression = new ML.SimpleLinearRegression(x, y);

    // Get the slope and intercept of the regression line
    const slope = regression.slope;
    const intercept = regression.intercept;

    // Use the model to make a prediction
    const prediction = regression.predict(80);

    // Output model stats
    document.getElementById("output1").innerText = 'Slope: ' + slope + '\n' +
                                                   'Intercept: ' + intercept;
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