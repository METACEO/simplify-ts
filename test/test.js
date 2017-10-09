var distribution = require('../dist'),
    t = require('tape');

var points = [
    {x: 224.55, y: 250.15}, {x: 226.91, y: 244.19}, {x: 233.31, y: 241.45}, {x: 234.98, y: 236.06},
    {x: 244.21, y: 232.76}, {x: 262.59, y: 215.31}, {x: 267.76, y: 213.81}, {x: 273.57, y: 201.84},
    {x: 273.12, y: 192.16}, {x: 277.62, y: 189.03}, {x: 280.36, y: 181.41}, {x: 286.51, y: 177.74},
    {x: 292.41, y: 159.37}, {x: 296.91, y: 155.64}, {x: 314.95, y: 151.37}, {x: 319.75, y: 145.16},
    {x: 330.33, y: 137.57}, {x: 341.48, y: 139.96}, {x: 369.98, y: 137.89}, {x: 387.39, y: 142.51},
    {x: 391.28, y: 139.39}, {x: 409.52, y: 141.14}, {x: 414.82, y: 139.75}, {x: 427.72, y: 127.30},
    {x: 439.60, y: 119.74}, {x: 474.93, y: 107.87}, {x: 486.51, y: 106.75}, {x: 489.20, y: 109.45},
    {x: 493.79, y: 108.63}, {x: 504.74, y: 119.66}, {x: 512.96, y: 122.35}, {x: 518.63, y: 120.89},
    {x: 524.09, y: 126.88}, {x: 529.57, y: 127.86}, {x: 534.21, y: 140.93}, {x: 539.27, y: 147.24},
    {x: 567.69, y: 148.91}, {x: 575.25, y: 157.26}, {x: 580.62, y: 158.15}, {x: 601.53, y: 156.85},
    {x: 617.74, y: 159.86}, {x: 622.00, y: 167.04}, {x: 629.55, y: 194.60}, {x: 638.90, y: 195.61},
    {x: 641.26, y: 200.81}, {x: 651.77, y: 204.56}, {x: 671.55, y: 222.55}, {x: 683.68, y: 217.45},
    {x: 695.25, y: 219.15}, {x: 700.64, y: 217.98}, {x: 703.12, y: 214.36}, {x: 712.26, y: 215.87},
    {x: 721.49, y: 212.81}, {x: 727.81, y: 213.36}, {x: 729.98, y: 208.73}, {x: 735.32, y: 208.20},
    {x: 739.94, y: 204.77}, {x: 769.98, y: 208.42}, {x: 779.60, y: 216.87}, {x: 784.20, y: 218.16},
    {x: 800.24, y: 214.62}, {x: 810.53, y: 219.73}, {x: 817.19, y: 226.82}, {x: 820.77, y: 236.17},
    {x: 827.23, y: 236.16}, {x: 829.89, y: 239.89}, {x: 851.00, y: 248.94}, {x: 859.88, y: 255.49},
    {x: 865.21, y: 268.53}, {x: 857.95, y: 280.30}, {x: 865.48, y: 291.45}, {x: 866.81, y: 298.66},
    {x: 864.68, y: 302.71}, {x: 867.79, y: 306.17}, {x: 859.87, y: 311.37}, {x: 860.08, y: 314.35},
    {x: 858.29, y: 314.94}, {x: 858.10, y: 327.60}, {x: 854.54, y: 335.40}, {x: 860.92, y: 343.00},
    {x: 856.43, y: 350.15}, {x: 851.42, y: 352.96}, {x: 849.84, y: 359.59}, {x: 854.56, y: 365.53},
    {x: 849.74, y: 370.38}, {x: 844.09, y: 371.89}, {x: 844.75, y: 380.44}, {x: 841.52, y: 383.67},
    {x: 839.57, y: 390.40}, {x: 845.59, y: 399.05}, {x: 848.40, y: 407.55}, {x: 843.71, y: 411.30},
    {x: 844.09, y: 419.88}, {x: 839.51, y: 432.76}, {x: 841.33, y: 441.04}, {x: 847.62, y: 449.22},
    {x: 847.16, y: 458.44}, {x: 851.38, y: 462.79}, {x: 853.97, y: 471.15}, {x: 866.36, y: 480.77}
];

