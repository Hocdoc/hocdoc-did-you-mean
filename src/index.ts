/**
 * A did-you-mean utility to give hints for misspelled commands.
 */
import * as Levenshtein from 'fast-levenshtein';
import * as chalk from 'chalk';

export interface TextDistance {
  text: string;
  distance: number;
}

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

export const defaultFormatOptions: FormatOptions = {
  maxLevenshteinDistance: 2,
  maxListLength: 3,
  textPrefix: 'Did you mean ',
  textPostfix: '?',
  textOr: ' or ',
  textItemPrefix: "'",
  textItemPostfix: "'",
  useColors: false,
};

export function suggestionsList(
  command: string,
  validCommands: string[],
  maxLevenshteinDistance: number
): TextDistance[] {
  const distances = validCommands
    .map(x => {
      return { text: x, distance: Levenshtein.get(command, x) };
    })
    .filter(x => x.distance <= maxLevenshteinDistance);
  return distances.sort((x, y) => x.distance - y.distance);
}

export function didYouMean(
  command: string,
  validCommands: string[],
  options: FormatOptions = defaultFormatOptions
): string {
  const possibleCommands = suggestionsList(
    command,
    validCommands,
    options.maxLevenshteinDistance
  ).slice(0, options.maxListLength);
  if (possibleCommands.length === 0) {
    return '';
  }

  const commandsFormated = possibleCommands.map(x =>
    formatCommand(x.text, options)
  );

  const commandsList =
    commandsFormated.length > 1
      ? commandsFormated.slice(0, -1).join(', ') +
        options.textOr +
        commandsFormated[commandsFormated.length - 1]
      : commandsFormated[0];
  return options.textPrefix + commandsList + options.textPostfix;
}

function formatCommand(command: string, options: FormatOptions): string {
  return (
    options.textItemPrefix +
    (options.useColors ? chalk.keyword(command) : command) +
    options.textItemPostfix
  );
}
