"use strict";
exports.__esModule = true;
function getAddedSquares(dx, dy) {
    return dx * dx + dy * dy;
}
function getSqDist(p1, p2) {
    return getAddedSquares(p1.x - p2.x, p1.y - p2.y);
}
function getSqSegDist(p, p1, p2) {
    var x = p1.x, y = p1.y, dx = p2.x - x, dy = p2.y - y;
    if (dx !== 0 || dy !== 0) {
        var t = ((p.x - x) * dx + (p.y - y) * dy) / getAddedSquares(dx, dy);
        if (t > 1) {
            x = p2.x;
            y = p2.y;
        }
        else if (t > 0) {
            x += dx * t;
            y += dy * t;
        }
    }
    return getAddedSquares(p.x - x, p.y - y);
}
function simplifyRadialDist(points, sqTolerance) {
    var prevPoint = points[0], point;
    var newPoints = [prevPoint];
    for (var i = 1, len = points.length; i < len; i++) {
        point = points[i];
        if (getSqDist(point, prevPoint) > sqTolerance) {
            newPoints.push(point);
            prevPoint = point;
        }
    }
    if (prevPoint !== point) {
        newPoints.push(point);
    }
    return newPoints;
}
function simplifyDPStep(points, first, last, sqTolerance, simplified) {
    var maxSqDist = sqTolerance, index;
    for (var i = first + 1; i < last; i++) {
        var sqDist = getSqSegDist(points[i], points[first], points[last]);
        if (sqDist > maxSqDist) {
            index = i;
            maxSqDist = sqDist;
        }
    }
    if (maxSqDist > sqTolerance) {
        if (index - first > 1) {
            simplifyDPStep(points, first, index, sqTolerance, simplified);
        }
        simplified.push(points[index]);
        if (last - index > 1) {
            simplifyDPStep(points, index, last, sqTolerance, simplified);
        }
    }
}
function simplifyDouglasPeucker(points, sqTolerance) {
    var last = points.length - 1;
    var simplified = [points[0]];
    simplifyDPStep(points, 0, last, sqTolerance, simplified);
    simplified.push(points[last]);
    return simplified;
}
function Simplify(points, tolerance, highestQuality) {
    if (tolerance === void 0) { tolerance = 1; }
    if (highestQuality === void 0) { highestQuality = false; }
    if (points.length <= 2) {
        return points;
    }
    var sqTolerance = tolerance * tolerance;
    points = highestQuality ? points : simplifyRadialDist(points, sqTolerance);
    points = simplifyDouglasPeucker(points, sqTolerance);
    return points;
}
exports.Simplify = Simplify;
