export interface ISimplifyObjectPoint {
    x: number;
    y: number;
}

function getAddedSquares(dx: number,
                         dy: number): number {
    return dx * dx + dy * dy;
}

function getSqDist(p1: ISimplifyObjectPoint,
                   p2: ISimplifyObjectPoint): number {

    return getAddedSquares(p1.x - p2.x, p1.y - p2.y);
}

function getSqSegDist(p: ISimplifyObjectPoint,
                      p1: ISimplifyObjectPoint,
                      p2: ISimplifyObjectPoint): number {

    let x: number = p1.x,
        y: number = p1.y,
        dx: number = p2.x - x,
        dy: number = p2.y - y;

    if (dx !== 0 || dy !== 0) {

        const t: number = ((p.x - x) * dx + (p.y - y) * dy) / (dx * dx + dy * dy);

        if (t > 1) {
            x = p2.x;
            y = p2.y;

        } else if (t > 0) {
            x += dx * t;
            y += dy * t;
        }
    }

    return getAddedSquares(p.x - x, p.y - y);
}

function simplifyRadialDist(points: ISimplifyObjectPoint[],
                            sqTolerance: number): ISimplifyObjectPoint[] {

    let prevPoint: ISimplifyObjectPoint = points[0],
        point: ISimplifyObjectPoint;

    const newPoints: ISimplifyObjectPoint[] = [prevPoint];

    for (let i = 1, len = points.length; i < len; i++) {
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

function simplifyDPStep(points: ISimplifyObjectPoint[],
                        first: number,
                        last: number,
                        sqTolerance: number,
                        simplified: ISimplifyObjectPoint[]): void {

    let maxSqDist: number = sqTolerance,
        index: number;

    for (let i = first + 1; i < last; i++) {

        const sqDist: number = getSqSegDist(points[i], points[first], points[last]);

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

function simplifyDouglasPeucker(points: ISimplifyObjectPoint[],
                                sqTolerance: number): ISimplifyObjectPoint[] {

    const last: number = points.length - 1;
    const simplified: ISimplifyObjectPoint[] = [points[0]];

    simplifyDPStep(points, 0, last, sqTolerance, simplified);

    simplified.push(points[last]);

    return simplified;
}

export function Simplify(points: ISimplifyObjectPoint[],
                         tolerance: number = 1,
                         highestQuality: boolean = false): ISimplifyObjectPoint[] {

    if (points.length <= 2) {
        return points;
    }

    const sqTolerance: number = tolerance * tolerance;

    points = highestQuality ? points : simplifyRadialDist(points, sqTolerance);
    points = simplifyDouglasPeucker(points, sqTolerance);

    return points;
}
