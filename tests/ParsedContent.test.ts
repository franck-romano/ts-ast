import { expect } from 'chai';
import { ParsedContent } from '../src/tokens/ParsedContent';

describe('ParsedContent', () => {
  describe('.value()', () => {
    it('returns the value', () => {
      expect(ParsedContent('1').value()).to.eql('1');
    });
  });

  describe('.at()', () => {
    it('returns the character at the provided position', () => {
      expect(ParsedContent('Hello').at(0)).to.eql('H');
    });
  });

  describe('.extract()', () => {
    it('extracts the characters between the provided position', () => {
      expect(ParsedContent('Hello').extract(0, 2)).to.eql('He');
    });
  });

  describe('.containsIntegerLiteral()', () => {
    it('returns false', () => {
      expect(ParsedContent('One').containsIntegerLiteral(0)).to.be.false;
    });
    it('returns true', () => {
      expect(ParsedContent('1').containsIntegerLiteral(0)).to.be.true;
    });
  });
  describe('.containsCharacters()', () => {
    it('returns false', () => {
      expect(ParsedContent('1').containsCharacters(0)).to.be.false;
    });
    it('returns true', () => {
      expect(ParsedContent('Hello').containsCharacters(0)).to.be.true;
    });
  });

  describe('.containsSpacesTabs()', () => {
    it('returns false', () => {
      expect(ParsedContent('Hello').containsSpacesTabs(0)).to.be.false;
    });
    it('returns true', () => {
      expect(ParsedContent(' ').containsSpacesTabs(0)).to.be.true;
    });
    it('returns true', () => {
      expect(ParsedContent('\n').containsSpacesTabs(0)).to.be.true;
    });
  });
});
