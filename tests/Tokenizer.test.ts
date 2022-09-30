import { expect } from 'chai';
import { Tokenizer } from '../src/tokens/Tokenizer';
import { Tokens } from '../src/tokens/Tokens';

describe('Tokenizer', () => {
  describe('.execute()', () => {
    context('variable declaration', () => {
      context('keywords', () => {
        [
          { keyword: 'let', expectedVariableDeclaration: Tokens.Const() },
          { keyword: 'const', expectedVariableDeclaration: Tokens.Const() },
          { keyword: 'var', expectedVariableDeclaration: Tokens.Var() }
        ].forEach(({ keyword, expectedVariableDeclaration }) => {
          context(`${keyword}`, () => {
            it('is properly mapped', () => {
              // GIVEN
              const content = keyword;
              const expected = [expectedVariableDeclaration];

              // WHEN
              const actual = new Tokenizer(content).execute();

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
          const expected = [Tokens.Const(), Tokens.Identifier('myVar')];

          // WHEN
          const actual = new Tokenizer(content).execute();

          // THEN
          expect(actual).to.eql(expected);
        });
      });
      context('with an identifier and a type', () => {
        it('is properly mapped', () => {
          // GIVEN
          const content = 'let myVar: string';
          const expected = [Tokens.Let(), Tokens.Identifier('myVar'), Tokens.Colon(), Tokens.Identifier('string')];

          // WHEN
          const actual = new Tokenizer(content).execute();

          // THEN
          expect(actual).to.eql(expected);
        });
      });

      context('with an identifier and a assigment', () => {
        it('is properly mapped', () => {
          // GIVEN
          const content = 'const myVar =';
          const expected = [Tokens.Const(), Tokens.Identifier('myVar'), Tokens.Equal()];

          // WHEN
          const actual = new Tokenizer(content).execute();

          // THEN
          expect(actual).to.eql(expected);
        });
      });

      context('with an identifier and a valid assigment', () => {
        it('is properly mapped', () => {
          // GIVEN
          const content = 'const myVar = 1';
          const expected = [Tokens.Const(), Tokens.Identifier('myVar'), Tokens.Equal(), Tokens.Literal('1')];

          // WHEN
          const actual = new Tokenizer(content).execute();

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
            Tokens.Semicolon()
          ];

          // WHEN
          const actual = new Tokenizer(content).execute();

          // THEN
          expect(actual).to.eql(expected);
        });
      });
    });
  });
});
