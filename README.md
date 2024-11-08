# cleanFloat

`cleanFloat` is a lightweight function designed to fix floating-point precision errors in JavaScript by rounding off inconsistent decimal values caused by binary representation of decimal numbers. It identifies unwanted repeating sequences (like repeating zeros or nines) and corrects them to provide a more accurate rounded value.

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
```

### `minPrecision` option

The `minPrecision` option allows you to specify the minimum number of decimal places to retain in the result. This is useful when you want to control the precision level even when repeating decimal patterns are detected.

```js
cleanFloat(1.333333); // Result: 1.3
cleanFloat(1.333333, { minPrecision: 4 }); // 1.3333
cleanFloat(0.999999999, { minPrecision: 5 }); // 1.00000
cleanFloat(1.23e-10 + 1.1e-10, { minPrecision: 5 }); // 2.33000e-10
```

### More examples

```js
import { cleanFloat } from 'clean-float';

cleanFloat(1.1111111); // 1.111
cleanFloat(5555.549999999999); // 5555.55
cleanFloat(99999999999.0123 + 0.00231432423); // 99999999999.01462
```

## How it works

`cleanFloat` works by separating the integer and decimal parts, then identifying unwanted sequences of repeating digits (e.g., repeating 0s or 9s). When such a sequence is found, it is removed, and the last consistent digit is rounded, producing a more precise final value.

## Limitations

This function corrects typical precision artifacts from basic operations (addition, subtraction, etc.) but is not designed for scientific calculations requiring extremely high precision.
For high-precision calculations (logarithms, square roots, etc.), consider using libraries like decimal.js.

## License

MIT License.