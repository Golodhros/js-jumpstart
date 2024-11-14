// Flux Standard Actions

// A basic Flux Standard Action:
{
    type: 'ADD_TODO',
    payload: {
        text: 'Do something.'
    }
}

// An FSA that represents an error, analogous to a rejected Promise:
{
    type: 'ADD_TODO',
    payload: new Error(),
    error: true
}

// An action MUST
//     be a plain JavaScript object.
//     have a type property.

// An action MAY
//     have an error property.
//     have a payload property.
//     have a meta property.

// An action MUST NOT include properties other than type, payload, error, and meta.

// https://github.com/acdlite/flux-standard-action