function trainAndOutput() {
  // Get selected columns
  const xColumn = document.getElementById('x-select').value;
  const yColumn = document.getElementById('y-select').value;
  xpredict = document.getElementById('XpredictY').value;

  // Load CSV data
  d3.csv('heart.csv').then(data => {
    // Map selected columns to x and y arrays
    const x = data.map(row => +row[xColumn]);
    const y = data.map(row => +row[yColumn]);

    // Train model
    const regression = new ML.SimpleLinearRegression(x, y);

    // Get the slope and intercept of the regression line
    const slope = regression.slope;
    const intercept = regression.intercept;

    // Use the model to make a prediction
    const xpredictInt = parseInt(xpredict);
    const prediction = regression.predict(xpredictInt);

    // Output model stats
    document.getElementById("output1").innerText = 'Slope: ' + slope.toFixed(2) + '\n' +
                                                   'Intercept: ' + intercept.toFixed(2);
    document.getElementById("output2").innerText = 'Prediction: ' + prediction.toFixed(2);

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
    
    // Calculate y values for the line
    const xLine = x;
    const yLine = xLine.map(xValue => slope * xValue + intercept);

    // Create a trace for the line
    const lineTrace = {
      x: xLine,
      y: yLine,
      mode: 'lines',
      name: 'Regression Line'
    };

    // Add the line trace to the plot
    Plotly.newPlot('graph', [trace, lineTrace], layout);

  });
}