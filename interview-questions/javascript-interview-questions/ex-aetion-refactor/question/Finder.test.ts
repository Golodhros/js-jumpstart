import { Finder } from "../src/Finder";
import { Thing } from "../src/Thing";
import { FT } from "../src/FT";

describe("Finder", () => {
  let sue: Thing;
  let greg: Thing;
  let sarah: Thing;
  let mike: Thing;

  beforeEach(() => {
    sue = new Thing();
    sue.name = "Sue";
    sue.birthDate = new Date(1950, 1, 1);

    greg = new Thing();
    greg.name = "Greg";
    greg.birthDate = new Date(1952, 6, 1);

    sarah = new Thing();
    sarah.name = "Sarah";
    sarah.birthDate = new Date(1982, 1, 1);

    mike = new Thing();
    mike.name = "Mike";
    mike.birthDate = new Date(1979, 1, 1);
  });

  test("returns empty results when given empty list", () => {
    let list: Thing[] = [];
    const finder = new Finder(list);

    const result = finder.find(FT.One);
    expect(result.P1).toBeNull();

    expect(result.P2).toBeNull();
  });

  test("returns empty results when given one person", () => {
    let list: Thing[] = [];
    list.push(sue);

    const finder = new Finder(list);

    const result = finder.find(FT.One);

    expect(result.P1).toBeNull();
    expect(result.P2).toBeNull();
  });

  test("returns closest two for two people", () => {
    let list: Thing[] = [];
    list.push(sue);
    list.push(greg);
    const finder = new Finder(list);

    const result = finder.find(FT.One);

    expect(result.P1).toEqual(sue);
    expect(result.P2).toEqual(greg);
  });

  test("returns furthest two for two people", () => {
    let list: Thing[] = [];
    list.push(mike);
    list.push(greg);

    const finder = new Finder(list);

    const result = finder.find(FT.Two);

    expect(result.P1).toEqual(greg);
    expect(result.P2).toEqual(mike);
  });

  test("returns furthest two for four people", () => {
    let list: Thing[] = [];
    list.push(sue);
    list.push(sarah);
    list.push(mike);
    list.push(greg);
    const finder = new Finder(list);

    const result = finder.find(FT.Two);

    expect(result.P1).toEqual(sue);
    expect(result.P2).toEqual(sarah);
  });

  test("returns closest two for four people", () => {
    let list: Thing[] = [];
    list.push(sue);
    list.push(sarah);
    list.push(mike);
    list.push(greg);

    const finder = new Finder(list);

    const result = finder.find(FT.One);

    expect(result.P1).toEqual(sue);
    expect(result.P2).toEqual(greg);
  });
});
