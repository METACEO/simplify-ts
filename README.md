simplify-ts
===========

A TypeScript port of the "high-performance JavaScript 2D/3D polyline simplification" library [Simplify.js](https://github.com/mourner/simplify-js) - a combination of basic radial distance determination and the Douglas-Peucker algorithm.

## Install

```
npm install --save simplify-ts
```

## Usage

Object-based point collections:

```typescript
import {
    Simplify,
    ISimplifyObjectPoint
} from 'simplify-ts';

const points: ISimplifyObjectPoint[] = [ {x: 1, y: 2} /* ... */ ];
const tolerance = 0.5;
const highQuality = true;

const simplified_result = Simplify(points, tolerance, highQuality);
```

Array-based point collections:

```typescript

import {
    SimplifyAP,
    ISimplifyArrayPoint
} from 'simplify-ts';

const points: ISimplifyArrayPoint[] = [ [1, 2] /* ... */ ];
const tolerance = 0.5;
const highQuality = true;

const simplified_result = SimplifyAP(points, tolerance, highQuality);
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
# tests 8
# pass  8
✓ ok
```


## Benchmarks

Run `npm run bench` in the project's repository.

```
[jamesallen@dev simplify-ts]$ npm run bench

> simplify-ts@0.0.1 bench /home/jamesallen/simplify-ts
> node ./benchmarks/1k-objectPoints.js && node ./benchmarks/1k-arrayPoints.js

Benchmarking simplify on 1118 object-points...
simplify (HQ) x 8,857 ops/sec ±0.47% (89 runs sampled)
simplify x 14,367 ops/sec ±0.73% (91 runs sampled)
Benchmarking simplify on 1118 array-points...
simplify (HQ) x 7,527 ops/sec ±0.64% (86 runs sampled)
simplify x 12,010 ops/sec ±0.60% (97 runs sampled)
```
