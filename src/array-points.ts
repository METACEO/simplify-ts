export type ISimplifyArrayPoint = [number, number];

function getAddedSquaresAP(dx: number,
                           dy: number): number {

    return dx * dx + dy * dy;
}

function getSqDistAP(p1: ISimplifyArrayPoint,
                     p2: ISimplifyArrayPoint): number {
    return getAddedSquaresAP(p1[0] - p2[0], p1[1] - p2[1]);
}

function getSqSegDistAP(p: ISimplifyArrayPoint,
                        p1: ISimplifyArrayPoint,
                        p2: ISimplifyArrayPoint): number {

    let x: number = p1[0],
        y: number = p1[1],
        dx: number = p2[0] - x,
        dy: number = p2[1] - y;

    if (dx !== 0 || dy !== 0) {

        const t = ((p[0] - x) * dx + (p[1] - y) * dy) / getAddedSquaresAP(dx, dy);

        if (t > 1) {
            x = p2[0];
            y = p2[1];

        } else if (t > 0) {
            x += dx * t;
            y += dy * t;
        }
    }

    return getAddedSquaresAP(p[0] - x, p[1] - y);
}

function simplifyRadialDistAP(points: ISimplifyArrayPoint[],
                              sqTolerance: number): ISimplifyArrayPoint[] {

    let prevPoint: ISimplifyArrayPoint = points[0],
        point: ISimplifyArrayPoint;

    const newPoints: ISimplifyArrayPoint[] = [prevPoint];

    for (let i = 1, len = points.length; i < len; i++) {
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

function simplifyDPStepAP(points: ISimplifyArrayPoint[],
                          first: number,
                          last: number,
                          sqTolerance: number,
                          simplified): void {

    let maxSqDist: number = sqTolerance,
        index: number;

    for (let i = first + 1; i < last; i++) {

        const sqDist: number = getSqSegDistAP(points[i], points[first], points[last]);

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

function simplifyDouglasPeuckerAP(points: ISimplifyArrayPoint[],
                                  sqTolerance: number): ISimplifyArrayPoint[] {

    const last: number = points.length - 1;
    const simplified: ISimplifyArrayPoint[] = [points[0]];

    simplifyDPStepAP(points, 0, last, sqTolerance, simplified);

    simplified.push(points[last]);

    return simplified;
}

export function SimplifyAP(points: ISimplifyArrayPoint[],
                           tolerance: number = 1,
                           highestQuality: boolean = false): ISimplifyArrayPoint[] {

    if (points.length <= 2) {
        return points;
    }

    const sqTolerance: number = tolerance * tolerance;

    points = highestQuality ? points : simplifyRadialDistAP(points, sqTolerance);
    points = simplifyDouglasPeuckerAP(points, sqTolerance);

    return points;
}
