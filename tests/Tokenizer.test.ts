import { expect } from 'chai';
import { Tokenizer } from '../src/tokens/Tokenizer';
import { Tokens } from '../src/tokens/Tokens';
import { EOF, Token } from '../src/tokens/Token';

describe('Tokenizer', () => {
  describe('.execute()', () => {
    context('variable declaration', () => {
      context('keywords', () => {
        [
          { keyword: 'let', expectedVariableDeclaration: Tokens.Let() },
          { keyword: 'const', expectedVariableDeclaration: Tokens.Const() },
          { keyword: 'var', expectedVariableDeclaration: Tokens.Var() }
        ].forEach(({ keyword, expectedVariableDeclaration }) => {
          context(`${keyword}`, () => {
            it('is properly mapped', () => {
              // GIVEN
              const content = keyword;
              const expected = [expectedVariableDeclaration, Tokens.EOF()];

              // WHEN
              const actual = tokenizeAll(content);

              // THEN
              expect(actual).to.eql(expected);
            });
          });
        });
      });
      context('with an identifier', () => {
        it('is properly mapped', () => {
          // GIVEN
          const content = 'const myVar';
          const expected = [Tokens.Const(), Tokens.Identifier('myVar'), Tokens.EOF()];

          // WHEN
          const actual = tokenizeAll(content);

          // THEN
          expect(actual).to.eql(expected);
        });
      });
      context('with an identifier and a type', () => {
        it('is properly mapped', () => {
          // GIVEN
          const content = 'let myVar: string';
          const expected = [
            Tokens.Let(),
            Tokens.Identifier('myVar'),
            Tokens.Colon(),
            Tokens.Identifier('string'),
            Tokens.EOF()
          ];

          // WHEN
          const actual = tokenizeAll(content);

          // THEN
          expect(actual).to.eql(expected);
        });
      });

      context('with an identifier and a assigment', () => {
        it('is properly mapped', () => {
          // GIVEN
          const content = 'const myVar =';
          const expected = [Tokens.Const(), Tokens.Identifier('myVar'), Tokens.Equal(), Tokens.EOF()];

          // WHEN
          const actual = tokenizeAll(content);

          // THEN
          expect(actual).to.eql(expected);
        });
      });

      context('with an identifier and a valid assigment', () => {
        it('is properly mapped', () => {
          // GIVEN
          const content = 'const myVar = 1';
          const expected = [
            Tokens.Const(),
            Tokens.Identifier('myVar'),
            Tokens.Equal(),
            Tokens.Literal('1'),
            Tokens.EOF()
          ];

          // WHEN
          const actual = tokenizeAll(content);

          // THEN
          expect(actual).to.eql(expected);
        });
      });

      context('with an identifier and a valid assigment and a semicolon', () => {
        it('is properly mapped', () => {
          // GIVEN
          const content = 'const myVar = 1;';
          const expected = [
            Tokens.Const(),
            Tokens.Identifier('myVar'),
            Tokens.Equal(),
            Tokens.Literal('1'),
            Tokens.Semicolon(),
            Tokens.EOF()
          ];

          // WHEN
          const actual = tokenizeAll(content);

          // THEN
          expect(actual).to.eql(expected);
        });
      });
    });
  });
});

function tokenizeAll(content: string): Token[] {
  const tokens: Token[] = [];

  const tokenizer = new Tokenizer(content);
  while (!tokens.find((token) => token instanceof EOF)) {
    tokenizer.scanForward();
    const scannedToken = tokenizer.execute();
    tokens.push(scannedToken);
  }

  return tokens;
}
