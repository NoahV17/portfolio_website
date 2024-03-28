import { PolynomialRegression } from 'ml-regression-polynomial';
import * as d3 from 'd3';

window.onload = function() {
    // Create button
    const btn = document.createElement('button');
    btn.id = 'btn';
    btn.innerText = 'Create Regression Model';
    document.body.appendChild(btn);

    // Create output div
    const output = document.createElement('div');
    output.id = 'output';
    document.body.appendChild(output);

    document.getElementById('btn').addEventListener('click', function() {
        d3.csv('mlb_salaries.csv').then(data => {
            const x = data.map(d => +d.salary);
            const y = data.map(d => +d.height);

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

            // Train the model with the best degree
            const regression = new PolynomialRegression(x, y, bestDegree);
            document.getElementById('testOut').innerText = 'test button worked';
            document.getElementById('output1').innerText = 'Best Degree: ' + bestDegree + '\n' +
                                                           'Best Score: ' + bestScore + '\n' +
                                                           'Prediction: ' + regression.predict(80);
        });
    });
}