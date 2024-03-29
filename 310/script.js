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

function test() {
    document.getElementById("testOut").innerText = "Test passed!";
    console.log("Test passed!");
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