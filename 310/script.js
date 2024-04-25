function trainAndOutput() {
  // Get selected columns
  const xColumn = document.getElementById('x-select').value;
  const yColumn = document.getElementById('y-select').value;
  xpredict = document.getElementById('XpredictY').value;

  // Load CSV data
  d3.csv('heart.csv').then(data => {
    // Separate data based on 'heart_disease' column
    const dataYes = data.filter(row => row['heart_disease'] === 'yes');
    const dataNo = data.filter(row => row['heart_disease'] === 'no');

    // Map selected columns to x and y arrays
    const xYes = dataYes.map(row => +row[xColumn]);
    const yYes = dataYes.map(row => +row[yColumn]);
    const xNo = dataNo.map(row => +row[xColumn]);
    const yNo = dataNo.map(row => +row[yColumn]);

    // Train model
    const regression = new ML.SimpleLinearRegression(xYes.concat(xNo), yYes.concat(yNo));

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

    // Create traces for the data points
    const traceYes = {
      x: xYes,
      y: yYes,
      mode: 'markers',
      name: 'Heart Disease: Yes',
      marker: { color: 'red' }
    };

    const traceNo = {
      x: xNo,
      y: yNo,
      mode: 'markers',
      name: 'Heart Disease: No',
      marker: { color: 'blue' }
    };

    // Calculate y values for the line
    const xLine = xYes.concat(xNo);
    const yLine = xLine.map(xValue => slope * xValue + intercept);

    // Create a trace for the line
    const lineTrace = {
      x: xLine,
      y: yLine,
      mode: 'lines',
      name: 'Regression Line'
    };

    // Define layout
    const layout = {
      title: 'Scatter Plot',
      xaxis: { title: xColumn },
      yaxis: { title: yColumn }
    };

    // Add the traces to the plot
    Plotly.newPlot('graph', [traceYes, traceNo, lineTrace], layout);
  });
}