import { Character } from '../types/Character';

export function ParsedCharacter(char: string): Character {
  return {
    isIntegerLiteral(): boolean {
      return /[0-9]/.test(char);
    },
    isCharacter(): boolean {
      return /[_a-zA-Z]/.test(char);
    }
  };
}
