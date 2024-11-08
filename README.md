# cleanFloat

A lightweight function designed to fix floating-point precision errors in JavaScript by rounding off inconsistent decimal values caused by binary representation of decimal numbers. It identifies unwanted repeating sequences (like repeating zeros or nines) and corrects them to provide a more accurate rounded value.

[![Run Tests](https://github.com/rMonell/clean-float/actions/workflows/ci.yml/badge.svg)](https://github.com/rMonell/clean-float/actions/workflows/ci.yml)

## Why cleanFloat?

In JavaScript, floating-point numbers are represented in binary according to the IEEE 754 standard, which leads to precision errors in many cases:


```js
0.2 + 0.1 // 0.30000000000000004
0.3 - 0.1 // 0.19999999999999998
```
`cleanFloat` resolves these common issues by detecting decimal repetition artifacts and rounding the number accordingly.

## Installation

Add `cleanFloat` to your project via npm or yarn:

```bash
npm install clean-float
```

```bash
yarn add clean-float
```

## Usage

Import `cleanFloat` in your file and use it to correct floating-point precision errors.

```js
import { cleanFloat } from 'clean-float';

cleanFloat(0.2 + 0.1); // 0.3
cleanFloat(0.3 - 0.1); // 0.2
cleanFloat(1 / 3); // 0.3
cleanFloat(0.14286 * 100); // 14.286
```

### `minPrecision` option

The `minPrecision` option allows you to specify specific minimum result precision. This is useful when you want to control the precision level even when repeating decimal patterns are detected.

```js
const nbr = 5 / 9 // 0.5555555555555556

cleanFloat(nbr); // 0.6
cleanFloat(nbr, { minPrecision: 2 }); // 0.56
```

## How it works

`cleanFloat` works by separating the integer and decimal parts, then identifying unwanted sequences of repeating digits (e.g., repeating 0s or 9s). When such a sequence is found, it is removed, and the last consistent digit is rounded, producing a more precise final value.

## Limitations

This function corrects typical precision artifacts from basic operations (addition, subtraction, etc.) but is not designed for scientific calculations requiring extremely high precision.
For high-precision calculations (logarithms, square roots, etc.), consider using libraries like decimal.js.

## License

MIT License.