
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
    document.getElementById("explanation").innerText = "Let's interpret what this data means. Slope is the amount that the y variable, in your case '" + yColumn + "', increases for every 1 unit that the x variable '" + xColumn + "' increases. So, '" + yColumn + "' increases by " + slope.toFixed(2) + " for every 1 unit increase in '" + xColumn + "'. And the intercept is the value of '" + yColumn + "' when '" + xColumn + "' is 0.";
    document.getElementById("output2").innerText = 'Prediction: When the x-axis variable, ' + xColumn + ', is at the value of your input(' +xpredictInt + '), the y-axis variable, '+yColumn+', is ' + prediction.toFixed(2);

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

    const layout2 = {
      title: 'Hist',
      xaxis: { title: xColumn },
      yaxis: { title: yColumn }
    };

    const layout3 = {
      title: 'Hist',
      xaxis: { title: xColumn },
      yaxis: { title: yColumn }
    };

    // Add the traces to the plot
    Plotly.newPlot('graph', [traceYes, traceNo, lineTrace], layout);
    // For the histogram
    const traceYesHistogram = {
      x: xYes,
      type: 'histogram',
      opacity: 0.5,
      name: 'Yes'
    };

    const traceNoHistogram = {
      x: xNo,
      type: 'histogram',
      opacity: 0.5,
      name: 'No'
    };

    Plotly.newPlot('histogram', [traceYesHistogram, traceNoHistogram], layout2);

    // For the box plot
    const traceYesBox = {
      y: yYes,
      type: 'box',
      name: 'Yes'
    };

    const traceNoBox = {
      y: yNo,
      type: 'box',
      name: 'No'
    };

    Plotly.newPlot('box_plot', [traceYesBox, traceNoBox], layout3);
    
    // Calculate R-Square score
    const score = regression.score(xYes.concat(xNo), yYes.concat(yNo));
    const rSquare = score.r2;

    console.log(typeof rSquare, rSquare);  // Add this line

    // Put the R-Square score into the respective cell of the HTML table
    const rSquareCellId = 'rs_' + xColumn + '_' + yColumn;
    document.getElementById(rSquareCellId).innerText = 'R-Square: ' + rSquare.toFixed(2);
  });
}


function trainAndOutputTree() {
  // Load CSV data
  d3.csv('heart.csv').then(data => {
    // Convert categorical variables to numerical values
    const convertToNumeric = (value) => {
      if (isNaN(value)) {
        return value.charCodeAt(0);
      } else {
        return parseFloat(value);
      }
    };

    data.forEach(row => {
      row['sex'] = convertToNumeric(row['sex']);
      row['chest_pain_type'] = convertToNumeric(row['chest_pain_type']);
      row['fasting_blood_sugar'] = convertToNumeric(row['fasting_blood_sugar']);
      row['resting_electrocardiographic_results'] = convertToNumeric(row['resting_electrocardiographic_results']);
      row['exercise_induced_angina'] = convertToNumeric(row['exercise_induced_angina']);
      row['slope_peak_exercise'] = convertToNumeric(row['slope_peak_exercise']);
      row['thal'] = convertToNumeric(row['thal']);
      row['heart_disease'] = row['heart_disease'] === 'yes' ? 1 : 0;
    });

    // Separate features and target variable
    const features = data.map(row => [
      row['age'],
      row['sex'],
      row['chest_pain_type'],
      row['resting_blood_pressure'],
      row['serum_cholestoral'],
      row['fasting_blood_sugar'],
      row['resting_electrocardiographic_results'],
      row['maximum_heart_rate_achieved'],
      row['exercise_induced_angina'],
      row['oldpeak'],
      row['slope_peak_exercise'],
      row['number_of_major_vessels'],
      row['thal']
    ]);
    const target = data.map(row => row['heart_disease']);

    let maxDepthElement = document.getElementById('maxDepth');
    let max;

    if (maxDepthElement.value !== '') {
        max = parseInt(maxDepthElement.value);
    } else {
        // Handle the case where the input box is empty
        // For example, you might want to set a default value
        max = 5; // Default value
    }

    // Train decision tree model
    const decisionTree = new ML.DecisionTreeClassifier({
      maxDepth: max
    });
    decisionTree.train(features, target);

    // Calculate accuracy
    const predictions = decisionTree.predict(features);
    const accuracy = calculateAccuracy(target, predictions);

    // Output accuracy
    document.getElementById("tree_accuracy").innerText = 'Accuracy: ' + (accuracy * 100).toFixed(2) + '%';

    // Convert decision tree to JSON
    const treeJson = JSON.stringify(decisionTree, null, 2);

    // Output JSON to console
    console.log(treeJson);

    // Output JSON to page
    const visualTree = document.getElementById("tree");
    visualTree.innerHTML = '<pre>' + treeJson + '</pre>';
  });
}

function calculateAccuracy(target, predictions) {
  let correct = 0;
  for (let i = 0; i < target.length; i++) {
    if (target[i] === predictions[i]) {
      correct++;
    }
  }
  return correct / target.length;
}