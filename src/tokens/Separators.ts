import { Colon, Equal, Semicolon, Token } from './Token';

export const Separators = new Map<string, Token>([
  [';', new Semicolon()],
  [':', new Colon()],
  ['=', new Equal()]
]);