var simplified = [
    {x: 224.55, y: 250.15}, {x: 267.76, y: 213.81}, {x: 296.91, y: 155.64}, {x: 330.33, y: 137.57},
    {x: 409.52, y: 141.14}, {x: 439.60, y: 119.74}, {x: 486.51, y: 106.75}, {x: 529.57, y: 127.86},
    {x: 539.27, y: 147.24}, {x: 617.74, y: 159.86}, {x: 629.55, y: 194.60}, {x: 671.55, y: 222.55},
    {x: 727.81, y: 213.36}, {x: 739.94, y: 204.77}, {x: 769.98, y: 208.42}, {x: 779.60, y: 216.87},
    {x: 800.24, y: 214.62}, {x: 820.77, y: 236.17}, {x: 859.88, y: 255.49}, {x: 865.21, y: 268.53},
    {x: 857.95, y: 280.30}, {x: 867.79, y: 306.17}, {x: 859.87, y: 311.37}, {x: 854.54, y: 335.40},
    {x: 860.92, y: 343.00}, {x: 849.84, y: 359.59}, {x: 854.56, y: 365.53}, {x: 844.09, y: 371.89},
    {x: 839.57, y: 390.40}, {x: 848.40, y: 407.55}, {x: 839.51, y: 432.76}, {x: 853.97, y: 471.15},
    {x: 866.36, y: 480.77}
];

var simplifiedHighQuality = [
    {x: 224.55, y: 250.15}, {x: 267.76, y: 213.81}, {x: 296.91, y: 155.64}, {x: 330.33, y: 137.57},
    {x: 409.52, y: 141.14}, {x: 439.6,  y: 119.74}, {x: 486.51, y: 106.75}, {x: 529.57, y: 127.86},
    {x: 539.27, y: 147.24}, {x: 617.74, y: 159.86}, {x: 629.55, y: 194.6 }, {x: 671.55, y: 222.55},
    {x: 727.81, y: 213.36}, {x: 739.94, y: 204.77}, {x: 769.98, y: 208.42}, {x: 784.2,  y: 218.16},
    {x: 800.24, y: 214.62}, {x: 820.77, y: 236.17}, {x: 859.88, y: 255.49}, {x: 865.21, y: 268.53},
    {x: 857.95, y: 280.3 }, {x: 867.79, y: 306.17}, {x: 858.29, y: 314.94}, {x: 854.54, y: 335.4 },
    {x: 860.92, y: 343   }, {x: 849.84, y: 359.59}, {x: 854.56, y: 365.53}, {x: 844.09, y: 371.89},
    {x: 839.57, y: 390.4 }, {x: 848.4,  y: 407.55}, {x: 839.51, y: 432.76}, {x: 853.97, y: 471.15},
    {x: 866.36, y: 480.77}
];

t('simplifies object-points correctly with the given tolerance', function (t) {
    var result = distribution.Simplify(points, 5);
    t.same(result, simplified);
    t.end();
});

t('simplifies object-points correctly with the given tolerance and high quality', function (t) {
    var result = distribution.Simplify(points, 5, true);
    t.same(result, simplifiedHighQuality);
    t.end();
});

t('just return the object-points if it has only one point', function (t) {
    var result = distribution.Simplify([{x: 1, y: 2}]);
    t.same(result, [{x: 1, y: 2}]);
    t.end();
});

t('just return the object-points if it has no points', function (t) {
    var result = distribution.Simplify([]);
    t.same(result, []);
    t.end();
});

