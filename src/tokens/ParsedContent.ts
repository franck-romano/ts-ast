import { Content } from '../types/Content';

export function ParsedContent(content: string): Content {
  return {
    value(): string {
      return content;
    },
    at(position: number): string {
      return content.charAt(position);
    },
    extract(start: number, end: number): string {
      return content.slice(start, end);
    },
    containsIntegerLiteral(position: number): boolean {
      return /[0-9]/.test(content.charAt(position));
    },
    containsSpacesTabs(position: number): boolean {
      return /[ \t\b\n]/.test(content.charAt(position));
    },
    containsCharacters(position: number) {
      return /[_a-zA-Z]/.test(content.charAt(position));
    }
  };
}
