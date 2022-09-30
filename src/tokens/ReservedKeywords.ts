import { Const, Let, Token, Var } from './Token';

export const ReservedKeywords: Map<string, Token> = new Map<'function' | 'const' | 'let' | 'var' | 'return', Token>([
  ['const', new Const()],
  ['let', new Let()],
  ['var', new Var()]
]);