var pointsAP = [
    [224.55, 250.15], [226.91, 244.19], [233.31, 241.45], [234.98, 236.06],
    [244.21, 232.76], [262.59, 215.31], [267.76, 213.81], [273.57, 201.84],
    [273.12, 192.16], [277.62, 189.03], [280.36, 181.41], [286.51, 177.74],
    [292.41, 159.37], [296.91, 155.64], [314.95, 151.37], [319.75, 145.16],
    [330.33, 137.57], [341.48, 139.96], [369.98, 137.89], [387.39, 142.51],
    [391.28, 139.39], [409.52, 141.14], [414.82, 139.75], [427.72, 127.30],
    [439.60, 119.74], [474.93, 107.87], [486.51, 106.75], [489.20, 109.45],
    [493.79, 108.63], [504.74, 119.66], [512.96, 122.35], [518.63, 120.89],
    [524.09, 126.88], [529.57, 127.86], [534.21, 140.93], [539.27, 147.24],
    [567.69, 148.91], [575.25, 157.26], [580.62, 158.15], [601.53, 156.85],
    [617.74, 159.86], [622.00, 167.04], [629.55, 194.60], [638.90, 195.61],
    [641.26, 200.81], [651.77, 204.56], [671.55, 222.55], [683.68, 217.45],
    [695.25, 219.15], [700.64, 217.98], [703.12, 214.36], [712.26, 215.87],
    [721.49, 212.81], [727.81, 213.36], [729.98, 208.73], [735.32, 208.20],
    [739.94, 204.77], [769.98, 208.42], [779.60, 216.87], [784.20, 218.16],
    [800.24, 214.62], [810.53, 219.73], [817.19, 226.82], [820.77, 236.17],
    [827.23, 236.16], [829.89, 239.89], [851.00, 248.94], [859.88, 255.49],
    [865.21, 268.53], [857.95, 280.30], [865.48, 291.45], [866.81, 298.66],
    [864.68, 302.71], [867.79, 306.17], [859.87, 311.37], [860.08, 314.35],
    [858.29, 314.94], [858.10, 327.60], [854.54, 335.40], [860.92, 343.00],
    [856.43, 350.15], [851.42, 352.96], [849.84, 359.59], [854.56, 365.53],
    [849.74, 370.38], [844.09, 371.89], [844.75, 380.44], [841.52, 383.67],
    [839.57, 390.40], [845.59, 399.05], [848.40, 407.55], [843.71, 411.30],
    [844.09, 419.88], [839.51, 432.76], [841.33, 441.04], [847.62, 449.22],
    [847.16, 458.44], [851.38, 462.79], [853.97, 471.15], [866.36, 480.77]
];

var simplifiedAP = [
    [224.55, 250.15], [267.76, 213.81], [296.91, 155.64], [330.33, 137.57],
    [409.52, 141.14], [439.60, 119.74], [486.51, 106.75], [529.57, 127.86],
    [539.27, 147.24], [617.74, 159.86], [629.55, 194.60], [671.55, 222.55],
    [727.81, 213.36], [739.94, 204.77], [769.98, 208.42], [779.60, 216.87],
    [800.24, 214.62], [820.77, 236.17], [859.88, 255.49], [865.21, 268.53],
    [857.95, 280.30], [867.79, 306.17], [859.87, 311.37], [854.54, 335.40],
    [860.92, 343.00], [849.84, 359.59], [854.56, 365.53], [844.09, 371.89],
    [839.57, 390.40], [848.40, 407.55], [839.51, 432.76], [853.97, 471.15],
    [866.36, 480.77]
];

var simplifiedHighQualityAP = [
    [224.55, 250.15], [267.76, 213.81], [296.91, 155.64], [330.33, 137.57],
    [409.52, 141.14], [439.6,  119.74], [486.51, 106.75], [529.57, 127.86],
    [539.27, 147.24], [617.74, 159.86], [629.55, 194.6 ], [671.55, 222.55],
    [727.81, 213.36], [739.94, 204.77], [769.98, 208.42], [784.2,  218.16],
    [800.24, 214.62], [820.77, 236.17], [859.88, 255.49], [865.21, 268.53],
    [857.95, 280.3 ], [867.79, 306.17], [858.29, 314.94], [854.54, 335.4 ],
    [860.92, 343   ], [849.84, 359.59], [854.56, 365.53], [844.09, 371.89],
    [839.57, 390.4 ], [848.4,  407.55], [839.51, 432.76], [853.97, 471.15],
    [866.36, 480.77]
];

t('simplifies array-points correctly with the given tolerance', function (t) {
    var result = distribution.SimplifyAP(pointsAP, 5);
    t.same(result, simplifiedAP);
    t.end();
});

t('simplifies array-points correctly with the given tolerance and high quality', function (t) {
    var result = distribution.SimplifyAP(pointsAP, 5, true);
    t.same(result, simplifiedHighQualityAP);
    t.end();
});

t('just return the array-points if it has only one point', function (t) {
    var result = distribution.SimplifyAP([1, 2]);
    t.same(result, [1, 2]);
    t.end();
});

t('just return the array-points if it has no points', function (t) {
    var result = distribution.SimplifyAP([]);
    t.same(result, []);
    t.end();
});

