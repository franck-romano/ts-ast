export type Content = {
  containsCharacters(position: number): boolean;
  containsIntegerLiteral(position: number): boolean;
  containsSpacesTabs(position: number): boolean;
  extract(start: number, end: number): string;
  at(position: number): string;
  value(): string;
};
