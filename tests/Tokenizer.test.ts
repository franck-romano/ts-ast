import { expect } from 'chai';
import { Tokenizer, Tokens } from '../src/tokens/Tokenizer';
import { Const, Equal, Identifier, Let, Semicolon, Unknown, Var } from '../src/tokens/Token';

describe('Tokenizer', () => {
  describe('.execute()', () => {
    context('variable declaration', () => {
      context('keywords', () => {
        [
          { keyword: 'let', expectedVariableDeclaration: new Let() },
          { keyword: 'const', expectedVariableDeclaration: new Const() },
          { keyword: 'var', expectedVariableDeclaration: new Var() }
        ].forEach(({ keyword, expectedVariableDeclaration }) => {
          context(`${keyword}`, () => {
            it('is properly mapped', () => {
              // GIVEN
              const content = keyword;
              const expected = [expectedVariableDeclaration];

              // WHEN
              const actual = new Tokenizer().execute(content);

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
          const expected = [new Const(), Tokens.Identifier('myVar')];

          // WHEN
          const actual = new Tokenizer().execute(content);

          // THEN
          expect(actual).to.eql(expected);
        });
      });

      context('with an identifier and a assigment', () => {
        it('is properly mapped', () => {
          // GIVEN
          const content = 'const myVar =';
          const expected = [new Const(), Tokens.Identifier('myVar'), new Equal()];

          // WHEN
          const actual = new Tokenizer().execute(content);

          // THEN
          expect(actual).to.eql(expected);
        });
      });

      context('with an identifier and a valid assigment', () => {
        it('is properly mapped', () => {
          // GIVEN
          const content = 'const myVar = 1';
          const expected = [new Const(), Tokens.Identifier('myVar'), new Equal(), Tokens.Literal('1'), new Unknown('')];

          // WHEN
          const actual = new Tokenizer().execute(content);

          // THEN
          expect(actual).to.eql(expected);
        });
      });

      context('with an identifier and a valid assigment and a semicolon', () => {
        it('is properly mapped', () => {
          // GIVEN
          const content = 'const myVar = 1;';
          const expected = [new Const(), Tokens.Identifier('myVar'), new Equal(), Tokens.Literal('1'), new Semicolon()];

          // WHEN
          const actual = new Tokenizer().execute(content);

          // THEN
          expect(actual).to.eql(expected);
        });
      });
    });
  });
});
