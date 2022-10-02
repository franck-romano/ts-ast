import { Token } from './Token';
import { Content } from '../types/Content';
import { ParsedCharacter } from './ParsedCharacter';
import { ParsedContent } from './ParsedContent';
import { Tokens } from './Tokens';
import { ReservedKeywords } from './ReservedKeywords';
import { Separators } from './Separators';

export class Tokenizer {
  private currentPosition = 0;
  private readonly content: Content;

  constructor(rawContent: string) {
    this.content = ParsedContent(rawContent);
  }

  *scanForward(): Generator<number, void> {
    while (this.currentPosition <= this.content.value().length) {
      yield this.currentPosition++;
    }
  }

  execute(): Token {
    this.scanForwardUntil(this.content.containsSpacesTabs);
    const start = this.currentPosition;

    if (this.content.isEOF(this.currentPosition)) {
      return Tokens.EOF();
    }
    const character = ParsedCharacter(this.content.at(this.currentPosition));

    if (character.isIntegerLiteral()) {
      this.scanForwardUntil(this.content.containsIntegerLiteral);
      const value = this.content.extract(start, this.currentPosition);
      return Tokens.Literal(value);
    } else if (character.isCharacter()) {
      this.scanForwardUntil(this.content.containsCharacters);
      const value = this.content.extract(start, this.currentPosition);
      return ReservedKeywords.has(value) ? Tokens.ReservedKeyword(value) : Tokens.Identifier(value);
    } else {
      this.currentPosition++;
      const value = this.content.at(this.currentPosition - 1);
      return Separators.has(value) ? Tokens.Separator(value) : Tokens.Unknown(value);
    }
  }

  private scanForwardUntil(pred: (position: number) => boolean) {
    while (this.currentPosition < this.content.value().length && pred(this.currentPosition)) {
      this.currentPosition++;
    }
  }
}
