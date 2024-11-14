// Questions
// Pokemon card
// - Name
// - Picture
// From https://pokeapi.co/#google_vignette

// No a11y, performance, UX

// Pokemon
// const {isLoading, pokemon, error} = usePokemon();
//
// PokemonCard
// -img
// -h2

import { useState, useEffect } from "react";

const DEFAULT_POKEMON = "ditto";

const getPokemonURL = (pokemonName: string) =>
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

type PokemonShape = {
    name: string;
    picture: string;
};

const usePokemon = (pokemonName = DEFAULT_POKEMON) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [pokemon, setPokemon] = useState<PokemonShape | null>(null);

    //   TODO: better error handling
    useEffect(() => {
        const getPokemon = async () => {
            const response = await fetch(getPokemonURL(pokemonName), {
                headers: {
                    "content-type": "application/json",
                },
            });

            if (response.ok) {
                const json = await response.json();
                setPokemon({
                    name: json.name,
                    picture: json.sprites.front_default,
                });
                setIsLoading(false);
            } else {
                setError(new Error("Error with the response"));
            }
        };

        getPokemon();
    }, [pokemonName]);

    return { isLoading, error, pokemon };
};

export const Pokemon = () => {
    const [pokemonName, setPokemonName] = useState("");
    const [pokemonToSearch, setPokemonToSearch] = useState(DEFAULT_POKEMON);
    const { isLoading, pokemon, error } = usePokemon(pokemonToSearch);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error happened! - {error.message}</div>;
    }

    // TODO: remove the send button and get pokemons from typing
    // TODO: debounce the setting of the pokemon name
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPokemonToSearch(pokemonName);
    };

    return (
        <div>
            {/* TODO: Make this a form component */}
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    value={pokemonName}
                    onChange={(e: any) => {
                        setPokemonName(e.target.value);
                    }}
                    name="pokemonName"
                />
                <button type="submit">Send</button>
            </form>
            {/* TODO: Make this a pokemon card */}
            <img src={pokemon?.picture} />
            <h2>{pokemon?.name}</h2>
        </div>
    );
};

// Feedback
// Good job
// Good troubleshooting
// Slow - more practice for writing a fetch
// Almost panicking on the onChange type
// OK with any after 10 secons of struggling
// Shown knowledge about things, especially on the follow up work
// Improvement by just adding more TODO comments, so I mentioned
