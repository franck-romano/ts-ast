import { Token } from './Token';
import { Content } from '../types/Content';
import { ParsedCharacter } from './ParsedCharacter';
import { ParsedContent } from './ParsedContent';
import { Tokens } from './Tokens';
import { ReservedKeywords } from './ReservedKeywords';
import { Separators } from './Separators';

export class Tokenizer {
  private currentPosition = 0;
  private tokens: Token[] = [];
  private readonly content: Content;

  constructor(rawContent: string) {
    this.content = ParsedContent(rawContent);
  }

  execute(): Token[] {
    const parsedContent = this.content;
    while (this.currentPosition !== parsedContent.value().length) {
      this.scanForwardUntil(parsedContent.containsSpacesTabs);
      const start = this.currentPosition;
      const character = ParsedCharacter(parsedContent.at(this.currentPosition));

      if (character.isIntegerLiteral()) {
        this.scanForwardUntil(parsedContent.containsIntegerLiteral);
        const value = parsedContent.extract(start, this.currentPosition);
        this.addToken(Tokens.Literal(value));
      }

      if (character.isCharacter()) {
        this.scanForwardUntil(parsedContent.containsCharacters);
        const value = parsedContent.extract(start, this.currentPosition);
        const token = ReservedKeywords.has(value) ? Tokens.ReservedKeyword(value) : Tokens.Identifier(value);
        this.addToken(token);
      } else {
        this.currentPosition++;
        const value = parsedContent.at(this.currentPosition - 1);
        if (Separators.has(value)) {
          this.addToken(Tokens.Separator(value));
        } else {
          this.addToken(Tokens.Unknown(value));
          break;
        }
      }
    }

    return this.tokens;
  }

  private addToken(token: Token) {
    this.tokens.push(token);
  }

  private scanForwardUntil(pred: (position: number) => boolean) {
    while (this.currentPosition < this.content.value().length && pred(this.currentPosition)) {
      this.currentPosition++;
    }
  }
}
