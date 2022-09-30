import { expect } from 'chai';
import { ParsedCharacter } from '../src/tokens/ParsedCharacter';

describe('ParsedCharacter', () => {
  describe('.isIntegerLiteral()', () => {
    it('returns true', () => {
      expect(ParsedCharacter('1').isIntegerLiteral()).to.be.true;
    });
    it('returns false', () => {
      expect(ParsedCharacter('One').isIntegerLiteral()).to.be.false;
    });
  });

  describe('.isCharacter()', () => {
    it('returns true', () => {
      expect(ParsedCharacter('One').isCharacter()).to.be.true;
    });
    it('returns false', () => {
      expect(ParsedCharacter('1').isCharacter()).to.be.false;
    });
  });
});
