export interface Token {
  value(): string;

  position(start: number, end: number): Token;
}

export class Const implements Token {
  value() {
    return 'const';
  }

  position(start: number, end: number): this {
    return this;
  }
}

export class EOF implements Token {
  value() {
    return 'EOF';
  }

  position(start: number, end: number): this {
    return this;
  }
}

export class Let implements Token {
  value() {
    return 'let';
  }

  position(start: number, end: number): this {
    return this;
  }
}

export class Var implements Token {
  value() {
    return 'var';
  }

  position(start: number, end: number): this {
    return this;
  }
}

export class Identifier implements Token {
  constructor(private identifier: string) {}

  value() {
    return this.identifier;
  }

  position(start: number, end: number): Identifier {
    return this;
  }
}

export class Literal implements Token {
  constructor(private literal: string) {}

  value() {
    return this.literal;
  }

  position(start: number, end: number): Literal {
    return this;
  }
}

export class Semicolon implements Token {
  position(start: number, end: number): Token {
    return this;
  }

  value() {
    return ';';
  }
}

export class Colon implements Token {
  position(start: number, end: number): Token {
    return this;
  }

  value(): string {
    return ':';
  }
}

export class Equal implements Token {
  position(start: number, end: number): Token {
    return this;
  }

  value() {
    return '=';
  }
}

export class Unknown implements Token {
  constructor(private unknown: string) {}

  position(start: number, end: number): Token {
    return this;
  }

  value() {
    return this.unknown;
  }
}
