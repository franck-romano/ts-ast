import { Colon, Const, Equal, Identifier, Let, Literal, Semicolon, Unknown, Var } from './Token';
import { ReservedKeywords } from './ReservedKeywords';
import { Separators } from './Separators';

export class Tokens {
  static Literal(value: string) {
    return new Literal(value);
  }

  static Const() {
    return new Const();
  }

  static Let() {
    return new Let();
  }

  static Var() {
    return new Var();
  }

  static Equal() {
    return new Equal();
  }

  static Colon() {
    return new Colon();
  }

  static Semicolon() {
    return new Semicolon();
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
