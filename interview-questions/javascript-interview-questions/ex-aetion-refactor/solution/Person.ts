export class Person {
  public name: string;
  public birthDate: Date;

  constructor() {
    this.name = null!;
    this.birthDate = null!;
  }

  getName(): string {
    return this.name;
  }

  setName(value: string) {
    this.name = value;
  }

  getBirthDate(): Date {
    return this.birthDate;
  }

  setBirthDate(value: Date) {
    this.birthDate = value;
  }
}
