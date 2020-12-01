// Partial<Type>
interface Product {
    id: string,
    name: string,
}
type ModelProps = Partial<{product: Product}>

// Required<Type>
interface Props {
  a?: number;
  b?: string;
}

const obj: Required<Props> = { a: 5 };
// Property 'b' is missing in type '{ a: number; }' but required in type 'Required<Props>'.


// Readonly<Type>
interface Todo {
  title: string;
}

const todo: Readonly<Todo> = {
  title: "Delete inactive users",
};

todo.title = "Hello";
// Cannot assign to 'title' because it is a read-only property.


// Record<Keys, Type>
const SERVICES: Record<string, string> = {
    doorToDoor: "delivery at door",
    inStore: "in-store pickup",
}

// Pick<Type, Keys>
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
    title: "Clean room",
    completed: false,
};

// Omit<Type, Keys>
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

type TodoPreview = Omit<Todo, "description">;

const todo: TodoPreview = {
    title: "Clean room",
    completed: false,
};
