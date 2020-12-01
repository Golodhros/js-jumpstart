// Interfaces
// parsed in a lazy mode
// interface A { b: B };
// interface B { b: A };

// Types
// parsed in a eager mode
// type B = { a: A };
// type A = { b: B };

// Rules of thumb for interfaces
// 1) Use interface when you want someone to implement. (class abstract class)
// 2) Use type that can't be changed. (example: configuration)
// 3) Data. (ex: 3 fields, ...rest) (interface? or Type ...rest);
// 4) Always start with types. then we expand to interface.

// Example, to type this data specification:
// [
//   {
//     value: 1,
//     name: 'glittering'
//   },
//   {
//     value: 1,
//     name: 'luminous'
//   }
// ]

type RecordFake<K extends string | number, T> = { [P in K]: T };
type Data = {
  value: number;
  name: string;
}

export type DataKeys = keyof Data;

const data: Data[] = [
  {
    value: 1,
    name: 'glittering',
  },
  {
    value: 1,
    name: 'luminous'
  }
]


// custom validator or type narrower
export const isDataKeys = function (dataKey: number | string): dataKey is DataKeys {
  return true;
}

const otherMock1 = global as any; // => bad
const otherMock2: any = global; // => bad
const otherMock3 = global as unknown as jest.Mock; //=> good

type User = {
  id?: string;
  email?: string;
  fullName?: string;
  name?: string;
  roles?: Array<string>;
};

const keyFunc = (): string => 'value';
const key = keyFunc();

let value;

if (isDataKeys(key)) {
  value = data[0][key];
} else {
  throw new Error('blah');
}
