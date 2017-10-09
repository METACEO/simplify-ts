simplify-ts
===========

The multi-flavor TypeScript port of the "high-performance JavaScript 2D/3D polyline simplification" library [Simplify.js](https://github.com/mourner/simplify-js) - a combination of basic radial distance determination and the Douglas-Peucker algorithm.

Three different importable flavors:

1. Object-based point collections - `Array<{x: number, y: number}>`
2. Array-based point collections - `Array<[number, number]>`
3. LatLong-based point collections - `Array<{latitude: number, longitude: number}>`

## Install

```
npm install --save simplify-ts
```

Compiled JavaScript and types are included with your NPM install. To run benchmarks, tests and custom builds, use git to clone the repository (then also run `npm install` in the cloned repository to get the required dependencies for development.)

```
git clone https://github.com/METACEO/simplify-ts.git
```

You will then find the `benchmarks`, `src` and `test` folders referenced in the `package.json` file.

## Usage

Object-based point collections:

```typescript
import {
    Simplify,
    ISimplifyObjectPoint
} from 'simplify-ts';

const points: ISimplifyObjectPoint[] = [ {x: 1, y: 2} /* ... */ ];
const tolerance: number = 0.5;
const highQuality: boolean = true;

const simplified_result = Simplify(points, tolerance, highQuality);
```

Array-based point collections:

```typescript
import {
    SimplifyAP,
    ISimplifyArrayPoint
} from 'simplify-ts';

const points: ISimplifyArrayPoint[] = [ [1, 2] /* ... */ ];
const tolerance: number = 0.5;
const highQuality: boolean = true;

const simplified_result = SimplifyAP(points, tolerance, highQuality);
```

LatLong-based point collections:

```typescript
import {
    SimplifyLL,
    ISimplifyLatLongPoint
} from './src';

const points: ISimplifyLatLongPoint[] = [ {latitude: 1, longitude: 2} /* ... */ ];
const tolerance: number = 0.5;
const highQuality: boolean = true;

const simplified_result = SimplifyLL(points, tolerance, highQuality);
```

## Tests

Run `npm test` in the project's repository.

```
[jamesallen@dev simplify-ts]$ npm test

> simplify-ts@0.0.1 test /home/jamesallen/simplify-ts
> node test/test.js | faucet

✓ simplifies object-points correctly with the given tolerance
✓ simplifies object-points correctly with the given tolerance and high quality
✓ just return the object-points if it has only one point
✓ just return the object-points if it has no points
✓ simplifies array-points correctly with the given tolerance
✓ simplifies array-points correctly with the given tolerance and high quality
✓ just return the array-points if it has only one point
✓ just return the array-points if it has no points
✓ simplifies latlong-points correctly with the given tolerance
✓ simplifies latlong-points correctly with the given tolerance and high quality
✓ just return the latlong-points if it has only one point
✓ just return the object-points if it has no points
# tests 12
# pass  12
✓ ok
```


## Benchmarks

Run `npm run bench` in the project's repository.

```
[jamesallen@dev simplify-ts]$ npm run bench

> simplify-ts@0.0.1 bench /home/jamesallen/simplify-ts
> node ./benchmarks/1k-objectPoints.js && node ./benchmarks/1k-arrayPoints.js && node ./benchmarks/1k-latlongPoints.js

Benchmarking simplify on 1118 object-points...
simplify (HQ) x 8,918 ops/sec ±0.42% (92 runs sampled)
simplify x 14,739 ops/sec ±0.52% (93 runs sampled)
Benchmarking simplify on 1118 array-points...
simplify (HQ) x 7,506 ops/sec ±0.47% (92 runs sampled)
simplify x 12,023 ops/sec ±0.55% (92 runs sampled)
Benchmarking simplify on 1118 latlong-points...
simplify (HQ) x 9,005 ops/sec ±0.53% (89 runs sampled)
simplify x 14,018 ops/sec ±0.55% (92 runs sampled)
```
