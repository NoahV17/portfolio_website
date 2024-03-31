function calculateBestDegree(x, y) {
    let bestScore = -Infinity;
    let bestDegree = 0;

    // Grid search
    for (let degree = 1; degree <= 10; degree++) {
        const regression = new PolynomialRegression(x, y, degree);
        const score = regression.score(x, y);

        if (score > bestScore) {
            bestScore = score;
            bestDegree = degree;
        }
    }

    return { bestScore, bestDegree };
}

function trainModel(x, y, degree) {
    const regression = new PolynomialRegression(x, y, degree);
    return regression;
}

function updateOutput(bestDegree, bestScore, prediction) {
    document.getElementById("output1").innerText = 'Best Degree: ' + bestDegree + '\n' +
                                                   'Best Score: ' + bestScore + '\n' +
                                                   'Prediction: ' + prediction;
}

document.getElementById('btn').addEventListener('click', function() {
    d3.csv('mlb_salaries.csv').then(data => {
        const x = data.map(d => +d.salary);
        const y = data.map(d => +d.height);

        const { bestScore, bestDegree } = calculateBestDegree(x, y);
        const regression = trainModel(x, y, bestDegree);
        const prediction = regression.predict(80);

        updateOutput(bestDegree, bestScore, prediction);
    });
});


  // Function to plot the pair plot
  function plotPairPlot() {
    var csvFile = document.getElementById('csvFile').files[0];
    var xColumn = document.getElementById('xColumn').value;
    var yColumn = document.getElementById('yColumn').value;

    Papa.parse(csvFile, {
      header: true,
      dynamicTyping: true,
      complete: function(results) {
        var data = [];
        results.data.forEach(function(row) {
          data.push({x: row[xColumn], y: row[yColumn], type: 'scatter', mode: 'markers'});
        });

        var layout = {
          title: 'Pair Plot from CSV',
          xaxis: {title: xColumn},
          yaxis: {title: yColumn},
          showlegend: false
        };

        Plotly.newPlot('pairPlot', data, layout);
      }
    });
  }

  // Function to update column options
  function updateColumnOptions(columns) {
    var xSelect = document.getElementById('xColumn');
    var ySelect = document.getElementById('yColumn');

    columns.forEach(function(column) {
      var option = document.createElement('option');
      option.text = column;
      option.value = column;
      xSelect.add(option);
      ySelect.add(option.cloneNode(true));
    });
  }


d3.csv('mlb_salaries.csv').then(data => {
    var trace1 = {
        x: data.map(row => +row['your_x_column']),
        y: data.map(row => +row['your_y_column']),
        mode: 'markers',
        type: 'scatter'
    };

});

var data = [trace1];
Plotly.newPlot('graph', data);