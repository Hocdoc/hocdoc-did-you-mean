import { didYouMean, defaultFormatOptions } from '../src';

const computers = ['Atari', 'Amiga', 'Mac', 'Arcon', 'Nitendo', 'Sega'];

describe('didYouMeanFormated', () => {
  it('default distance', () => {
    const actual = didYouMean('Aniga', computers);
    expect(actual).toEqual("Did you mean 'Amiga'?");
  });

  it('distance 10', () => {
    const options = { ...defaultFormatOptions, maxLevenshteinDistance: 10 };
    const actual = didYouMean('Aniga', computers, options);
    expect(actual).toEqual("Did you mean 'Amiga', 'Sega' or 'Atari'?");
  });

  it('change format', () => {
    const options = {
      ...defaultFormatOptions,
      textPrefix: 'Maybe ',
      textPostfix: '...',
    };
    const actual = didYouMean('Aniga', computers, options);
    expect(actual).toEqual("Maybe 'Amiga'...");
  });
});