var pointsLL = [
    {longitude: 224.55, latitude: 250.15}, {longitude: 226.91, latitude: 244.19},
    {longitude: 233.31, latitude: 241.45}, {longitude: 234.98, latitude: 236.06},
    {longitude: 244.21, latitude: 232.76}, {longitude: 262.59, latitude: 215.31},
    {longitude: 267.76, latitude: 213.81}, {longitude: 273.57, latitude: 201.84},
    {longitude: 273.12, latitude: 192.16}, {longitude: 277.62, latitude: 189.03},
    {longitude: 280.36, latitude: 181.41}, {longitude: 286.51, latitude: 177.74},
    {longitude: 292.41, latitude: 159.37}, {longitude: 296.91, latitude: 155.64},
    {longitude: 314.95, latitude: 151.37}, {longitude: 319.75, latitude: 145.16},
    {longitude: 330.33, latitude: 137.57}, {longitude: 341.48, latitude: 139.96},
    {longitude: 369.98, latitude: 137.89}, {longitude: 387.39, latitude: 142.51},
    {longitude: 391.28, latitude: 139.39}, {longitude: 409.52, latitude: 141.14},
    {longitude: 414.82, latitude: 139.75}, {longitude: 427.72, latitude: 127.30},
    {longitude: 439.60, latitude: 119.74}, {longitude: 474.93, latitude: 107.87},
    {longitude: 486.51, latitude: 106.75}, {longitude: 489.20, latitude: 109.45},
    {longitude: 493.79, latitude: 108.63}, {longitude: 504.74, latitude: 119.66},
    {longitude: 512.96, latitude: 122.35}, {longitude: 518.63, latitude: 120.89},
    {longitude: 524.09, latitude: 126.88}, {longitude: 529.57, latitude: 127.86},
    {longitude: 534.21, latitude: 140.93}, {longitude: 539.27, latitude: 147.24},
    {longitude: 567.69, latitude: 148.91}, {longitude: 575.25, latitude: 157.26},
    {longitude: 580.62, latitude: 158.15}, {longitude: 601.53, latitude: 156.85},
    {longitude: 617.74, latitude: 159.86}, {longitude: 622.00, latitude: 167.04},
    {longitude: 629.55, latitude: 194.60}, {longitude: 638.90, latitude: 195.61},
    {longitude: 641.26, latitude: 200.81}, {longitude: 651.77, latitude: 204.56},
    {longitude: 671.55, latitude: 222.55}, {longitude: 683.68, latitude: 217.45},
    {longitude: 695.25, latitude: 219.15}, {longitude: 700.64, latitude: 217.98},
    {longitude: 703.12, latitude: 214.36}, {longitude: 712.26, latitude: 215.87},
    {longitude: 721.49, latitude: 212.81}, {longitude: 727.81, latitude: 213.36},
    {longitude: 729.98, latitude: 208.73}, {longitude: 735.32, latitude: 208.20},
    {longitude: 739.94, latitude: 204.77}, {longitude: 769.98, latitude: 208.42},
    {longitude: 779.60, latitude: 216.87}, {longitude: 784.20, latitude: 218.16},
    {longitude: 800.24, latitude: 214.62}, {longitude: 810.53, latitude: 219.73},
    {longitude: 817.19, latitude: 226.82}, {longitude: 820.77, latitude: 236.17},
    {longitude: 827.23, latitude: 236.16}, {longitude: 829.89, latitude: 239.89},
    {longitude: 851.00, latitude: 248.94}, {longitude: 859.88, latitude: 255.49},
    {longitude: 865.21, latitude: 268.53}, {longitude: 857.95, latitude: 280.30},
    {longitude: 865.48, latitude: 291.45}, {longitude: 866.81, latitude: 298.66},
    {longitude: 864.68, latitude: 302.71}, {longitude: 867.79, latitude: 306.17},
    {longitude: 859.87, latitude: 311.37}, {longitude: 860.08, latitude: 314.35},
    {longitude: 858.29, latitude: 314.94}, {longitude: 858.10, latitude: 327.60},
    {longitude: 854.54, latitude: 335.40}, {longitude: 860.92, latitude: 343.00},
    {longitude: 856.43, latitude: 350.15}, {longitude: 851.42, latitude: 352.96},
    {longitude: 849.84, latitude: 359.59}, {longitude: 854.56, latitude: 365.53},
    {longitude: 849.74, latitude: 370.38}, {longitude: 844.09, latitude: 371.89},
    {longitude: 844.75, latitude: 380.44}, {longitude: 841.52, latitude: 383.67},
    {longitude: 839.57, latitude: 390.40}, {longitude: 845.59, latitude: 399.05},
    {longitude: 848.40, latitude: 407.55}, {longitude: 843.71, latitude: 411.30},
    {longitude: 844.09, latitude: 419.88}, {longitude: 839.51, latitude: 432.76},
    {longitude: 841.33, latitude: 441.04}, {longitude: 847.62, latitude: 449.22},
    {longitude: 847.16, latitude: 458.44}, {longitude: 851.38, latitude: 462.79},
    {longitude: 853.97, latitude: 471.15}, {longitude: 866.36, latitude: 480.77}
];

