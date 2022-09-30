import { Equal, Semicolon, Token } from './Token';

export const Separators = new Map<string, Token>([
  [';', new Semicolon()],
  ['=', new Equal()]
]);
