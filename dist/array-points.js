"use strict";
exports.__esModule = true;
function getAddedSquaresAP(dx, dy) {
    return dx * dx + dy * dy;
}
function getSqDistAP(p1, p2) {
    return getAddedSquaresAP(p1[0] - p2[0], p1[1] - p2[1]);
}
function getSqSegDistAP(p, p1, p2) {
    var x = p1[0], y = p1[1], dx = p2[0] - x, dy = p2[1] - y;
    if (dx !== 0 || dy !== 0) {
        var t = ((p[0] - x) * dx + (p[1] - y) * dy) / getAddedSquaresAP(dx, dy);
        if (t > 1) {
            x = p2[0];
            y = p2[1];
        }
        else if (t > 0) {
            x += dx * t;
            y += dy * t;
        }
    }
    return getAddedSquaresAP(p[0] - x, p[1] - y);
}
function simplifyRadialDistAP(points, sqTolerance) {
    var prevPoint = points[0], point;
    var newPoints = [prevPoint];
    for (var i = 1, len = points.length; i < len; i++) {
        point = points[i];
        if (getSqDistAP(point, prevPoint) > sqTolerance) {
            newPoints.push(point);
            prevPoint = point;
        }
    }
    if (prevPoint !== point) {
        newPoints.push(point);
    }
    return newPoints;
}
function simplifyDPStepAP(points, first, last, sqTolerance, simplified) {
    var maxSqDist = sqTolerance, index;
    for (var i = first + 1; i < last; i++) {
        var sqDist = getSqSegDistAP(points[i], points[first], points[last]);
        if (sqDist > maxSqDist) {
            index = i;
            maxSqDist = sqDist;
        }
    }
    if (maxSqDist > sqTolerance) {
        if (index - first > 1) {
            simplifyDPStepAP(points, first, index, sqTolerance, simplified);
        }
        simplified.push(points[index]);
        if (last - index > 1) {
            simplifyDPStepAP(points, index, last, sqTolerance, simplified);
        }
    }
}
function simplifyDouglasPeuckerAP(points, sqTolerance) {
    var last = points.length - 1;
    var simplified = [points[0]];
    simplifyDPStepAP(points, 0, last, sqTolerance, simplified);
    simplified.push(points[last]);
    return simplified;
}
function SimplifyAP(points, tolerance, highestQuality) {
    if (tolerance === void 0) { tolerance = 1; }
    if (highestQuality === void 0) { highestQuality = false; }
    if (points.length <= 2) {
        return points;
    }
    var sqTolerance = tolerance * tolerance;
    points = highestQuality ? points : simplifyRadialDistAP(points, sqTolerance);
    points = simplifyDouglasPeuckerAP(points, sqTolerance);
    return points;
}
exports.SimplifyAP = SimplifyAP;
