import { Person } from "./Person";
import { AgeProximity } from "./AgeProximity";
import { Couple } from "./Couple";

export class Finder {
  private _people: Person[];
  private _couplePermutations: Couple[];

  constructor(p: Person[]) {
    this._people = p;
    this._couplePermutations = [];

    for (let i = 0; i < this._people.length - 1; i++) {
      for (let j = i + 1; j < this._people.length; j++) {
        this._couplePermutations.push(
          new Couple(this._people[i], this._people[j])
        );
      }
    }
  }

  find(desiredAgeRelation: AgeProximity): Couple {
    if (this._couplePermutations.length < 1) {
      return new Couple();
    }

    let answer = this._couplePermutations[0];
    for (let result of this._couplePermutations) {
      if (desiredAgeRelation === AgeProximity.Closest) {
        if (result.AgeDifference < answer.AgeDifference) {
          answer = result;
        }
      } else if (desiredAgeRelation === AgeProximity.Furthest) {
        if (result.AgeDifference > answer.AgeDifference) {
          answer = result;
        }
      }
    }

    return answer;
  }
}
