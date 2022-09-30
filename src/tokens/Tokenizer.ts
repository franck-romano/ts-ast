import { Identifier, Literal, ReservedKeywords, Separators, Token, Unknown } from './Token';

export class Tokenizer {
  private currentPosition = 0;
  private tokens: Token[] = [];

  execute(content: string): Token[] {
    while (this.currentPosition !== content.length) {
      this.moveForwardUntil(content, this.containsSpaceOrTabOrBackspaceOrNewLine);
      const start = this.currentPosition;
      const currentCharacter = content.charAt(this.currentPosition);

      if (this.isLiteral(currentCharacter)) {
        this.moveForwardUntil(content, this.isLiteral);
        this.addToken(Tokens.Literal(this.getValue(content, start)));
      }

      if (this.isCharacter(currentCharacter)) {
        this.moveForwardUntil(content, this.isCharacter);
        const value = this.getValue(content, start);
        const token = ReservedKeywords.has(value) ? Tokens.ReservedKeyword(value) : Tokens.Identifier(value);
        this.addToken(token);
      } else {
        this.currentPosition++;
        const value = content.charAt(this.currentPosition - 1);
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

  private getValue(content: string, start: number) {
    return content.slice(start, this.currentPosition);
  }

  private containsSpaceOrTabOrBackspaceOrNewLine(toTest: string) {
    return /[ \t\b\n]/.test(toTest);
  }

  private isCharacter(toTest: string): boolean {
    return /[_a-zA-Z]/.test(toTest);
  }

  private isLiteral(toTest: string): boolean {
    return /[0-9]/.test(toTest);
  }

  private moveForwardUntil(content: string, pred: (str: string) => boolean) {
    while (this.currentPosition < content.length && pred(content.charAt(this.currentPosition))) {
      this.currentPosition++;
    }
  }
}

export class Tokens {
  static Literal(value: string) {
    return new Literal(value);
  }

  static Identifier(value: string) {
    return new Identifier(value);
  }

  static ReservedKeyword(value: string) {
    return ReservedKeywords.get(value)!;
  }

  static Separator(value: string) {
    return Separators.get(value)!;
  }

  static Unknown(value: string) {
    return new Unknown(value);
  }
}
