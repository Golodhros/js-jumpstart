import { Finder } from "./Finder";
import { Person } from "./Person";
import { AgeProximity } from "./AgeProximity";

describe("Finder", () => {
  let sue: Person;
  let greg: Person;
  let sarah: Person;
  let mike: Person;

  beforeEach(() => {
    sue = new Person();
    sue.name = "Sue";
    sue.birthDate = new Date(1950, 1, 1);

    greg = new Person();
    greg.name = "Greg";
    greg.birthDate = new Date(1952, 6, 1);

    sarah = new Person();
    sarah.name = "Sarah";
    sarah.birthDate = new Date(1982, 1, 1);

    mike = new Person();
    mike.name = "Mike";
    mike.birthDate = new Date(1979, 1, 1);
  });

  test("returns empty results when given empty list", () => {
    let list: Person[] = [];
    const finder = new Finder(list);

    const result = finder.find(AgeProximity.Closest);
    expect(result.YoungerPerson).toBeNull();

    expect(result.OlderPerson).toBeNull();
  });

  test("returns empty results when given one person", () => {
    let list: Person[] = [];
    list.push(sue);

    const finder = new Finder(list);

    const result = finder.find(AgeProximity.Closest);

    expect(result.YoungerPerson).toBeNull();
    expect(result.OlderPerson).toBeNull();
  });

  test("returns closest two for two people", () => {
    let list: Person[] = [];
    list.push(sue);
    list.push(greg);
    const finder = new Finder(list);

    const result = finder.find(AgeProximity.Closest);

    expect(result.YoungerPerson).toEqual(sue);
    expect(result.OlderPerson).toEqual(greg);
  });

  test("returns furthest two for two people", () => {
    let list: Person[] = [];
    list.push(mike);
    list.push(greg);

    const finder = new Finder(list);

    const result = finder.find(AgeProximity.Furthest);

    expect(result.YoungerPerson).toEqual(greg);
    expect(result.OlderPerson).toEqual(mike);
  });

  test("returns furthest two for four people", () => {
    let list: Person[] = [];
    list.push(sue);
    list.push(sarah);
    list.push(mike);
    list.push(greg);
    const finder = new Finder(list);

    const result = finder.find(AgeProximity.Furthest);

    expect(result.YoungerPerson).toEqual(sue);
    expect(result.OlderPerson).toEqual(sarah);
  });

  test("returns closest two for four people", () => {
    let list: Person[] = [];
    list.push(sue);
    list.push(sarah);
    list.push(mike);
    list.push(greg);

    const finder = new Finder(list);

    const result = finder.find(AgeProximity.Closest);

    expect(result.YoungerPerson).toEqual(sue);
    expect(result.OlderPerson).toEqual(greg);
  });

  // TODO: ask for closest and furthers from the same finder
});
