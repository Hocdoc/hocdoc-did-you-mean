# hocdoc-did-you-mean

A Typescript/Javascript library to print did-you-mean suggestions for humans.

It use the [Levenshtein algorithm](https://en.wikipedia.org/wiki/Levenshtein_distance) to get a list of commands wiht the lowest distance to the user input.

This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx).

## Installation

```sh
npm install hocdoc-did-you-mean
```

or

```sh
yarn add hocdoc-did-you-mean
```

## API

### `didYouMean`

Returns a text with suggestions for related commands.

Syntax:

```ts
function didYouMean(
  command: string,
  validCommands: string[],
  options: FormatOptions = defaultFormatOptions
): string;
```

Example:

```ts
import { didYouMean, defaultFormatOptions } from 'hocdoc-did-you-mean';

const computers = ['Atari', 'Amiga', 'Mac', 'Arcon', 'Nitendo', 'Sega'];

const suggestion = didYouMean('Aniga', computers);
console.log(suggestion); // Output: "Did you mean 'Amiga'?"

const suggestion2 = didYouMean('Aniga', computers, {{ ...defaultFormatOptions, maxLevenshteinDistance: 10 }});
console.log(suggestion2); // Output: "Did you mean 'Amiga', 'Sega' or 'Atari'?"
```

FormatOptions:

```ts
export interface FormatOptions {
  maxLevenshteinDistance: number;
  maxListLength: number;
  textPrefix: string;
  textPostfix: string;
  textOr: string;
  textItemPrefix: string;
  textItemPostfix: string;
  useColors: boolean;
}
```

### `suggestionsList`

Returns an array of texts with their distance to the user input, sorted by distance.

Syntax:

```ts
function suggestionsList(
  command: string,
  validCommands: string[],
  maxLevenshteinDistance: number
): TextDistance[];

interface TextDistance {
  text: string;
  distance: number;
}
```

## License

MIT
