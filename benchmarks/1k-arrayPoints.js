var Benchmark = require('benchmark');
var distribution = require('../dist');

var points = require('./1k-arrayPoints.json');

console.log('Benchmarking simplify on ' + points.length + ' array-points...');

new Benchmark.Suite()
    .add('simplify (HQ)', function () {
        distribution.SimplifyAP(points, 1, true);
    })
    .add('simplify', function () {
        distribution.SimplifyAP(points, 1, false);
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .run();