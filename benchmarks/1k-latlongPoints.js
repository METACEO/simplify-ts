var Benchmark = require('benchmark');
var distribution = require('../dist');

var points = require('./1k-latlongPoints.json');

console.log('Benchmarking simplify on ' + points.length + ' latlong-points...');

new Benchmark.Suite()
    .add('simplify (HQ)', function () {
        distribution.SimplifyLL(points, 1, true);
    })
    .add('simplify', function () {
        distribution.SimplifyLL(points, 1, false);
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .run();