var simplifiedLL = [
    {longitude: 224.55, latitude: 250.15}, {longitude: 267.76, latitude: 213.81},
    {longitude: 296.91, latitude: 155.64}, {longitude: 330.33, latitude: 137.57},
    {longitude: 409.52, latitude: 141.14}, {longitude: 439.60, latitude: 119.74},
    {longitude: 486.51, latitude: 106.75}, {longitude: 529.57, latitude: 127.86},
    {longitude: 539.27, latitude: 147.24}, {longitude: 617.74, latitude: 159.86},
    {longitude: 629.55, latitude: 194.60}, {longitude: 671.55, latitude: 222.55},
    {longitude: 727.81, latitude: 213.36}, {longitude: 739.94, latitude: 204.77},
    {longitude: 769.98, latitude: 208.42}, {longitude: 779.60, latitude: 216.87},
    {longitude: 800.24, latitude: 214.62}, {longitude: 820.77, latitude: 236.17},
    {longitude: 859.88, latitude: 255.49}, {longitude: 865.21, latitude: 268.53},
    {longitude: 857.95, latitude: 280.30}, {longitude: 867.79, latitude: 306.17},
    {longitude: 859.87, latitude: 311.37}, {longitude: 854.54, latitude: 335.40},
    {longitude: 860.92, latitude: 343.00}, {longitude: 849.84, latitude: 359.59},
    {longitude: 854.56, latitude: 365.53}, {longitude: 844.09, latitude: 371.89},
    {longitude: 839.57, latitude: 390.40}, {longitude: 848.40, latitude: 407.55},
    {longitude: 839.51, latitude: 432.76}, {longitude: 853.97, latitude: 471.15},
    {longitude: 866.36, latitude: 480.77}
];

var simplifiedHighQualityLL = [
    {longitude: 224.55, latitude: 250.15}, {longitude: 267.76, latitude: 213.81},
    {longitude: 296.91, latitude: 155.64}, {longitude: 330.33, latitude: 137.57},
    {longitude: 409.52, latitude: 141.14}, {longitude: 439.6,  latitude: 119.74},
    {longitude: 486.51, latitude: 106.75}, {longitude: 529.57, latitude: 127.86},
    {longitude: 539.27, latitude: 147.24}, {longitude: 617.74, latitude: 159.86},
    {longitude: 629.55, latitude: 194.6 }, {longitude: 671.55, latitude: 222.55},
    {longitude: 727.81, latitude: 213.36}, {longitude: 739.94, latitude: 204.77},
    {longitude: 769.98, latitude: 208.42}, {longitude: 784.2,  latitude: 218.16},
    {longitude: 800.24, latitude: 214.62}, {longitude: 820.77, latitude: 236.17},
    {longitude: 859.88, latitude: 255.49}, {longitude: 865.21, latitude: 268.53},
    {longitude: 857.95, latitude: 280.3 }, {longitude: 867.79, latitude: 306.17},
    {longitude: 858.29, latitude: 314.94}, {longitude: 854.54, latitude: 335.4 },
    {longitude: 860.92, latitude: 343   }, {longitude: 849.84, latitude: 359.59},
    {longitude: 854.56, latitude: 365.53}, {longitude: 844.09, latitude: 371.89},
    {longitude: 839.57, latitude: 390.4 }, {longitude: 848.4,  latitude: 407.55},
    {longitude: 839.51, latitude: 432.76}, {longitude: 853.97, latitude: 471.15},
    {longitude: 866.36, latitude: 480.77}
];

t('simplifies latlong-points correctly with the given tolerance', function (t) {
    var result = distribution.SimplifyLL(pointsLL, 5);
    t.same(result, simplifiedLL);
    t.end();
});

t('simplifies latlong-points correctly with the given tolerance and high quality', function (t) {
    var result = distribution.SimplifyLL(pointsLL, 5, true);
    t.same(result, simplifiedHighQualityLL);
    t.end();
});

t('just return the latlong-points if it has only one point', function (t) {
    var result = distribution.SimplifyLL([{longitude: 1, latitude: 2}]);
    t.same(result, [{longitude: 1, latitude: 2}]);
    t.end();
});

t('just return the object-points if it has no points', function (t) {
    var result = distribution.SimplifyLL([]);
    t.same(result, []);
    t.end();
});
