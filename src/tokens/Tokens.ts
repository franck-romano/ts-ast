import { Identifier, Literal, Unknown } from './Token';
import { ReservedKeywords } from './ReservedKeywords';
import { Separators } from './Separators';

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
