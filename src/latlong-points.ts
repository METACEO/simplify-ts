export interface ISimplifyLatLongPoint {
    longitude: number;
    latitude: number;
}

function getAddedSquaresLL(dlong: number,
                         dlat: number): number {
    return dlong * dlong + dlat * dlat;
}

function getSqDistLL(p1: ISimplifyLatLongPoint,
                   p2: ISimplifyLatLongPoint): number {

    return getAddedSquaresLL(p1.longitude - p2.longitude, p1.latitude - p2.latitude);
}

function getSqSegDistLL(p: ISimplifyLatLongPoint,
                      p1: ISimplifyLatLongPoint,
                      p2: ISimplifyLatLongPoint): number {

    let long: number = p1.longitude,
        lat: number = p1.latitude,
        dlong: number = p2.longitude - long,
        dlat: number = p2.latitude - lat;

    if (dlong !== 0 || dlat !== 0) {

        const t: number = ((p.longitude - long) * dlong + (p.latitude - lat) * dlat) / getAddedSquaresLL(dlong, dlat);

        if (t > 1) {
            long = p2.longitude;
            lat = p2.latitude;

        } else if (t > 0) {
            long += dlong * t;
            lat += dlat * t;
        }
    }

    return getAddedSquaresLL(p.longitude - long, p.latitude - lat);
}

function simplifyRadialDistLL(points: ISimplifyLatLongPoint[],
                            sqTolerance: number): ISimplifyLatLongPoint[] {

    let prevPoint: ISimplifyLatLongPoint = points[0],
        point: ISimplifyLatLongPoint;

    const newPoints: ISimplifyLatLongPoint[] = [prevPoint];

    for (let i = 1, len = points.length; i < len; i++) {
        point = points[i];

        if (getSqDistLL(point, prevPoint) > sqTolerance) {
            newPoints.push(point);
            prevPoint = point;
        }
    }

    if (prevPoint !== point) {
        newPoints.push(point);
    }

    return newPoints;
}

function simplifyDPStepLL(points: ISimplifyLatLongPoint[],
                        first: number,
                        last: number,
                        sqTolerance: number,
                        simplified: ISimplifyLatLongPoint[]): void {

    let maxSqDist: number = sqTolerance,
        index: number;

    for (let i = first + 1; i < last; i++) {

        const sqDist: number = getSqSegDistLL(points[i], points[first], points[last]);

        if (sqDist > maxSqDist) {
            index = i;
            maxSqDist = sqDist;
        }
    }

    if (maxSqDist > sqTolerance) {
        if (index - first > 1) {
            simplifyDPStepLL(points, first, index, sqTolerance, simplified);
        }

        simplified.push(points[index]);

        if (last - index > 1) {
            simplifyDPStepLL(points, index, last, sqTolerance, simplified);
        }
    }
}

function simplifyDouglasPeuckerLL(points: ISimplifyLatLongPoint[],
                                sqTolerance: number): ISimplifyLatLongPoint[] {

    const last: number = points.length - 1;
    const simplified: ISimplifyLatLongPoint[] = [points[0]];

    simplifyDPStepLL(points, 0, last, sqTolerance, simplified);

    simplified.push(points[last]);

    return simplified;
}

export function SimplifyLL(points: ISimplifyLatLongPoint[],
                         tolerance: number = 1,
                         highestQuality: boolean = false): ISimplifyLatLongPoint[] {

    if (points.length <= 2) {
        return points;
    }

    const sqTolerance: number = tolerance * tolerance;

    points = highestQuality ? points : simplifyRadialDistLL(points, sqTolerance);
    points = simplifyDouglasPeuckerLL(points, sqTolerance);

    return points;
}
