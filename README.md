# The-Time Library

The-Time is a simple JavaScript library for time manipulation and comparison. It provides a flexible, easy-to-use interface for working with time.

![Branches](./badges/coverage-branches.svg)
![Functions](./badges/coverage-functions.svg)
![Lines](./badges/coverage-lines.svg)
![Statements](./badges/coverage-statements.svg)
![Jest coverage](./badges/coverage-jest%20coverage.svg)

## Features
- Create Time instances from time string.
- Get hours, minutes, and seconds from Time instances.
- Add and subtract hours, minutes, and seconds from Time instances.
- Compare Time instances.
- Convert Time instances to string format.
- Handle overflow time operations.

## Installation

Use npm to install The-Time library:

```bash
npm install the-time
```

## Usage

Here is a basic usage of the The-Time library:

```typescript
import { Time } from 'the-time';

let options = { overflow: true };
let time = new Time('23:45:50', options);
console.log(time.toString()); // outputs: 23:45:50.000

time.add(20, 'minutes');
console.log(time.toString()); // outputs: 00:05:50.000 (because of overflow option)

let time2 = new Time('00:00:00');
console.log(time.isGreaterThan(time2)); // outputs: true
```

## API Reference

### `class Time`

#### `constructor(timeString: string, options: ITimeOptions = {})`

Creates a new `Time` instance from a time string. `timeString` must be in the format 'HH:mm:ss'. If `options.overflow` is set to true (which is the default), time will overflow when adding or subtracting (23:59:59 + 1 minute = 00:00:59).  
`options.utcOffset` can be used to set the UTC offset of the time string.

#### `toString(): string`

Returns the string representation of the `Time` instance in the format 'HH:mm:ss.fff'.

#### `toTimeString(): string`

Returns the string representation of the `Time` instance in the format 'HH:mm:ss'.

#### `getHours(): number`

Returns the hour component of the `Time` instance.

#### `getMinutes(): number`

Returns the minute component of the `Time` instance.

#### `getSeconds(): number`

Returns the second component of the `Time` instance.

#### `add(amount: number, d: TTimeValue): ITime`

Adds the specified amount of hours, minutes, or seconds to the `Time` instance. Returns the `Time` instance for chaining.

#### `subtract(amount: number, d: TTimeValue): ITime`

Subtracts the specified amount of hours, minutes, or seconds from the `Time` instance. Returns the `Time` instance for chaining.

#### `isGreaterThan(value: ITime): boolean`

Returns true if the `Time` instance is greater than the provided value.

#### `isLessThan(value: ITime): boolean`

Returns true if the `Time` instance is less than the provided value.

#### `isEqualTo(value: ITime): boolean`

Returns true if the `Time` instance is equal to the provided value.

#### `toSeconds(): number`

Returns the total number of seconds in the `Time` instance.

#### `toDate(): number`

Returns the `Time` instance as a `Date` instance.

#### `static now(options: ITimeOptions = {}): ITime`

Returns the current time as a `Time` instance.

#### `static isValid(timeString: string): boolean`

Checks if a time string is valid.

#### `static fromDate(date: Date, options: ITimeOptions = {}): Time`

Creates a new `Time` instance from a `Date` instance.

## License

MIT
