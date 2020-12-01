// Type Aliases
type Age = number;

type Person = {
    name: string;
    age: Age;
};

// Using Union
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === "string") {
        return n;
    }
    else {
        return n();
    }
}

// Using Intersection
// ...

// With generics:
type Container<T> = { value: T };
type Tree<T> = {
    value: T;
    left: Tree<T>;
    right: Tree<T>;
}
