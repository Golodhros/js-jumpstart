import { Person } from "./Person";

export class Couple {
  public YoungerPerson: Person | null;
  public OlderPerson: Person | null;
  // Difference in age in ms
  public AgeDifference: number;

  constructor(firstPerson?: Person, secondPerson?: Person) {
    if (firstPerson && secondPerson) {
      if (firstPerson.birthDate.getTime() < secondPerson.birthDate.getTime()) {
        this.YoungerPerson = firstPerson;
        this.OlderPerson = secondPerson;
      } else {
        this.YoungerPerson = secondPerson;
        this.OlderPerson = firstPerson;
      }
      this.AgeDifference =
        this.OlderPerson.birthDate.getTime() -
        this.YoungerPerson.birthDate.getTime();
    } else {
      this.YoungerPerson = null;
      this.OlderPerson = null;
      this.AgeDifference = 0;
    }
  }
}
