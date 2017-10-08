var Benchmark = require('benchmark');
var distribution = require('../dist');

var points = require('./1k-objectPoints.json');

console.log('Benchmarking simplify on ' + points.length + ' object-points...');

new Benchmark.Suite()
    .add('simplify (HQ)', function () {
        distribution.Simplify(points, 1, true);
    })
    .add('simplify', function () {
        distribution.Simplify(points, 1, false);
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .run();